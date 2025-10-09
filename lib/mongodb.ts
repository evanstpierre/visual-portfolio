// /lib/mongoose.ts

import mongoose, { Mongoose } from "mongoose";

type MongooseCache = {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

// Augment Node's global for type safety (dev hot-reload safe)
declare global {
  // eslint-disable-next-line no-var
  var __mongoose: MongooseCache | undefined;
}
const dbName = process.env.MONGO_DB;
const readUser = process.env.DB_USER;
const readPass = process.env.DB_PASS;
const host = "mongo";     // Docker service name or 'localhost' if running locally
const port = "27017";
const options = "authSource=myapp"; // optional query parameters

// const MONGO_URI = `mongodb://${readUser}:${readPass}@${host}:${port}/${dbName}?${options}`;


const MONGO_URI = `mongodb://user_read:pass@mongo:27017/myapp?authSource=myapp`

console.log("✅ MONGO_URI =", MONGO_URI);

if (!MONGO_URI) throw new Error("❌ Missing MONGODB_URI env variable");

const cache: MongooseCache = global.__mongoose ?? { conn: null, promise: null };

export async function connectDB() {
  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGO_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10_000,
    });
  }

  try {
    cache.conn = await cache.promise;

    // ✅ Log once on successful connection
    if (mongoose.connection.readyState === 1) {
      console.log(`✅ MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
    }
  } catch (err) {
    cache.promise = null; // reset so we can retry next call
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }

  // persist across HMR in dev
  global.__mongoose = cache;
  return cache.conn;
}
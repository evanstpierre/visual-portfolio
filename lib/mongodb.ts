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

const MONGO_URI = process.env.MONGO_URI!;
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
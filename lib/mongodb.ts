// lib/mongodb.ts
import mongoose from "mongoose";

const MONGO_URI =
  process.env.MONGO_URI || // set in docker-compose (mongodb://mongo:27017/appdb)
  (process.env.NODE_ENV === "production"
    ? "mongodb://mongo:27017/appdb" // sensible default in containers
    : "mongodb://127.0.0.1:27017/appdb"); // local dev outside Docker

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

// Reuse connection across HMR in Next dev
let cached = (global as any)._mongoose;
if (!cached) cached = (global as any)._mongoose = { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 5000, // fail fast instead of hanging
        socketTimeoutMS: 10000,
        maxPoolSize: 10,
      })
      .then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }
  return cached.conn;
}
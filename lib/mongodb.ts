import mongoose from "mongoose";

interface MongooseCache {
  conn: mongoose.Mongoose | null;
  promise: Promise<mongoose.Mongoose> | null;
}

// Extend the global object for TypeScript
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

// Validate environment variable
const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

// Initialize cached connection
const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };

// Store the cached object in global scope
if (!global.mongoose) {
  global.mongoose = cached;
}

async function dbConnect(): Promise<mongoose.Mongoose> {
  // Return cached connection if it exists
  if (cached.conn) {
    return cached.conn;
  }

  // Create a new connection promise if none exists
  if (!cached.promise) {
    try {
      cached.promise = mongoose.connect(MONGODB_URI, {
        bufferCommands: false,
      }).then((mongooseInstance) => {
        console.log("MongoDB connected successfully");
        return mongooseInstance;
      });
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw new Error("Failed to connect to MongoDB");
    }
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
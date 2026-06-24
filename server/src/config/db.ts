import mongoose from "mongoose";

// Cache the connection (and in-flight connection promise) across invocations.
// In serverless, the module scope can persist between warm invocations,
// so reusing this avoids opening a new MongoDB connection every request.
let cachedPromise: Promise<typeof mongoose> | null = null;

async function connectDB() {
  // Already connected (readyState 1) — reuse it, do nothing.
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  // A connection attempt is already in flight — wait on that instead of
  // starting a second one (prevents duplicate connect() calls under
  // concurrent invocations).
  if (cachedPromise) {
    return cachedPromise;
  }

  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is not set in environment variables");
  }

  cachedPromise = mongoose.connect(mongoUri, {
    bufferCommands: false, // fail fast instead of buffering+hanging if not connected
    serverSelectionTimeoutMS: 10000,
  });

  try {
    await cachedPromise;
    console.log("MongoDB connected successfully");
    return mongoose;
  } catch (error) {
    cachedPromise = null; // reset so the next call can retry instead of reusing a dead promise
    console.error("MongoDB connection failed:", error);
    throw error; // let the caller (route handler) decide what to do — never process.exit() here
  }
}

export default connectDB;
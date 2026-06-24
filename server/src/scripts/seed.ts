import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product";

// Load environment variables from .env before anything else.
// Without this line, process.env.MONGO_URI would be undefined.
dotenv.config();

// ------------------------------------------------------------------
// SEED SCRIPT
// ------------------------------------------------------------------
// This script fills the database with ~200,000 fake products.
// Run it once before starting the server:
//   npm run seed
//
// It connects directly to MongoDB, inserts the data, then exits.
// It does NOT start the Express server.
// ------------------------------------------------------------------

const TOTAL_PRODUCTS = 200000;

// We split products into batches of 1000 before inserting.
// ------------------------------------------------------------------
// WHY BATCHING IS BETTER THAN ONE AT A TIME
// ------------------------------------------------------------------
// If we loop and call Product.create() 200,000 times:
//   - Each call opens a network round-trip to MongoDB
//   - 200,000 network round-trips = very slow (could take 10+ minutes)
//   - Node.js also has to keep 200,000 promises in memory at once
//
// With insertMany() in batches of 1000:
//   - We send 1000 documents per network request
//   - Only 200 round-trips instead of 200,000
//   - Memory stays low because we only hold 1000 objects at a time
//   - Typical speed improvement: 10x to 50x faster
// ------------------------------------------------------------------
const BATCH_SIZE = 1000;

// These are the categories our fake products will belong to.
const categories = [
  "Electronics",
  "Clothing",
  "Books",
  "Home & Garden",
  "Sports",
  "Toys",
  "Automotive",
  "Health & Beauty",
  "Food & Grocery",
  "Office Supplies",
];

// Helper: pick a random item from an array
function randomItem(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Helper: generate a random price between min and max
function randomPrice(min: number, max: number) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

// Helper: build one fake product object (not saved yet, just a plain object)
function buildFakeProduct(index: number) {
  const category = randomItem(categories);
  return {
    name: `${category} Product ${index + 1}`,
    category: category,
    price: randomPrice(1, 999),
    // We manually spread createdAt across the past 2 years.
    // If every product had the same timestamp, cursor pagination
    // would be ambiguous. Varied timestamps make pagination realistic.
    createdAt: new Date(Date.now() - Math.random() * 2 * 365 * 24 * 60 * 60 * 1000),
  };
}

async function seed() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(process.env.MONGO_URI!);
  console.log("Connected.");

  // Drop existing products so re-running the script starts clean.
  // This prevents duplicate data if you run seed more than once.
  console.log("Clearing existing products...");
  await Product.deleteMany({});
  console.log("Existing products cleared.");

  console.log(`Inserting ${TOTAL_PRODUCTS} products in batches of ${BATCH_SIZE}...`);

  let insertedCount = 0;

  // We loop through the total count in steps of BATCH_SIZE.
  // Each iteration, we build a batch array and insert it all at once.
  for (let i = 0; i < TOTAL_PRODUCTS; i += BATCH_SIZE) {
    // Build an array of BATCH_SIZE product objects in memory
    const batch = [];
    for (let j = i; j < i + BATCH_SIZE && j < TOTAL_PRODUCTS; j++) {
      batch.push(buildFakeProduct(j));
    }

    // insertMany() sends all 1000 documents to MongoDB in a single request.
    // { ordered: false } means: if one document fails validation,
    // MongoDB still inserts the rest instead of stopping immediately.
    await Product.insertMany(batch, { ordered: false });

    insertedCount += batch.length;

    // Log progress every 10,000 products so we can see it is working
    if (insertedCount % 10000 === 0) {
      console.log(`  Inserted ${insertedCount} / ${TOTAL_PRODUCTS}...`);
    }
  }

  console.log(`\nDone! Inserted ${insertedCount} products.`);
  await mongoose.disconnect();
  process.exit(0);
}

// Run the seed function and handle any unexpected errors
seed().catch((error) => {
  console.error("Seed script failed:", error);
  process.exit(1);
});

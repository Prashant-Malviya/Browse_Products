import { Request, Response } from "express";
import Product from "../models/Product";

const SEED_TOTAL_PRODUCTS = 200000;
const SEED_BATCH_SIZE = 1000;
const SEED_CATEGORIES = [
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

function randomItem(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomPrice(min: number, max: number) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function buildFakeProduct(index: number) {
  const category = randomItem(SEED_CATEGORIES);
  return {
    name: `${category} Product ${index + 1}`,
    category,
    price: randomPrice(1, 999),
    createdAt: new Date(Date.now() - Math.random() * 2 * 365 * 24 * 60 * 60 * 1000),
  };
}

export async function getProducts(req: Request, res: Response) {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 20, 100);

    const category = req.query.category as string | undefined;

    const cursorParam = req.query.cursor as string | undefined;

    const filter: any = {};

    if (category) {
      filter.category = category;
    }

    if (cursorParam) {
      const decoded = Buffer.from(cursorParam, "base64").toString("utf8");

      const cursorData = JSON.parse(decoded);

      const cursorDate = new Date(cursorData.createdAt);
      const cursorId = cursorData.id;

      filter.$or = [
        { createdAt: { $lt: cursorDate } },
        { createdAt: cursorDate, _id: { $lt: cursorId } },
      ];
    }

    const products = await Product.find(filter)
      .sort({ createdAt: -1, _id: -1 })
      .limit(limit + 1)
      .lean();

    const hasMore = products.length > limit;
    const pageProducts = hasMore ? products.slice(0, limit) : products;

    let nextCursor = null;
    if (hasMore && pageProducts.length > 0) {
      const lastProduct = pageProducts[pageProducts.length - 1];
      const cursorPayload = JSON.stringify({
        createdAt: lastProduct.createdAt,
        id: lastProduct._id,
      });
      nextCursor = Buffer.from(cursorPayload, "utf8").toString("base64");
    }

    res.status(200).json({
      success: true,
      data: pageProducts,
      pagination: {
        nextCursor,
        hasMore,
        limit,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function getProductStats(req: Request, res: Response) {
  try {
    const totalProducts = await Product.countDocuments();
    res.status(200).json({ success: true, data: { totalProducts } });
  } catch (error) {
    console.error("Error fetching product stats:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function seedProducts(req: Request, res: Response) {
  try {
    let insertedCount = 0;

    for (let i = 0; i < SEED_TOTAL_PRODUCTS; i += SEED_BATCH_SIZE) {
      const batch: Array<Record<string, unknown>> = [];
      for (let j = i; j < i + SEED_BATCH_SIZE && j < SEED_TOTAL_PRODUCTS; j++) {
        batch.push(buildFakeProduct(j));
      }
      await Product.insertMany(batch, { ordered: false });
      insertedCount += batch.length;
    }

    const totalProducts = await Product.countDocuments();
    res.status(200).json({
      success: true,
      message: "Seed complete",
      data: {
        inserted: insertedCount,
        totalProducts,
      },
    });
  } catch (error) {
    console.error("Error seeding products:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

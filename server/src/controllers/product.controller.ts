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
    createdAt: new Date(
      Date.now() - Math.random() * 2 * 365 * 24 * 60 * 60 * 1000,
    ),
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
      try {
        const decoded = Buffer.from(cursorParam, "base64").toString("utf8");

        const cursorData = JSON.parse(decoded);

        const cursorDate = new Date(cursorData.createdAt);
        const cursorId = cursorData.id;

        filter.$or = [
          { createdAt: { $lt: cursorDate } },
          { createdAt: cursorDate, _id: { $lt: cursorId } },
        ];
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Invalid cursor",
        });
      }
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

export async function createProduct(req: Request, res: Response) {
  try {
    const { name, category } = req.body;
    const priceNumber = Number(req.body.price);

    if (!name || !category || req.body.price === undefined) {
      return res.status(400).json({
        success: false,
        message: "name, category and price are required",
      });
    }

    if (Number.isNaN(priceNumber)) {
      return res.status(400).json({
        success: false,
        message: "price must be a valid number",
      });
    }

    const product = await Product.create({
      name,
      category,
      price: priceNumber,
    });

    return res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error creating product:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const updateData: any = {};

    if (req.body.name !== undefined) {
      updateData.name = req.body.name;
    }

    if (req.body.category !== undefined) {
      updateData.category = req.body.category;
    }

    if (req.body.price !== undefined) {
      const price = Number(req.body.price);

      if (Number.isNaN(price)) {
        return res.status(400).json({
          success: false,
          message: "Price must be a valid number",
        });
      }

      updateData.price = price;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error updating product:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    console.log(req.params.id);
    const product = await Product.findByIdAndDelete(req.params.id).lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    console.error("Error deleting product:", error);

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
    // Prevent accidental reseeding
    const totalProducts = await Product.countDocuments();

    if (totalProducts >= 200000) {
      return res.status(409).json({
        success: false,
        message: "Database already seeded",
      });
    }

    let insertedCount = 0;

    for (let i = 0; i < SEED_TOTAL_PRODUCTS; i += SEED_BATCH_SIZE) {
      const batch: Array<Record<string, unknown>> = [];

      for (let j = i; j < i + SEED_BATCH_SIZE && j < SEED_TOTAL_PRODUCTS; j++) {
        batch.push(buildFakeProduct(j));
      }

      await Product.insertMany(batch, { ordered: false });
      insertedCount += batch.length;
    }

    const finalTotalProducts = await Product.countDocuments();

    res.status(200).json({
      success: true,
      message: "Seed complete",
      data: {
        inserted: insertedCount,
        totalProducts: finalTotalProducts,
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

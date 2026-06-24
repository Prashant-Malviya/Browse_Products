import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProductStats,
  updateProduct,
} from "../controllers/product.controller";

const router = Router();
router.get("/stats", getProductStats);
router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;

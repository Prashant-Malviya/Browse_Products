import { Router } from "express";
import { getProducts, getProductStats } from "../controllers/product.controller";

const router = Router();
router.get("/stats", getProductStats);
router.get("/", getProducts);

export default router;

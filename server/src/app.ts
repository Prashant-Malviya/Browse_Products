import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes";
import { seedProducts } from "./controllers/product.controller";

const app = express();

app.use(cors({ origin: `${process.env.CLIENT_URI}` }));
app.use(express.json());

app.use("/api/products", productRoutes);
app.post("/api/seed", seedProducts);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;

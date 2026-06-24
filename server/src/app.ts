import path from "node:path";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes";
import { seedProducts } from "./controllers/product.controller";

const envPath = path.resolve(__dirname, "../.env");
dotenv.config({ path: envPath });

const app = express();
const allowedOrigin = process.env.CLIENT_URI?.trim();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin === allowedOrigin) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", productRoutes);
app.post("/api/seed", seedProducts);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import { authRoutes } from "./routes/auth.route.js";
import { connectDB } from "./db.js";
import { productRoutes } from "./routes/product.route.js";
dotenv.config();
cloudinary.config({
  cloud_name: "dvynmrss4",
  api_key: "795289841653837",
  api_secret: "lGiLFPvvO2563K7Za4vg0iufU64",
});
const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});

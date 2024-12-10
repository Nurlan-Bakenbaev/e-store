import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authRoutes } from "./routes/auth.route.js";
import { connectDB } from "./db.js";
import { productRoutes } from "./routes/product.route.js";
import { cartRoutes } from "./routes/cart.routes.js";
import { couponsRoutes } from "./routes/coupons.router.js";
import { paymentRoutes } from "./routes/payment.routes.js";
import { analiticsRoutes } from "./routes/analitics.routes.js";
dotenv.config();

const app = express();
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "DELETE", "UPDATE"],
  allowedHeaders: ["Content-Type", "Authorization", "withCredentials"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponsRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analitics", analiticsRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});

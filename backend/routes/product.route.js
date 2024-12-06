import express from "express";
import {
  adminRoute,
  createProduct,
  getAllProducts,
  getFeaturedProducts,
} from "../controllers/product.controller.js";
import { protectedRoute } from "../controllers/auth.controllers.js";

export const productRoutes = express.Router();

productRoutes.get("/", protectedRoute, adminRoute, getAllProducts);
productRoutes.get("/featured", getFeaturedProducts);
productRoutes.post("/", protectedRoute, adminRoute, createProduct);

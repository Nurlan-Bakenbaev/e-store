import express from "express";
import {
  adminRoute,
  createProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getRecommendations,
  toggleFeaturedProduct,
} from "../controllers/product.controller.js";
import { protectedRoute } from "../controllers/auth.controllers.js";

export const productRoutes = express.Router();
productRoutes.get("/", protectedRoute, adminRoute, getAllProducts);
productRoutes.get("/featured", getFeaturedProducts);
productRoutes.get("/:cat", getProductsByCategory);
productRoutes.get("/get/recommendations", getRecommendations);
productRoutes.post("/create", protectedRoute, adminRoute, createProduct);
productRoutes.patch(
  "/toggle-featured/:productId",
  protectedRoute,
  adminRoute,
  toggleFeaturedProduct
);
productRoutes.delete(
  "/delete/:productId",
  protectedRoute,
  adminRoute,
  deleteProduct
);

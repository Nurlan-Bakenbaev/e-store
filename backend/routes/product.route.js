import express from "express";
import {
  adminRoute,
  createProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getRecomendations,
  toggleFeaturedProduct,
} from "../controllers/product.controller.js";
import { protectedRoute } from "../controllers/auth.controllers.js";

export const productRoutes = express.Router();
productRoutes.get("/", protectedRoute, adminRoute, getAllProducts);
productRoutes.get("/featured", getFeaturedProducts);
productRoutes.get("/category/:category", getProductsByCategory);
productRoutes.get("/recomendations", getRecomendations);
productRoutes.post("/create", protectedRoute, adminRoute, createProduct);
productRoutes.patch("/:id", protectedRoute, adminRoute, toggleFeaturedProduct);

productRoutes.delete(
  "/delete/:productId",
  protectedRoute,
  adminRoute,
  deleteProduct
);

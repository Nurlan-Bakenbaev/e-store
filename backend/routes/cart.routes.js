import express from "express";
import {
  addToCart,
  deleteCartItems,
  getCart,
  removeAllFromCart,
  updateQuantity,
} from "../controllers/cart.controllers.js";
import { protectedRoute } from "../controllers/auth.controllers.js";
export const cartRoutes = express.Router();
cartRoutes.get("/get", protectedRoute, getCart);
cartRoutes.post("/add", protectedRoute, addToCart);
cartRoutes.put("/update/:id", protectedRoute, updateQuantity);
cartRoutes.delete("/delete", protectedRoute, removeAllFromCart);
cartRoutes.delete("/on-success/delete", protectedRoute, deleteCartItems);

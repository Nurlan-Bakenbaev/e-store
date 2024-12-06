import express from "express";
import {
  getProfile,
  login,
  logout,
  protectedRoute,
  refreshToken,
  signup,
} from "../controllers/auth.controllers.js";
export const authRoutes = express.Router();
authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);

// REFRESH TOKEN
authRoutes.post("/refresh-token", refreshToken);

authRoutes.get("/profile", protectedRoute, getProfile);

import express from "express";
import { protectedRoute } from "../controllers/auth.controllers.js";
import {
  getCoupon,
  validateCoupon,
} from "../controllers/coupon.controllers.js";
export const couponsRoutes = express.Router();
couponsRoutes.get("/", protectedRoute, getCoupon);
couponsRoutes.get("/validate", protectedRoute, validateCoupon);

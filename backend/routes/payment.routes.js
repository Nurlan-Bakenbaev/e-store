import express from "express";
import { protectedRoute } from "../controllers/auth.controllers.js";
import {
  checkOutSuccess,
  createCheckoutSession,
} from "../controllers/payment.controller.js";
export const paymentRoutes = express.Router();
paymentRoutes.post(
  "/create-checkout-session",
  protectedRoute,
  createCheckoutSession
);

paymentRoutes.post("/create-success", protectedRoute, checkOutSuccess);

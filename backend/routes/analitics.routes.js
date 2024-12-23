import express from "express";
import { adminRoute } from "../controllers/product.controller.js";
import { protectedRoute } from "../controllers/auth.controllers.js";
import {
  getAnaliticsData,
  getDailySalesData,
} from "../controllers/analitics.controllers.js";

export const analiticsRoutes = express.Router();
analiticsRoutes.get("/", protectedRoute, adminRoute, async (req, res) => {
  try {
    const analyticsData = await getAnaliticsData();
    const endDate = new Date();

    const startData = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    const dailySalesData = await getDailySalesData(startData, endDate);
    res.status(200).json({ analyticsData, dailySalesData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

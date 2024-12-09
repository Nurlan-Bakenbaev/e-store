import express from "express";
import { adminRoute } from "../controllers/product.controller.js";
import { protectedRoute } from "../controllers/auth.controllers.js";
import { getAnaliticsData } from "../controllers/analitics.controllers.js";

export const analiticsRoutes = express.Router();
analiticsRoutes.get("/", protectedRoute, adminRoute, async (req, res) => {
  try {
    const analitics = await getAnaliticsData();
    const endDate = new Date();

    const startData = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    const dailySales = await getDailySalesData(startData, endDate);
    res.status(200).json({ analitics, dailySales });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

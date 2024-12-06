import { redis } from "../lib/redis.js";
import Product from "../models/product.model.js";
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ status: "success", products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featuredProducts");
    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts));
    }
    //.lean returns plain JS
    featuredProducts = await Product.find({ isFeatured: true }).lean();
    if (featuredProducts) {
      return res.status(404).json({ message: "No featured products found" });
    }
    await redis.set("featuredProducts", JSON.stringify(featuredProducts));
    res.status(200).json({ featuredProducts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createProduct = (req, res) => {
  try {
    const user = req.user;
    const { name, description, price, image, category } = req.body;
    const product = new Product({
      name,
      description,
      price,
      image,
      category,
    });
    product.save();
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//MIDDLEWARE FUNCTION
export const adminRoute = (req, res, next) => {
  try {
    const user = req.user;
    if (user.role === "admin") {
      next();
    }
    res.status(403).json({ message: "Admin Access is required" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

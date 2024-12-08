import cloudinary from "../lib/cloudinary.js";
import { redis } from "../lib/redis.js";
import Product from "../models/product.model.js";

//get all the products for admin
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ status: "success", products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get featured products
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
// create product
export const createProduct = async (req, res) => {
  try {
    const user = req.user;
    const { name, description, price, image, category } = req.body;
    let cloudinaryResponse = null;
    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }
    const product = new Product({
      name,
      description,
      price,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : "",
      category,
    });
    product.save();
    res.status(201).json({ status: "success", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get recomendations
export const getRecomendations = async (req, res) => {
  try {
    const recomendations = await Product.find([
      {
        $sample: { size: 3 },
      },
      { $project: { name: 1, image: 1, description: 1, price: 1, image: 1 } },
    ]);
    res.status(200).json({ recomendations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get by category
export const getProductsByCategory = async (req, res) => {
  const { cat } = req.params;
  try {
    const category = await Product.find({ category: cat });
    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//featuredProducts updating
export const toggleFeaturedProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.isFeatured = !product.isFeatured;
    const updatedProduct = await product.save();
    await updateFeaturedProducts();
    await res
      .status(200)
      .json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update redis featuredProducts
const updateFeaturedProducts = async () => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    await redis.set("featuredProducts", JSON.stringify(featuredProducts));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.image) {
      try {
        const publicId = product.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`products/${publicId}`);
        console.log("Image deleted from cloudinary");
      } catch (error) {
        console.log(error);
      }
    }
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully", product });
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

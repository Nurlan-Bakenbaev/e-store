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
    console.log(req.body);
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
      image: cloudinaryResponse?.secure_url || "",
      category,
    });
    const savedProduct = await product.save();
    return res.status(201).json({ status: "success", product: savedProduct });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//get recomendations
export const getRecommendations = async (req, res) => {
  try {
    const recommendations = await Product.aggregate([
      {
        $sample: { size: 6 },
      },
      {
        $project: {
          name: 1,
          image: 1,
          description: 1,
          price: 1,
        },
      },
    ]);
    res.status(200).json({ recommendations });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// get by category
export const getProductsByCategory = async (req, res) => {
  try {
    const { cat } = req.params;
    const products = await Product.find({ category: cat });
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: `No products found in category: ${cat}` });
    }
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//featuredProducts updating
export const toggleFeaturedProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
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
    const { productId } = req.params;
    const product = await Product.findById(productId);
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
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//MIDDLEWARE FUNCTION
export const adminRoute = (req, res, next) => {
  try {
    const user = req.user;
    if (user?.user?.role === "admin") {
      return next();
    }
    res.status(403).json({ message: "Admin Access is required" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

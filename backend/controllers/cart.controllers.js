import Product from "../models/product.model.js";
import User from "../models/user.model.js";
export const addToCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    const existingProduct = user.cartItems.find(
      (item) => item.product.toString() === productId.toString()
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      user.cartItems.push({ product: productId, quantity: 1 });
    }

    await user.save();
    return res
      .status(200)
      .json({ message: "Product added to cart successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const productIds = user.cartItems.map((item) => item.product.toString());
    const products = await Product.find({ _id: { $in: productIds } }, null, {
      lean: true,

    });
    const cartItems = products.map((product) => ({
      ...product,
      quantity: user.cartItems.find(
        (item) => item.product.toString() === product._id.toString()
      ).quantity,
    }));
    res.json({ cartItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const { quantity } = req.body;
    const existingProduct = user.cartItems.find((item) => item._id === id);
    if (existingProduct) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter((item) => item._id !== id);
        await user.save();
        return res
          .status(200)
          .json({ message: "Product removed from cart successfully" });
      } else {
        existingProduct.quantity = quantity;
        await user.save();
        return res
          .status(200)
          .json({ message: "Product quantity updated successfully" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const removeAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    if (!productId) {
      user.cartItems = [];
    }
    user.cartItems = user.cartItems.filter((item) => item._id !== productId);
    await user.save();
    return res
      .status(200)
      .json({ message: "Product removed from cart successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import Product from "../models/product.model.js";
import User from "../models/user.model.js";
export const addToCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
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

    const user = await User.findById(req.user.userId);
    const existingProduct = user.cartItems.find(
      (item) => item.product.toString() === id
    );
    if (existingProduct) {
      if (existingProduct.quantity > 0) {
        existingProduct.quantity -= 1;
        await user.save();
        return res.status(200).json({ success: true });
      }
      await user.save();
      return res.status(200).json({ success: true, user });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const removeAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.cartItems = user.cartItems.filter(
      (item) => item.product.toString() !== productId
    );
    await user.save();
    return res.status(200).json({
      message: "Product removed from cart successfully",
      cartItems: user.cartItems,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while removing the product from the cart",
      error: error.message,
    });
  }
};

export const deleteCartItems = async (req, res) => {
  try {
    if (!req.user?.userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const result = await User.updateOne(
      { _id: req.user.userId },
      { $set: { cartItems: [] } }
    );
    res.status(200).json({ message: "Cart items deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

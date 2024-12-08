import Product from "../models/product.model.js";
export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    const existingProduct = user.cartItems.find(
      (item) => item._id === productId
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    }
    user.cartItems.push({ _id: productId });
    await user.save();
    return res
      .status(200)
      .json({ message: "Product added to cart successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getCart = async (req, res) => {
  try {
    const cartProduct = await Product.find({
      _id: { $in: req.user.cartItems },
    });
    const cartItems = cartProduct.map((product) => {
      const item = req.user.cartItems.find(
        (cartItem) => cartItem._id === item._id
      );
      return {
        ...product.toJSON(),
        quantity: item.quantity,
      };
    });
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

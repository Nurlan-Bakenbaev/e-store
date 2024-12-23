import Coupon from "../models/coupon.model.js";
import User from "../models/user.model.js";
export const getCoupon = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const coupon = await Coupon.findOne({ userId: user._id, isActive: true });
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    res.status(200).json({ coupon: coupon });
  } catch (error) {
    console.error("Error in coupons:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// Validate Coupon
export const validateCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = Coupon.findOne({
      code: code,
      userId: req.user._id,
      isActive: true,
    });
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not Active" });
    }
    if (coupon.expirationDate < new Date()) {
      coupon.isActive = false;
      await coupon.save();
      return res.status(404).json({ message: "Coupon Expired" });
    }
    res.status(200).json({
      message: "Coupon Valid",
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

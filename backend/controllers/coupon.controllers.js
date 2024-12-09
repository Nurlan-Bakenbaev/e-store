import Coupon from "../models/coupon.model.js";

export const getCoupon = (req, res) => {
  try {
    const coupon = Coupon.findOne({ userId: req.user._id, isActive: true });
    res.status(200).json(coupon || null);
  } catch (error) {
    console.log("error in coupons ");
    res.status(500).json({ message: error.message });
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


import { useCartStore } from "@/stores/useCartStore";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const GiftCouponCard = () => {
  const [userInputCode, setUserInputCode] = useState("");

  const { coupon, isCouponApplied, applyCoupon, getMyCoupon, removeCoupon } =
    useCartStore();

  const handleApplyCoupon = () => {
    if (!userInputCode) return;
    applyCoupon(userInputCode);
  };

  const handleRemoveCoupon = async () => {
    await removeCoupon();
    setUserInputCode("");
  };

  useEffect(() => {
    getMyCoupon();
  }, [getMyCoupon]);

  // Set userInputCode when coupon is fetched or cleared
  useEffect(() => {
    if (coupon) {
      setUserInputCode(coupon.code);
    } else {
      setUserInputCode("");
    }
  }, [coupon]);

  return (
    <div className="space-y-4 rounded-md bg-slate-800 p-4 sm:p-6">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="voucher"
            className="mb-2 block text-sm font-medium text-gray-300">
            Do you have a voucher or gift card?
          </label>
          <input
            type="text"
            id="voucher"
            className="block w-full p-2.5 rounded-md border border-gray-600 bg-gray-700 text-gray-300 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter coupon here"
            value={userInputCode}
            onChange={(e) => setUserInputCode(e.target.value)}
          />
        </div>
        <Button
          variant="contained"
          color="success"
          sx={{ width: "100%" }}
          onClick={handleApplyCoupon}
          disabled={!userInputCode}>
          Apply Code
        </Button>
      </div>

      {isCouponApplied && coupon && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-300">Applied Coupon</h3>
          <p className="mt-2 text-sm text-gray-400">
            {coupon.code} - {coupon.discountPercentage}% off
          </p>
          <motion.button
            type="button"
            className="mt-2 flex w-full items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRemoveCoupon}>
            Remove Coupon
          </motion.button>
        </div>
      )}

      {!isCouponApplied && coupon?.code && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-300">
            Your Available Coupon:
          </h3>
          <p className="mt-2 text-sm text-gray-400">
            {coupon.code} - {coupon.discountPercentage}% off
          </p>
        </div>
      )}
    </div>
  );
};

export default GiftCouponCard;

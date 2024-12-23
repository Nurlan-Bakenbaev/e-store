import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";
import GiftCouponCard from "./GiftCoupon";
import { loadStripe } from "@stripe/stripe-js";
import axios from "@/lib/axios";
import { useCartStore } from "@/stores/useCartStore";

const stripePromise = loadStripe(
  "pk_test_51QU2T5KY7H7Lk4EThg0mHeBbjATWMJJXrU29WxfKFmYLroSaFJyp2GJAADVMGkXKFgFTLmhy5PzYk17dnNT81iJG00354ogQjh"
);

const OrderSumm = () => {
  const { cart, coupon, subtotal, total } = useCartStore();
  const handleStripePayment = async () => {
    try {
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe failed to initialize. Please try again later.");
      }

      if (!Array.isArray(cart) || cart.length === 0) {
        throw new Error("Your cart is empty. Please add products to proceed.");
      }
      const res = await axios.post("/payments/create-checkout-session", {
        products: cart,
        couponCode: coupon ? coupon?.code : null,
      });
      const session = res.data;
      if (!session.id) {
        throw new Error(
          "Failed to create a checkout session. Please try again."
        );
      }
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (error) {
        alert(
          "There was an issue redirecting to the payment page. Please try again."
        );
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      {/*  <GiftCouponCard />*/}
      <div className="space-y-4 rounded-lg  bg-slate-800 p-4 shadow-sm  sm:p-6">
        <p className="text-xl font-semibold ">Order summary</p>
        <div className="space-y-4">
          <div className="space-y-2">
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-400">
                Original price
              </dt>
              <dd className="text-base font-medium text-white">${subtotal}</dd>
            </dl>
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-400">Discount</dt>
              <dd className="text-base font-medium text-green-600">{coupon}</dd>
            </dl>
          </div>
          <dl className="flex items-center justify-between gap-4 border-t pt-2 border-slate-900">
            <dt className="text-lg font-bold">Total</dt>
            <dd className="text-lg font-bold underline underline-offset-8">
              ${total}
            </dd>
          </dl>
        </div>

        <Button
          variant="contained"
          color="success"
          onClick={handleStripePayment}
          href="#"
          className="flex  w-full items-center justify-center hover:text-accent  py-2 text-sm ">
          Proceed to Checkout
        </Button>

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-gray-400">or</span>
          <Link
            href="/"
            className="inline-flex items-center gap-2  hover:text-accent">
            Continue Shopping
          </Link>
        </div>
      </div>
    </>
  );
};

export default OrderSumm;

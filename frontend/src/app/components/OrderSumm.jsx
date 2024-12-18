import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

const OrderSumm = ({ total, coupon, subtotal, isCouponApplied }) => {
  return (
    <>
      <div className="space-y-4 rounded-lg p-4 shadow-sm bg-slate-800">
        <form className="space-y-4">
          <div>
            <label htmlFor="voucher" className="mb-2 block text-sm">
              Do you have a Coupon?
            </label>
            <input
              type="text"
              id="voucher"
              placeholder="Your coupon"
              title="Enter your Coupon"
            />
          </div>
          <Button
            variant="contained"
            color="success"
            type="submit"
            className="w-full">
            Apply
          </Button>
        </form>
        {coupon && isCouponApplied && (
          <dl className="flex items-center justify-between">
            <dt className="text-sm">Coupon: {coupon.code}</dt>
            <dt className="text-sm">{`${coupon.discountPercentage}%`}</dt>
          </dl>
        )}
      </div>

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

        <Link
          href="#"
          className="flex  w-full items-center justify-center hover:text-accent  py-2 text-sm ">
          Proceed to Checkout
        </Link>

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

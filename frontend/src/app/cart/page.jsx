"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CartCard from "../components/CartCard";
import OrderSumm from "../components/OrderSumm";
import { useCartStore } from "@/stores/useCartStore";
import EmptyCart from "../components/EmptyCart";
import RecommendedProducts from "../components/RecomendedProducts";
import ProductCard from "../components/ProductCard";

const Cart = () => {
  const {
    updateQuantity,
    addToCart,
    deleteFromCart,
    cart,
    coupon,
    total,
    subtotal,
    getCartItems,
    isLoadingId,
    recomendations,
    fetchRecomendation,
  } = useCartStore();
  useEffect(() => {
    getCartItems();
    fetchRecomendation();
  }, [cart.quantity, getCartItems, fetchRecomendation]);
  const handleIncrementQuantity = (item) => {
    addToCart(item);
  };
  const handleDecrementQuantity = (item) => {
    updateQuantity(item);
  };
  const handleDeleteItem = (item) => {
  deleteFromCart(item);
  };
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeInOut" }}>
        <h1 className="text-xl md:text-4xl mb-5 text-center capitalize">
          Shopping Cart
        </h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
        className="flex flex-col md:flex-row gap-4 lg:max-w-[90%] lg:mx-auto justify-center px-4">
        {cart.length === 0 ? (
          <div className="text-center">
            <EmptyCart />
          </div>
        ) : (
          <div className="flex flex-col w-full">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full max-w-2xl mx-auto">
                {cart.map((item, index) => (
                  <CartCard
                    key={index}
                    cart={item}
                    incrementItemQuantity={handleIncrementQuantity}
                    decrementItemQuantity={handleDecrementQuantity}
                    handleDeleteItem={handleDeleteItem}
                    isLoadingId={isLoadingId}
                  />
                ))}
              </div>
              <div className="w-full max-w-xl md:max-w-lg mx-auto flex flex-col gap-4">
                <OrderSumm coupon={coupon} total={total} subtotal={subtotal} />
              </div>
            </div>

            <div className="hidden xl:mt-8 md:block">
              <h3 className="text-xl font-semibold text-center mt-8">
                People also bought
              </h3>
              <div className="mt-4 grid grid-cols-3 gap-5 overflow-auto max-w-2xl">
                {recomendations.recommendations?.map((product, index) => (
                  <ProductCard
                    product={product}
                    index={index}
                    key={index}
                    size="small"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Cart;

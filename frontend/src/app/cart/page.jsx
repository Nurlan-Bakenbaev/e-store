"use client";
import React from "react";
import { motion } from "framer-motion";
const Cart = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}>
        <h1 className="text-xl md:text-4xl mb-5 text-center capitalize">
          Shopping Cart
        </h1>
      </motion.div>
    </div>
  );
};

export default Cart;

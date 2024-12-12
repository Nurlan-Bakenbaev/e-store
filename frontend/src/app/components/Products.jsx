"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, Trash2, Star } from "lucide-react";
import products from "@/lib/dummydata";
import Image from "next/image";
const Products = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeInOut" }}
      className="w-full max-w-2xl mx-auto p-3 shadow-lg bg-slate-800">
      <div>
        {products.map((product) => (
          <div
            key={product._id}
            className="d-flex p-4 hover:bg-slate-700">
            <div className="flex items-center gap-2 ">
              <Image
                width={150}
                height={150}
                src={"/categories/t-shirt.jpg"}
                alt={product.name}
                className="w-[80px] h-[90px] object-cover"
              />
              <div>
                <div className="d-flex justify-between gap-2">
                  <h4 className="font-semibold text-md">{product.name}</h4>
                  <span className="text-xs text-accent">
                    {product.category}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{product.description}</p>
              </div>
            </div>
            <div className="d-flex flex-col">
              <button
                className={`d-flex gap-2 p-2 ${
                  product.isFeatured ? "text-yellow-500" : "text-gray-500"
                }`}>
                <Star size={16} />
                Featured
              </button>
              <button
                className="text-red-500 p-4 hover:bg-red-600
               hover:text-white  ">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Products;

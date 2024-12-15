"use client";
import React, { use, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useProductsStore } from "@/stores/useProductsStore";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import ProductCard from "@/app/components/ProductCard";
import { useUserStore } from "@/stores/useUserStore";
const Category = () => {
  const { id: categories } = useParams();
  const { products, getProductByCategory } = useProductsStore();
  const { checkAuth } = useUserStore();
  useEffect(() => {
    getProductByCategory(categories);
    checkAuth();
  }, [categories]);
  console.log(products);

  if (products.length === 0) return <LoadingSpinner />;
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2,
      },
    },
  };
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}>
        <h1 className="text-xl md:text-4xl mb-5 text-center capitalize">
          {categories}
        </h1>
      </motion.div>
      <div className="w-full md:w-[90%] mx-auto flex flex-row gap-4 flex-wrap justify-center">
        {products.length > 0 &&
          products.map((product, index) => (
            <ProductCard key={product._id} product={product} index={index} />
          ))}
      </div>
    </div>
  );
};

export default Category;

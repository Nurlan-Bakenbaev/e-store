"use client";
import React, { use, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useProductsStore } from "@/stores/useProductsStore";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import ProductCard from "@/app/components/ProductCard";
import NoProducts from "@/app/components/NoProducts";
import { useCartStore } from "@/stores/useCartStore";
const Category = () => {
  const { products, getProductByCategory, loading, resetProducts } =
    useProductsStore();
  const { id: categories } = useParams();
  const { getCartItems } = useCartStore();
  useEffect(() => {
    const getProducts = async () => {
      resetProducts();
      await getProductByCategory(categories);

      getCartItems();
    };
    getProducts();
  }, [categories, getProductByCategory, resetProducts, getCartItems]);
  if (loading === 0) return <LoadingSpinner />;
  // Animations
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
        <h1 className="text-xl md:text-4xl mb-5 text-center uppercase">
          {categories}
        </h1>
      </motion.div>
      {products.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.4,
            ease: "easeInOut",
          }}>
          <NoProducts />
        </motion.div>
      ) : (
        <div
          className="w-full md:w-[90%] mx-auto flex 
        flex-row gap-2 flex-wrap justify-center">
          {products.length > 0 &&
            products.map((product, index) => (
              <ProductCard key={product._id} product={product} index={index} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Category;

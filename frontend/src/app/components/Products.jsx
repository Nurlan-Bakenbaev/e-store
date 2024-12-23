"use client";
import React, { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useProductsStore } from "@/stores/useProductsStore";
import { ProductRow } from "./ProductRow";
import ProductSkelet from "./Skeleton/ProductSkelet";
const Products = () => {
  const {
    getAllProducts,
    products,
    toggleFeaturedProduct,
    deleteProduct,
    loading,
    loadingProductId,
  } = useProductsStore();

  const fetchProducts = useCallback(() => {
    getAllProducts();
  }, [getAllProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleToggleFeatured = async (productId) => {
    await toggleFeaturedProduct(productId);
    fetchProducts();
  };

  const handleDeleteProduct = async (productId) => {
    await deleteProduct(productId);
    fetchProducts();
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeInOut" }}
      className="px-4 py-4 shadow-lg bg-slate-800 w-full max-w-2xl">
      {loading && <ProductSkelet />}
      {!loading && products.length === 0 ? (
        <p className="text-center text-gray-300 w-full">No products found</p>
      ) : (
        <table className="w-full mx-auto text-center text-gray-300">
          <thead>
            <tr>
              <th className="hidden md:table-cell">Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <ProductRow
                key={index}
                product={product}
                onToggleFeatured={handleToggleFeatured}
                onDelete={handleDeleteProduct}
                loadingProductId={loadingProductId}
                index={index}
              />
            ))}
          </tbody>
        </table>
      )}
    </motion.div>
  );
};

export default Products;

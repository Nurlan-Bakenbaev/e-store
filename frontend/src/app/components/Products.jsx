"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useProductsStore } from "@/stores/useProductsStore";
import { truncateText } from "@/lib/helpers";
import ProductSkelet from "./Skeleton/ProductSkelet";

const Products = () => {
  const { getAllProducts, deleteProduct, toggleFeaturedProduct, products } =
    useProductsStore();

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  const handleToggleFeatured = async (productId) => {
    await toggleFeaturedProduct(productId);
    getAllProducts();
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeInOut" }}
      className="w-full max-w-2xl mx-auto p-3 shadow-lg bg-slate-800">
      {products.length === 0 && (
        <span className="text-lg text-gray-500"> No Products</span>
      )}
      <div>
        {!products && <ProductSkelet />}
        {products.map((product, index) => (
          <div
            key={index}
            className={`flex p-4 hover:bg-slate-700 items-center justify-between ${
              product.isFeatured && "bg-slate-900"
            }`}>
            <div className="flex w-full items-center gap-4">
              <Image
                width={150}
                height={150}
                src={product.image || "/categories/dress.jpg"}
                alt={`product-image of ${product?.name}`}
                className="w-[80px] h-[90px] object-cover"
              />
              <div className="w-full">
                <div className="flex justify-between gap-2 items-center">
                  <h4 className="font-semibold text-md">{product.name}</h4>
                </div>
                <p className="text-sm text-gray-500 truncated  ">
                  {truncateText(product.description, 50)}
                </p>
                <p className="text-lg font-semibold text-success">
                  ${product.price}
                </p>
                <span className="text-xs text-accent">{product.category}</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={() => handleToggleFeatured(product._id)}
                title="Make it Featured Product"
                className={`flex gap-2 p-2 hover:text-accent ${
                  product.isFeatured ? "text-yellow-500" : "text-gray-500"
                }`}>
                <StarRateIcon size={16} />
                Featured
              </button>
              <button
                onClick={() => deleteProduct(product._id)}
                className="text-red-500 p-4 hover:bg-red-500 hover:text-white ">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Products;

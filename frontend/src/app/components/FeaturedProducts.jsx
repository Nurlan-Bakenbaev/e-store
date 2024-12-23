"use client";
import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { useProductsStore } from "@/stores/useProductsStore";
import LoadingSpinner from "./LoadingSpinner";

const FeaturedProducts = () => {
  const { products, getFeaturedProducts, loading } = useProductsStore();

  useEffect(() => {
    getFeaturedProducts();
  }, [getFeaturedProducts]);

  const handleScroll = (direction) => {
    const scrollAmount = 5;
    const container = document.getElementById("carousel-container");
    if (direction === "next") {
      container.scrollLeft += scrollAmount;
    } else {
      container.scrollLeft -= scrollAmount;
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="relative">
      <div
        id="carousel-container"
        className="w-full flex space-x-4 justify-center overflow-x-auto no-scrollbar">
        {products?.map((product, index) => (
          <ProductCard
            index={index}
            key={product._id}
            product={product}
            size="small"
          />
        ))}
      </div>
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2">
        <button
          className="bg-gray-500 text-white p-2 rounded-full"
          onClick={() => handleScroll("prev")}>
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2">
        <button
          className="bg-gray-500 text-white p-2 rounded-full"
          onClick={() => handleScroll("next")}>
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default FeaturedProducts;

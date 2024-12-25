"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { useProductsStore } from "@/stores/useProductsStore";
import LoadingSpinner from "./LoadingSpinner";

const ITEMS_PER_PAGE = 3;

const FeaturedProducts = () => {
  const { products, getFeaturedProducts, loading } = useProductsStore();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getFeaturedProducts();
  }, [getFeaturedProducts]);

  const totalPages = Math.ceil(products?.length / ITEMS_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (loading) return <LoadingSpinner />;

  const visibleProducts = products.slice(
    currentPage * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  return (
    <div className="relative w-full">
      <div className="w-full flex justify-center space-x-4 overflow-hidden">
        {visibleProducts?.map((product, index) => (
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
          className="bg-gray-500 text-white p-2 rounded-full disabled:opacity-50"
          onClick={handlePrev}
          disabled={currentPage === 0}>
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2">
        <button
          className="bg-gray-500 text-white p-2 rounded-full disabled:opacity-50"
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}>
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default FeaturedProducts;

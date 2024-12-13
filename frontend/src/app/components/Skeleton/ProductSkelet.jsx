import React from "react";

const ProductSkelet = () => {
  return (
    <div>
      <div className="flex p-4 items-center justify-between animate-pulse">
        <div className="w-[80px] h-[90px] bg-gray-300 rounded" />
        <div className="w-full ml-4">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="h-6 w-12 bg-gray-300 rounded mb-2"></div>
          <div className="h-6 w-12 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkelet;

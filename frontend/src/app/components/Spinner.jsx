import React from "react";

const Spinner = ({ size = "sm", color = "text-white" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div
      className={`inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent ${sizeClasses[size]} ${color}`}
      role="status">
    </div>
  );
};

export default Spinner;

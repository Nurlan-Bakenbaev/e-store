"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";
const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    isFeatured: false,
  });
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
      className="w-full max-w-lg mx-auto bg-slate-800 p-5 shadow-lg ">
      <form className="space-y-2">
        <div>
          <label>Product name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            maxLength={1000}
            name="description"
            rows="4"
            cols="50"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full bg-transparent border pl-5  "
            required
          />
          <span className="text-xs text-gray-500">
            {formData.description.length}/1000
          </span>
        </div>
        <div>
          <label>
            <DollarSign size={15} /> Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="img_input">Image:</label>
          <input
            id="img_input"
            type="file"
            accept="image/*"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            className="block w-full text-sm
             text-gray-900 border border-gray-300 
             rounded-lg cursor-pointer bg-gray-50
              dark:text-gray-400 focus:outline-none
               dark:bg-gray-700 dark:border-gray-600
                dark:placeholder-gray-400"
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleInputChange}
            className="h-4 w-4 text-gray-600 focus:ring-gray-500  rounded"
          />
          <label className={`${formData.isFeatured && "text-accent"}`}>
            Featured Product
          </label>
        </div>
        <button
          type="submit"
          className="w-full text-sm py-2 px-4 rounded-md
           bg-blue-600 hover:bg-blue-800">
          Post
        </button>
      </form>
    </motion.div>
  );
};

export default CreateProduct;

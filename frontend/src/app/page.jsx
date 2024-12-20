"use client";
import { use, useEffect, useState } from "react";
import Categories from "./components/Categories";
import { categoriesArray } from "../lib/categories";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/motionAnimations";
import { useUserStore } from "@/stores/useUserStore";
import SignUpModel from "./components/SignUpModel";

const Home = () => {
  const { checkAuth, user } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      checkAuth();
    }
    if (user) return;
    const timeout = setTimeout(() => {
      if (!user || !isOpen) {
        setIsOpen(true);
      }
    }, 5000);
    return () => clearTimeout(timeout);
  }, [checkAuth, user]);
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <SignUpModel
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
      />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2, ease: "easeInOut" }}>
        <h1 className="text-xl md:text-4xl mb-5 text-center">
          Discover Our Categories
        </h1>
      </motion.div>
      <motion.div
        className="w-full md:w-[90%]  mx-auto flex flex-row flex-wrap justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible">
        {categoriesArray.map((category, index) => (
          <motion.div key={index} variants={itemVariants(index)}>
            <Categories cat={category.cat} image={category.image} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;

"use client";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from "@/stores/useUserStore";
import LoadingSpinner from "./LoadingSpinner";
import { useProductsStore } from "@/stores/useProductsStore";
import { useEffect, useState } from "react";
import SignUpModel from "./SignUpModel";
import { motion } from "framer-motion";

const Container = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Zustand stores
  const { checkingAuth, loading, checkAuth, user } = useUserStore();

  // pathname check for auth pages
  const path = usePathname();
  const isAuthPage = path === "/signup" || path === "/login";

  useEffect(() => {
    if (!user) {
      checkAuth();
    }
    if (isAuthPage || user) return;
    const timeout = setTimeout(() => {
      if (!user || !isOpen) {
        setIsOpen(true);
      }
    }, 5000);
    return () => clearTimeout(timeout);
  }, [checkAuth, user, isOpen]);
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div
      className={`min-h-screen ${
        isAuthPage ? "pt-0" : "pt-10"
      } bg-gradient-to-t from-background to-foreground
        text-white relative overflow-hidden`}>
      {(checkingAuth || loading ) && <LoadingSpinner />}
      <SignUpModel
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
      />
      <ToastContainer
        newestOnTop={true}
        position="bottom-left"
        autoClose={2000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        theme="colored"
      />
      <motion.div
        key={path}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`${isAuthPage ? "pb-0" : "pb-10"}`}>
        {children}
      </motion.div>
    </div>
  );
};

export default Container;

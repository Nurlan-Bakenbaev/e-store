"use client";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from "@/stores/useUserStore";
import LoadingSpinner from "./LoadingSpinner";
import { useEffect, useState } from "react";
import SignUpModel from "./SignUpModel";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Container = ({ children }) => {
  const router = useRouter();
  // Zustand stores
  const { checkingAuth, loading, checkAuth, user } = useUserStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth, !user]);

  // pathname check for auth pages
  const path = usePathname();
  const isAuthPage = path === "/signup" || path === "/login";
  return (
    <div
      className={`min-h-screen ${
        isAuthPage ? "pt-0" : "pt-10"
      } bg-gradient-to-t from-background to-foreground
        text-white relative overflow-hidden`}>
      {(checkingAuth || loading) && <LoadingSpinner />}
      <ToastContainer
        newestOnTop={true}
        limit={2}
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

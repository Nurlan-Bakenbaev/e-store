"use client";
import React, { use, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
const Container = ({ children }) => {
  const path = usePathname();
  const router = useRouter();
  const isAuthPage = path === "/signup" || path === "/login";
  return (
    <div
      className={`min-h-screen ${
        isAuthPage ? "pt-0" : "pt-20"
      } bg-gradient-to-t from-background to-foreground
        text-white relative overflow-hidden`}>
      <ToastContainer
        newestOnTop={true}
        position="top-left"
        autoClose={3000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        theme="colored"
      />
      {children}
    </div>
  );
};

export default Container;

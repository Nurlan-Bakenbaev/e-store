"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Container = ({ children }) => {
  const path = usePathname();
  const pathName = path === "/signup" || path === "/login";
  return (
    <div
      className={`min-h-screen ${
        pathName ? "pt-0" : "pt-20"
      } bg-gradient-to-t from-background to-foreground text-white relative overflow-hidden`}>
      <ToastContainer /> {children}
    </div>
  );
};

export default Container;

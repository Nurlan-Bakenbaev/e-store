"use client";
import React from "react";
import { usePathname } from "next/navigation";
const Container = ({ children }) => {
  const path = usePathname();
  const pathName = path === "/signup" || path === "/login";
  return (
    <div
      className={`min-h-screen ${
        pathName ? "pt-0" : "pt-20"
      } bg-gradient-to-t from-background to-foreground text-white relative overflow-hidden`}>
      {children}
    </div>
  );
};

export default Container;

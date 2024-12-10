"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { delay, motion } from "framer-motion";
import { Heart, ShoppingCart, LogOut, LogIn, Gauge } from "lucide-react";
import { Button } from "@mui/material";
import Image from "next/image";
const Navbar = () => {
  const user = false;
  const path = usePathname();
  if (path === "/login" || path === "/signup") return null;
  return (
    <nav className="text-neutral nav-bar p-4 h-[80px] drop-shadow-2xl border-b border-primary">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeInOut" }}
        className=" flex justify-between items-center w-full md:w-[80%] mx-auto ">
        <div className=" flex items-center text-2xl">
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}>
            <Image src="/logotip.png" alt="logotip" width={55} height={55} />
          </motion.div>
          <Link href="/" className="hidden md:flex items-center no-hover-link">
            <span className="text-4xl font-bold text-accent">Shop</span>
            <span className="text-4xl font-bold text-success mr-1">per</span>
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <Link href="/saved" className="flex items-center">
            <Heart className=" mr-1" />
            Saved
          </Link>
          <div className="relative">
            <Link href="/cart" className=" flex items-center cart-link">
              <ShoppingCart className=" mr-1" />
              Cart
              <span
                className="w-[22px] h-[22px] rounded-full bg-success opacity-[90%]
             absolute bottom-[-10px] right-[-10px]  text-center ">
                {1}
              </span>
            </Link>
          </div>
          {user ? (
            <div className="flex space-x-2">
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className=" no-hover-link border border-success
                   hover:bg-success flex items-center
                    px-4 py-2 rounded-md ">
                  <Gauge /> <span className="mx-1">Dashboard</span>
                </Link>
              )}
              <Button color="error" variant="outlined">
                <span className="flex  duration-200 ease-out hover:scale-95">
                  <LogOut className="mr-1" />
                  Logout
                </span>
              </Button>
            </div>
          ) : (
            <Link href="/login" className=" flex items-center">
              <LogIn className="mr-1" />
              Log In
            </Link>
          )}
        </div>
      </motion.div>
    </nav>
  );
};
export default Navbar;

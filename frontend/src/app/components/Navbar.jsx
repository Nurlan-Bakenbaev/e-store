"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { Heart, ShoppingCart, LogOut, LogIn, Gauge } from "lucide-react";
import { Button } from "@mui/material";
import Image from "next/image";
import { useUserStore } from "@/stores/useUserStore";
const Navbar = () => {
  const path = usePathname();
  const { user, logout } = useUserStore();
  if (path === "/login" || path === "/signup") return null;
  return (
    <nav
      className="text-neutral nav-bar p-4 h-[80px] drop-shadow-2xl
     border-b border-primary relative z-50">
      <div className=" flex justify-between items-center w-full md:w-[80%] mx-auto ">
        <div className=" flex items-center text-2xl">
          <img src="/logotip.png" alt="logotip" className="w-12 h-12" />
          <Link href="/" className="hidden md:flex items-center no-hover-link">
            <span className="text-4xl font-bold text-accent">Shop</span>
            <span className="text-4xl font-bold text-success mr-1">per</span>
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          {user?.role === "customer" && (
            <Link href="/saved" className="flex items-center">
              <Heart className=" mr-1" />
              Saved
            </Link>
          )}
          {user?.role === "customer" && (
            <div className="relative">
              <Link href="/cart" className=" flex items-center cart-link">
                <ShoppingCart className=" mr-1" />
                Cart
                <span
                  className="w-[22px] h-[22px] rounded-full bg-success opacity-[90%]
             absolute bottom-[-10px] right-[-10px]  text-center ">
                  {user.cartItems.length}
                </span>
              </Link>
            </div>
          )}
          {user ? (
            <div className="flex space-x-2">
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className={`no-hover-link border border-success
                   hover:bg-success flex items-center
                    px-4 py-2 rounded-md  ${
                      path === "/admin" ? "bg-success" : ""
                    }`}>
                  <Gauge /> <span className="mx-1">Admin</span>
                </Link>
              )}
              <Button onClick={logout} color="error" variant="outlined">
                <span className="flex  duration-200  ease-out hover:scale-90">
                  <LogOut />
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
      </div>
    </nav>
  );
};
export default Navbar;

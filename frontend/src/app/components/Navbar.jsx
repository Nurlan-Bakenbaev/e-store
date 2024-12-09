"use client";
import Link from "next/link";
import React from "react";
import { Heart, ShoppingCart, LogOut, LogIn, Gauge } from "lucide-react";

import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { Button } from "@mui/material";
import Image from "next/image";
const Navbar = () => {
  const user = {
    role: "admin",
  };
  return (
    <nav className="p-4 h-[80px] drop-shadow-2xl border-b border-primary">
      <div className=" flex justify-between items-center w-full md:w-[80%] mx-auto ">
        <div className=" flex items-center text-2xl italic">
          <Link href="/" className="hidden md:flex items-center no-hover-link">
            <span className="text-4xl font-bold text-accent">Shop</span>
            <span className="text-4xl font-bold text-success">per</span>
          </Link>
          <Image src="/logo2.gif" alt="logo" width={60} height={60} />
        </div>
        <div className="flex items-center space-x-6">
          <Link href="/saved" className="flex items-center">
            <Heart className=" mr-1" />
            Saved
          </Link>
          <Link href="/cart" className="flex items-center cart-link">
            <ShoppingCart className=" mr-1" />
            Cart
          </Link>
          {user ? (
            <div className="flex space-x-2">
              <Button
                color="error"
                variant="contained"
                className="flex items-center">
                <LogOut className="mr-1" />
                Logout
              </Button>
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className=" no-hover-link border border-success
                   hover:bg-success flex items-center
                    px-4 py-2 rounded-md ">
                  <Gauge /> <span className="mx-1">Dashboard</span>
                </Link>
              )}
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

"use client";
import React, { useState } from "react";
import { AtSign, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Email and Password are required");
      return;
    }

    console.log("Login data submitted:", formData);
  };
  const fadeInUp = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen">
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col justify-center items-center p-4 space-y-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: "easeInOut",
          }}>
          <h2 className="text-3xl text-center">Login</h2>
        </motion.div>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex items-center w-full max-w-md p-2 rounded-md">
          <AtSign />
          <input
            autoComplete="on"
            autoFocus
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            minLength="6"
            maxLength="100"
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            title="Please enter a valid email address"
          />
        </motion.div>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="flex items-center w-full max-w-md p-2 rounded-md">
          <Lock />
          <input
            autoComplete="on"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            name="password"
            required
          />
        </motion.div>
        {error && <span className="text-error text-sm">{error}</span>}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}>
          <button
            type="submit"
            className="w-full max-w-md py-2 bg-blue-600 rounded-md hover:bg-blue-800 transition">
            Login
          </button>
          <span className="text-sm text-center py-4">
            Don't have an account?
            <Link href="/signup" className="text-blue-500 font-bold ml-2">
              Sign Up
            </Link>
          </span>
        </motion.div>
      </form>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="hidden md:flex flex-1 relative">
        <div className="absolute inset-0 bg-slate-700 opacity-50 z-10" />
        <Image
          src="/login.jpg"
          alt="login-page-photo"
          fill
          className="object-cover "
        />
      </motion.div>
    </div>
  );
};

export default Login;

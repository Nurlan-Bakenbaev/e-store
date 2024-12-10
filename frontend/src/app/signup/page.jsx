"use client";
import React, { useState } from "react";
import { delay, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { User, AtSign, Lock, MoveRight } from "lucide-react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setPasswordError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
  };
  const fadeInSide = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  };
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <div className="flex flex-col  md:flex-row h-screen w-screen">
      <motion.div
        variants={fadeInSide}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1 }}
        className="hidden md:block flex-1 relative">
        <div className="absolute inset-0 bg-black opacity-50 z-10" />
        <Image
          src="/signup-baner.jpg"
          alt="signup-banner"
          fill
          objectFit="cover"
          className="inset-10"
        />
      </motion.div>
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col justify-center items-center p-4 space-y-2">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}>
          <h2 className="text-3xl font-bold text-center">Sign Up</h2>
        </motion.div>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
          className="flex items-center  w-full max-w-md  p-2 rounded-md">
          <User />
          <input
            type="text"
            autoFocus
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="User name"
            required
            pattern="^[a-zA-Z0-9]{3,25}$"
            minLength="3"
            maxLength="25"
            title="Username must be between 3 and 25 characters, and can only contain letters and numbers"
          />
        </motion.div>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 1, ease: "easeInOut" }}
          className="flex items-center w-full max-w-md p-2 rounded-md">
          <AtSign />
          <input
            autoComplete="on"
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
          transition={{ duration: 0.8, delay: 1.5, ease: "easeInOut" }}
          className="flex items-center w-full max-w-md p-2 rounded-md">
          <Lock />
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            minLength="8"
            maxLength="30"
            name="password"
            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
            title="Password must be at least 8 characters, including a number"
            required
          />
        </motion.div>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 2, ease: "easeInOut" }}
          className="flex items-center w-full max-w-md p-2 rounded-md">
          <Lock />
          <input
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            minLength="8"
            maxLength="30"
            name="confirmPassword"
            required
          />
        </motion.div>
        {passwordError && (
          <span className="text-error text-sm">{passwordError}</span>
        )}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 2.2, ease: "easeInOut" }}>
          <button
            type="submit"
            className="w-full max-w-md py-2 bg-blue-600 rounded-md hover:bg-blue-800 transition">
            Sign Up
          </button>
          <span className="text-sm text-center py-4">
            Already have an account?
            <Link href="/login" className="text-blue-500 font-bold ml-2">
              Login 
            </Link>
          </span>
        </motion.div>
      </form>
    </div>
  );
};

export default SignUp;

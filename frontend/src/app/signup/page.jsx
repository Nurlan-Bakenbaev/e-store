"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, AtSign, Lock } from "lucide-react";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { motion } from "framer-motion";


const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  console.log(formData);
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setPasswordError("");
  };
  const { signup, user } = useUserStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    signup(formData);
  };
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);
  //ANIMATION
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
        transition={{ duration: 0.8 }}
        className="hidden md:block flex-1 relative">
        <div className="absolute inset-0 bg-purple-900 opacity-40 z-10" />
        <Image
          src="/nobg.png"
          alt="signup-banner"
          fill
          objectFit="cover"
          objectPosition=" center"
          className=" "
        />
      </motion.div>
      <form
        onSubmit={handleSubmit}
        className={`flex-1 flex flex-col justify-center items-center p-4 space-y-2 `}>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}>
          <h2 className="text-3xl font-bold text-center">Sign Up</h2>
        </motion.div>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.6, ease: "easeInOut" }}
          className="flex items-center  w-full max-w-md  p-2 rounded-md">
          <User />
          <input
            type="text"
            autoFocus
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="User name"
            required
            minLength="3"
            maxLength="25"
          />
        </motion.div>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.8, ease: "easeInOut" }}
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
            title="Please enter a valid email address"
          />
        </motion.div>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 1.2, ease: "easeInOut" }}
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
            title="Password must be at least 8 characters, including a number"
            required
          />
        </motion.div>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 1.6, ease: "easeInOut" }}
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
            className="w-full  p-4 my-5  max-w-md py-2 bg-blue-600 rounded-md hover:bg-blue-800 transition">
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

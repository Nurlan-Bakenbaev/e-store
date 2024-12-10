"use client";
import { useUserStore } from "@/stores/useUserStore";
import React, { useEffect } from "react";

const Home = () => {
  const { checkAuth, user } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return <div>Home</div>;
};

export default Home;

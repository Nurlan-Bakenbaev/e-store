"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import CreateProducts from "../components/CreateProducts";
import Products from "../components/Products";
import Analytics from "../components/Analytics";
import { tabs } from "@/lib/categories";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";

const Admin = () => {
  const [selectedTab, setSelectedTab] = useState("create");
  const { user } = useUserStore();
  const router = useRouter();
  useEffect(() => {
    if (user?.role !== "admin") router.push("/");
  }, [user]);
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}>
        <h1 className="text-xl md:text-4xl mb-5 text-center">Admin Panel</h1>
      </motion.div>
      <div className="flex justify-center gap-4 mb-5">
        {tabs.map((tab) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
            key={tab.id}>
            <Button
              onClick={() => setSelectedTab(tab.id)}
              variant="contained"
              color="success"
              className="flex items-center gap-2"
              sx={{
                backgroundColor:
                  selectedTab === tab.id ? "purple" : "darkgreen",
              }}>
              <tab.icon size={20} />
              {tab.label}
            </Button>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        {selectedTab === "create" && <CreateProducts />}
        {selectedTab === "products" && <Products />}
        {selectedTab === "analitics" && <Analytics />}
      </div>
    </div>
  );
};

export default Admin;

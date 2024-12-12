"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { Plus, List, BarChart2, Dice1 } from "lucide-react";
import CreateProducts from "../components/CreateProducts";
import Products from "../components/Products";
import Analytics from "../components/Analytics";

const Admin = () => {
  const [selectedTab, setSelectedTab] = useState("create");

  const tabs = [
    {
      id: "create",
      label: "Create",
      icon: Plus,
    },
    {
      id: "products",
      label: "Products",
      icon: List,
    },
    {
      id: "analitics",
      label: "Analytics",
      icon: BarChart2,
    },
  ];

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

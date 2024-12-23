"use client";
import { Button } from "@mui/material";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
const PurchaseCancel = ({ onCancel }) => {
  const router = useRouter();
  const navigateHome = () => {
    router.push("/");
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center flex-col space-y-5 ">
      <XCircle size={60} color="red" />
      <p className="font-medium">Your purchase has been canceled.</p>
      <span className="text-gray-400">No charges has been made</span>
      <Button variant="contained" color="success" onClick={navigateHome}>
        Return to Home
      </Button>
    </motion.div>
  );
};

export default PurchaseCancel;

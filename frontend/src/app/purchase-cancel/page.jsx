"use client";
import { Button } from "@mui/material";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const PurchaseCancel = ({ onCancel }) => {
  const router = useRouter();
  const navigateHome = () => {
    router.push("/");
  };
  return (
    <div className="flex items-center flex-col  space-y-5 ">
      <XCircle size={60} color="red" />
      <p className="font-medium">Your purchase has been canceled.</p>
      <span className="text-gray-400">No charges has been made</span>
      <Button variant="contained" color="success" onClick={navigateHome}>
        Return to Home
      </Button>
    </div>
  );
};

export default PurchaseCancel;

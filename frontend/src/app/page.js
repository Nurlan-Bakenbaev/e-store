"use client";
import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import SignUpModel from "./components/SignUpModel";
import LoadingSpinner from "./components/LoadingSpinner";

const Home = () => {
  const { checkAuth, user } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      checkAuth();
    }
    const timeout = setTimeout(() => {
      if (!user) {
        setIsOpen(true);
      }
    }, 5000);
    return () => clearTimeout(timeout);
  }, [checkAuth, user]);
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <h1>Home Page</h1>
      {/* Auth Modul  */}
      <SignUpModel
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
      />
    </div>
  );
};

export default Home;

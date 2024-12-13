"use client";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from "@/stores/useUserStore";
import LoadingSpinner from "./LoadingSpinner";
import { useProductsStore } from "@/stores/useProductsStore";
import { useEffect, useState } from "react";
import SignUpModel from "./SignUpModel";
const Container = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  //ZUSTAND
  const { checkingAuth, loading, checkAuth, user } = useUserStore();
  const { loading: productLoading } = useProductsStore();

  //Styling
  const path = usePathname();
  const isAuthPage = path === "/signup" || path === "/login";
  useEffect(() => {
    if (!user) {
      checkAuth();
    }
    // will not trigger on auth pages
    if (isAuthPage || user) return;

    const timeout = setTimeout(() => {
      if (!user || !isOpen) {
        setIsOpen(true);
      }
    }, 5000);
    return () => clearTimeout(timeout);
  }, [checkAuth, user, isOpen]);
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div
      className={`min-h-screen ${
        isAuthPage ? "pt-0" : "pt-10"
      } bg-gradient-to-t from-background to-foreground
        text-white relative overflow-hidden `}>
      {checkingAuth || loading || (productLoading && <LoadingSpinner />)}

      {/* auth pop up window */}
      <SignUpModel
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
      />
      {/* react tostify component */}
      <ToastContainer
        newestOnTop={true}
        position="top-left"
        autoClose={3000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        theme="colored"
      />
      <div className={`${isAuthPage ? "pb-0" : "pb-10"}`}> {children}</div>
    </div>
  );
};

export default Container;

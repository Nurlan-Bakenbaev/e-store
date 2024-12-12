"use client";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from "@/stores/useUserStore";
import LoadingSpinner from "./LoadingSpinner";
const Container = ({ children }) => {
  const { checkingAuth, loading } = useUserStore();
  const path = usePathname();
  const isAuthPage = path === "/signup" || path === "/login";

  return (
    <div
      className={`min-h-screen ${
        isAuthPage ? "pt-0" : "pt-10"
      } bg-gradient-to-t from-background to-foreground
        text-white relative overflow-hidden `}>

      {checkingAuth || (loading && <LoadingSpinner />)}

      {/* react tostify component */}
      <ToastContainer
        newestOnTop={true}
        position="top-left"
        autoClose={3000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        theme="colored"/>
    <div className="mb-20">  {children}</div>
    </div>
  );
};

export default Container;

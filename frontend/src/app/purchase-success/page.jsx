"use client";
import React, { useEffect, useState } from "react";
import ConfettiComponent from "../components/Confetti";
import {
  MapPin,
  Phone,
  CreditCard,
  CalendarDays,
  DollarSign,
  Shirt,
} from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/stores/useCartStore";
import axios from "@/lib/axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";

const PurchaseSuccess = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { clearCart } = useCartStore();
  const [error, setError] = useState(null);
  const [order, setOrder] = useState({});

  useEffect(() => {
    const handleCheckoutSuccess = async (session_id) => {
      try {
        setIsProcessing(true);
        const res = await axios.post("/payments/create-success", {
          sessionId: session_id,
        });
        setOrder(res.data.newOrder);
        await clearCart();
        toast.success("Payment processed successfully!", { autoClose: 4000 });
      } catch (error) {
        setError(error.response?.data?.message || "Payment failed");
        toast.error(error.response?.data?.message || "Payment failed");
      } finally {
        setIsProcessing(false);
      }
    };

    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );
    if (sessionId) {
      handleCheckoutSuccess(sessionId);
    } else {
      setError("No sessionId found");
    }
  }, [clearCart]);

  useEffect(() => {
    console.log("Updated order:", order);
  }, [order]);

  if (isProcessing) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <>
      <div>
        <ConfettiComponent trigger />
      </div>

      <section className="py-8 md:py-16">
        <div className="mx-auto max-w-2xl px-4 2xl:px-0">
          <h2 className="text-2xl text-center sm:text-2xl mb-2">
          Thank you! Your purchase is successful.
          </h2>
          <p className="text-slate-300 mb-6 md:mb-8">
            Your order number:
            <span className="font-semibold text-accent mx-1 text-lg">
              {order._id}
            </span>
            will be processed within 24 hours during working days. We will
            contact you by your given e-mail.
          </p>
          <div className="space-y-4 sm:space-y-2 p-6 rounded-lg  bg-slate-800 mb-6 md:mb-8">
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-400 flex items-center">
                <CalendarDays className="w-4 h-4 mr-2" />
                Order Date
              </dt>
              <dd className="font-medium text-white sm:text-end">
                {new Date(order.updatedAt).toLocaleDateString()}
              </dd>
            </dl>
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-400 flex items-center">
                <CreditCard className="w-4 h-4 mr-2" />
                Payment Method
              </dt>
              <dd className="font-medium text-white sm:text-end">
                Card
              </dd>
            </dl>
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-400 flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Total amount
              </dt>
              <dd className="font-medium text-white sm:text-end">
                $ {order.totalAmount || "N/A"}
              </dd>
            </dl>
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-400 flex items-center">
                <Shirt className="w-4 h-4 mr-2" />
                Quantity
              </dt>
              <dd className="font-medium text-white sm:text-end">
                {order?.products?.[0]?.quantity || "N/A"}
                {order?.products?.[0]?.quantity > 1 ? " items" : " item"}
              </dd>
            </dl>
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-400">User Id</dt>
              <dd className="font-medium text-white sm:text-end">
                 {order.user || "N/A"}
              </dd>
            </dl>
            <div className="flex items-center justify-center mt-4">
              <Link
                href="/"
                className="inline-flex items-center px-6 py-2.5
                 text-sm  bg-green-700 rounded-lg
                  hover:bg-green-800 ">
                Return to shopping
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PurchaseSuccess;

import React from "react";
import ConfettiComponent from "../components/Confetti";
import {
  MapPin,
  Phone,
  CreditCard,
  CalendarDays,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";

const PurchaseSuccess = () => {
  return (
    <>
      <div>
        <ConfettiComponent trigger />
      </div>

      <section className="py-8  md:py-16">
        <div className="mx-auto max-w-2xl px-4 2xl:px-0">
          <h2 className="text-xl font-semiboldgray-900 sm:text-2xl mb-2">
            Thanks for your order!
          </h2>
          <p className="text-gray-500text-gray-400 mb-6 md:mb-8">
            Your order <span> #7564804</span> will be processed within 24 hours
            during working days. We will notify you by email once your order has
            been shipped.
          </p>
          <div className="space-y-4 sm:space-y-2  p-5 rounded-lg border bg-slate-800 mb-6 md:mb-8">
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0  text-gray-400 flex items-center">
                <CalendarDays className="w-4 h-4 mr-2" />
                Date
              </dt>
              <dd className="font-medium text-gray-900text-white sm:text-end">
                14 May 2024
              </dd>
            </dl>
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500text-gray-400 flex items-center">
                <CreditCard className="w-4 h-4 mr-2" />
                Payment Method
              </dt>
              <dd className="font-medium   sm:text-end">
                JPMorgan monthly installments
              </dd>
            </dl>
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-400">Name</dt>
              <dd className="font-medium  text-white sm:text-end">
                Flowbite Studios LLC
              </dd>
            </dl>
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-300 flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Address
              </dt>
              <dd className="font-medium  text-white sm:text-end">
                34 Scott Street, San Francisco, California, USA
              </dd>
            </dl>
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0  text-gray-400 flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                Phone
              </dt>
              <dd className="font-medium text-white sm:text-end">
                +(123) 456 7890
              </dd>
            </dl>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              Return to shopping
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default PurchaseSuccess;

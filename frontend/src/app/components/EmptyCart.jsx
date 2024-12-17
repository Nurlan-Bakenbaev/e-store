import React from "react";
import { MoveRight, ShoppingCart } from "lucide-react";
import Link from "next/link";

const EmptyCart = () => {
  return (
    <div className="flex justify-center items-center ">
      <div className="text-center">
        <ShoppingCart size={150} className="mx-auto mb-5" />
        <h2 className="text-xl font-semibold">Your Cart is Empty</h2>
        <Link
          href={"/"}
          className="mt-3 hover:scale-105 flex items-center gap-2 text-accent">
          Start shopping <MoveRight />
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;

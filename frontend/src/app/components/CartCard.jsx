import { Delete, Heart, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const CartCard = ({ cart }) => {
  const [itemQuantity, setItemQuantity] = useState(cart.quantity);

  const incrementItemQuantity = () => setItemQuantity(itemQuantity + 1);
  const decrementItemQuantity = () => {
    setItemQuantity(itemQuantity - 1);
    // TODO: Remove item from cart if quantity is 0
  };
  return (
    <div className="relative rounded-lg p-4 shadow-sm bg-slate-800 md:p-6">
      <div className="space-y-2 md:flex md:items-center md:justify-between gap-4">
        <div className="flex flex-row gap-2 items-center">
          <Link href="#" className="w-20">
            <Image
              width={100}
              height={100}
              className="max-h-50 max-w-30"
              src={cart.image}
              alt="image of iPhone"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </Link>
          <div className="w-full">
            <h5 className="text-md">{cart.name}</h5>
          </div>
        </div>
        <div className="flex items-center justify-between md:justify-end">
          <div className="flex items-center">
            <button
              onClick={decrementItemQuantity}
              type="button"
              className="hover:bg-slate-700 h-10 w-10 items-center justify-center rounded-md border border-slate-700">
              -
            </button>
            <input
              type="text"
              className="w-10 border-0 bg-transparent text-center text-sm font-medium focus:outline-none focus:ring-0"
              value={itemQuantity}
              readOnly
            />
            <button
              onClick={incrementItemQuantity}
              type="button"
              className="hover:bg-slate-700 h-10 w-10 items-center justify-center rounded-md border border-slate-700">
              +
            </button>
          </div>
          <div className="text-end md:w-32">
            <p className="text-base font-bold">${cart.price}</p>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="text-red-600 hover:text-red-700 absolute top-5 right-5">
        <Trash size={20} />
      </button>
    </div>
  );
};

export default CartCard;

import { Delete, Heart, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Spinner from "./Spinner";
import { useEffect } from "react";

const CartCard = ({
  cart,
  decrementItemQuantity,
  deleteItemFromCart,
  incrementItemQuantity,
  isLoading,
}) => {
  useEffect(() => {
    if (cart.quantity === 0) {
      deleteItemFromCart(cart);
    }
  }, [cart]);
  return (
    <div className="relative rounded-lg p-4 mb-2 shadow-sm bg-slate-800 md:p-6">
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
              onClick={() => decrementItemQuantity(cart)}
              type="button"
              className="hover:bg-slate-700 h-10 w-10 items-center justify-center rounded-md border border-slate-700">
              -
            </button>
            <input
              min={0}
              type="text"
              className="w-10 border-0 bg-transparent text-center text-sm font-medium focus:outline-none focus:ring-0"
              value={cart.quantity}
              readOnly
            />
            <button
              onClick={() => incrementItemQuantity(cart)}
              type="button"
              className="hover:bg-slate-700 h-10 w-10 items-center justify-center rounded-md border border-slate-700">
              +
            </button>
          </div>
          <div className="text-end md:w-32">
            <p className="text-base font-bold ">${cart.price}</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => deleteItemFromCart(cart)}
        type="button"
        className="text-red-600  hover:text-red-700 absolute top-3 right-5">
        {isLoading ? <Spinner /> : <Trash size={20} />}
      </button>
    </div>
  );
};

export default CartCard;

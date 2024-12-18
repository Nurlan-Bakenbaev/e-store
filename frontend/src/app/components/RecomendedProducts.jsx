import { truncateText } from "@/lib/helpers";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@mui/material";
import Image from "next/image";
import { useEffect } from "react";

const RecommendedProducts = ({ product, addToCart }) => {
  const { name, description, price, image } = product;
  return (
    <div className="space-y-4 px-2 py-3 overflow-hidden bg-slate-800  shadow-sm">
      <Link href="/cat" className="overflow-hidden rounded">
        <Image
          width={220}
          height={220}
          className="mx-auto h-52 w-52 object-cover mb-2 duration-300 ease-in-out hover:scale-110  "
          src={image}
          alt={`${name} image`}
        />
        <div>
          <p className="text-lg font-semibold  text-center">{name}</p>
          <div className="border-b border-gray-500 " />
          <p className="mt-2 text-xs text-center font-normal text-gray-500text-gray-400">
            {truncateText(description, 50)}
          </p>
        </div>
        <div>
          <div className="text-md text-center w-full">
            <p> ${price} </p>
          </div>
        </div>
      </Link>
      <div className="w-full text-right mt-4">
        <Button onClick={() => addToCart(product)} variant="contained">
          <ShoppingCart className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default RecommendedProducts;

import React from "react";
import { FileSearch } from "lucide-react";
import Link from "next/link";

const NoProducts = () => {
  return (
    <div className="w-full flex items-center flex-wrap justify-center gap-10">
      <div className="grid gap-4 w-60">
        <div className="w-20 h-20 mx-auto rounded-full shadow-sm flex items-center justify-center">
          <FileSearch size={60} />
        </div>
        <div>
          <h2 className="text-center text-lg pb-1">There's no product here</h2>
          <p className="text-center text-gray-400 pb-4">
            Try changing categories
            <br />
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/"
              className="underline font-semibold hover:scale-110  hover:text-accent">
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoProducts;

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
const Categories = ({ cat, image }) => {
  return (
    <div className="w-[280px]  md:w-[180px] lg:w-[160px] aspect-[4/5]  max-w-md  shadow-lg relative group m-2">
      <Link className="no-hover-link" href={`/categories/${cat}`}>
        <div className="relative w-full h-full">
          <div
            title={cat}
            className="absolute w-full h-full rounded-lg flex justify-center 
          inset-0 bg-black opacity-0 group-hover:opacity-40
           duration-300 ease-in-out z-10 "
          />
          <Image
            src={image}
            alt={`${cat}-category`}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            className="rounded-lg"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 2.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 10,
            }}
            className="absolute bottom-4 left-4 px-4 py-2 ">
            <h5 className="text-xl capitalize text-accent ">{cat}</h5>
          </motion.div>
        </div>
      </Link>
    </div>
  );
};

export default Categories;

import Image from "next/image";
import Spinner from "./Spinner";
import { Delete, Star } from "lucide-react";
import { truncateText } from "@/lib/helpers";
import { motion } from "framer-motion";

export const ProductRow = ({
  product,
  onToggleFeatured,
  onDelete,
  loadingProductId,
  index,
}) => (
  <motion.tr
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: index * 0.4, ease: "easeInOut" }}
    className={`${product.isFeatured ? "bg-slate-900" : ""}`}>
    <td className="p-4 hidden md:table-cell">
      <Image
        width={80}
        height={90}
        src={product.image || "/default-image.jpg"}
        alt={`product-image of ${product.name}`}
        className="h-[90px] object-cover"
      />
    </td>
    <td className="p-2 font-semibold text-md">{product.name}</td>
    <td className="p-2 text-sm text-gray-500">
      {truncateText(product.description, 50)}
    </td>
    <td className="p-2 text-sm text-gray-500">{product.category}</td>
    <td className="p-2 text-lg font-semibold text-success">${product.price}</td>
    <td>
      <button
        onClick={() => onToggleFeatured(product._id)}
        title="Toggle Featured Product"
        className={` p-2 rounded-full hover:text-accent hover:scale-105 ${
          product.isFeatured
            ? "text-accent border-accent"
            : "text-neutral border-neutral"
        }`}>
        {loadingProductId === product._id ? <Spinner /> : <Star size={20} />}
      </button>
    </td>
    <td>
      <button
        onClick={() => onDelete(product._id)}
        className="text-sm text-white bg-blue-500  p-2  rounded-full hover:bg-error hover:text-neutral">
        <Delete size={20} />
      </button>
    </td>
  </motion.tr>
);

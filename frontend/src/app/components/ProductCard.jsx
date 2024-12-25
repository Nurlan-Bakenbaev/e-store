"use client";
import { useEffect, useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Star, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { truncateText } from "@/lib/helpers";
import { useUserStore } from "@/stores/useUserStore";
import { toast } from "react-toastify";
import { useCartStore } from "@/stores/useCartStore";

const ProductCard = ({ product, index, size }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTextTruncated, setIsTextTruncated] = useState(true);
  const { addToCart, getCartItems } = useCartStore();
  const { user } = useUserStore();
  const [isInCart, setIsInCart] = useState(true);

  const handleImageClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const handleAddToCart = async (productId) => {
    setIsInCart(true);
    if (!user) {
      toast.error("Please login to add to cart");
    }
    await addToCart(productId);
    toast.success("Product added to cart", {
      autoClose: 3000,
    });
    getCartItems();
  };
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.2,
        duration: 0.5,
      },
    },
  };

  const handleToggleTruncateText = () => {
    setIsTextTruncated(!isTextTruncated);
  };
  useEffect(() => {
    if (user) {
      setIsInCart(
        user?.cartItems.some((item) => item.product.toString() === product._id)
      );
    }
    getCartItems();
  }, [user?.cartItems, product?._id, getCartItems, user]);
  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`bg-slate-800 overflow-hidden  hover:bg-slate-700 py-4 rounded-md 
        shadow-md  ${
          size ? "max-w-xs" : " max-w-md min-w-[120px]"
        } flex flex-col 
        sm:flex-${size ? "col" : "row"} items-center gap-4 group`}>
        <div onClick={handleImageClick} className="cursor-pointer">
          <Image
            height={180}
            width={320}
            src={product.image}
            alt={"photo of " + product.name}
            className={`group-hover:scale-105 px-2 duration-300 ease-in-out ${
              size ? "w-[180px] h-[180px]" : "min-w-[180px] max-h-[320px]"
            } object-cover object-top`}
          />
        </div>
        <div className={`flex flex-col  ${size ? "gap-0 p-1" : "gap-4 p-2"}`}>
          <h3 className={`text-${size ? "sm" : "lg"} font-semibold text-white`}>
            {product.name}
          </h3>
          {!size && (
            <span className="capitalize text-gray-400">
              Category: {product.category}
            </span>
          )}
          {size ? (
            ""
          ) : (
            <div className="text-gray-400">
              Description:
              <div
                onClick={handleToggleTruncateText}
                className="text-sm text-gray-200 cursor-pointer">
                {isTextTruncated ? (
                  <>
                    {truncateText(product.description, 100)}
                    <span className="text-accent">read more</span>
                  </>
                ) : (
                  product.description
                )}
              </div>
            </div>
          )}
          <div className="w-full h-[1px] bg-gray-500 my-2"></div>

          <p className={`text-${size ? "sm" : "lg"} font-bold  text-right`}>
            <span>Price:</span>
            <span> ${product.price.toFixed(2)}</span>
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            {product.isFeatured && (
              <div className="flex items-center gap-1 text-yellow-500">
                <Star size={16} /> <span>Featured</span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-auto">
            <Button
              disabled={user?.role === "admin"}
              onClick={() => {
                handleAddToCart(product);
              }}
              variant="contained"
              color="success"
              className={`flex items-center gap-2 text-${size ? "sm" : "md"} `}>
              <ShoppingCart size={18} />
              {isInCart ? "Added to cart" : "Add to cart"}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Dialog Model to show image of product  */}
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          style: {
            color: "black",
            borderRadius: "10px",
            overflow: "hidden",
          },
        }}>
        <DialogTitle>Product title : {product.name}</DialogTitle>
        <DialogContent>
          <div className="flex flex-col items-center">
            <Image
              height={500}
              width={500}
              src={product.image}
              alt={"photo of " + product.name}
              className="rounded-md"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ProductCard;

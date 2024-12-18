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
      autoClose: 4000,
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
  }, [user?.cartItems, product?._id]);
  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`bg-slate-800 hover:bg-slate-700 p-4 rounded-md 
        shadow-md w-full ${
          size ? "max-w-md" : " max-w-lg min-w-[280px]"
        } flex flex-col 
        sm:flex-${size ? "col" : "row"} items-center gap-4 group`}>
        <div onClick={handleImageClick} className="cursor-pointer">
          <Image
            height={280}
            width={280}
            src={product.image}
            alt={"photo of " + product.name}
            className={`group-hover:scale-105 duration-300 ease-in-out ${
              size ? "w-52  h-52" : "min-w-[220px] max-h-[320px]"
            } object-cover`}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h3 className="text-lg font-semibold text-white">{product.name}</h3>
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
          <span className="text-xl font-bold  text-right">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center justify-between text-sm text-gray-500">
            {product.isFeatured && (
              <div className="flex items-center gap-1 text-yellow-500">
                <Star size={16} /> <span>Featured</span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-auto">
            <Button
              onClick={() => {
                handleAddToCart(product);
              }}
              variant="contained"
              color="success"
              className="flex items-center gap-2">
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

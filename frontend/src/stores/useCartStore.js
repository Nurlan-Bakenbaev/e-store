import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-toastify";

const useCardStore = create((set, get) => ({
  cart: [],
  loading: false,
  addToCart: async (productId) => {
    set({ loading: true });
    try {
      const res = await axios.post("/cart/add", { productId });
      set({ cart: res.data.cart, loading: false });
      return res.data;
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Product creation failed");
    }
  },

  removeFromCart: async (productId) => {
    set({ loading: true });
    try {
      const res = await axios.delete(`/cart/remove/${productId}`);
      set({ cart: res.data.cart, loading: false });
      return res.data;
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Product creation failed");
    }
  },
  clearCart: async () => {
    set({ loading: true });
    try {
      const res = await axios.delete(`/cart/clear`);
      set({ cart: res.data.cart, loading: false });
      return res.data;
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Product creation failed");
    }
  },
  updateQuantity: async (productId, quantity) => {
    set({ loading: true });
    try {
      const res = await axios.patch(`/cart/update/${productId}`, { quantity });
      set({ cart: res.data.cart, loading: false });
      return res.data;
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Product creation failed");
    }
  },
  checkout: async () => {
    set({ loading: true });
    try {
      const res = await axios.post("/cart/checkout");
      set({ cart: res.data.cart, loading: false });
      return res.data;
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Product creation failed");
    }
  },
}));

export default useCardStore;

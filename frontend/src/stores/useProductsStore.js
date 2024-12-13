import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-toastify";

export const useProductsStore = create((set, get) => ({
  products: [],
  setProducts: (products) => set({ products }),
  loading: false,
  createProduct: async (formData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/products/create", formData);
      set((prevState) => ({
        products: [...prevState.products, res.data],
      }));
      toast.success("Product created successfully");
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Product creation failed");
    }
  },
  getAllProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/products");
      set({ products: res.data.products, loading: false });
      return res.data;
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Product creation failed");
    }
  },
}));

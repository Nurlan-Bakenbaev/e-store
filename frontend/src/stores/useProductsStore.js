import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-toastify";

export const useProductsStore = create((set, get) => ({
  products: [],
  setProducts: (products) => set({ products }),
  loading: false,
  loadingProductId: null,
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
  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      const res = await axios.delete(`/products/delete/${productId}`);
      set((prevState) => ({
        products: prevState.products.filter(
          (product) => product._id !== productId
        ),
      }));
      toast.success("Product deleted successfully");
      set({ loading: false });
    } catch (error) {
      console.log(error);
      set({ loading: false });
      toast.error(error.response?.data?.message || "Product deletion failed");
    }
  },
  toggleFeaturedProduct: async (productId) => {
    set({ loadingProductId: productId });
    set({ loading: true });
    try {
      const res = await axios.patch(`/products/toggle-featured/${productId}`);
      set((prevState) => ({
        products: prevState.products.map((product) => {
          if (product._id === productId) {
            return res.data;
          }
          return product;
        }),
      }));
      toast.success("Product updated successfully");
      set({ loadingProductId: null });
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Product update failed");
    }
  },
}));

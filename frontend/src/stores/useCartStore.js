import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-toastify";

const useCardStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,

  loading: false,

  getCartItems: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/cart/get");
      set({ cart: res.data.cart, loading: false });
      get().calculateTotals();
    } catch (error) {
      set({ loading: false });
      set({ cart: [] });
      toast.error(error.response?.data?.message || "Product creation failed");
    }
  },
  addToCart: async (productId) => {
    set({ loading: true });
    try {
      const res = await axios.post("/cart/add", { productId });
      set({ cart: res.data.cart, loading: false });
      get().calculateTotals();
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message);
    }
  },
  calculateTotals: async () => {
    const { cart, coupon } = get();
    const subtotal = cart.reduce(
      (sum, product) => sum + product.price * item.quantity,
      0
    );
    let total = subtotal;
    if (coupon) {
      const discount = subtotal(coupon.discountPercentage / 100);
      total = subtotal - discount;
    }
    set({ subtotal, total });
  },  
}));

export default useCardStore;

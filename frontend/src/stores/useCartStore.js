import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-toastify";
export const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,
  isCouponApplied: false,
  isLoadingId: null,
  recomendations: [],
  getMyCoupon: async () => {
    try {
      const response = await axios.get("/coupons");
      set({ coupon: response.data });
    } catch (error) {}
  },
  applyCoupon: async (code) => {
    try {
      const response = await axios.post("/coupons/validate", { code });
      set({ coupon: response.data, isCouponApplied: true });
      get().calculateTotals();
      toast.success("Coupon applied successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply coupon");
    }
  },
  removeCoupon: () => {
    set({ coupon: null, isCouponApplied: false });
    get().calculateTotals();
    toast.success("Coupon removed");
  },
  getCartItems: async () => {
    try {
      const res = await axios.get("/cart/get");
      set({ cart: res.data.cartItems || [] });
      get().calculateTotals();
    } catch (error) {
      set({ cart: [] });
      toast.error(error.response.data.message || "An error occurred");
    }
  },
  clearCart: async () => {
    set({ cart: [], coupon: null, total: 0, subtotal: 0 });
  },
  addToCart: async (product) => {
    try {
      await axios.post("/cart/add", { productId: product._id });

      set((prevState) => {
        const existingItem = prevState.cart.find(
          (item) => item._id === product._id
        );
        const newCart = existingItem
          ? prevState.cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...prevState.cart, { ...product, quantity: 1 }];

        return { cart: newCart };
      });
      get().calculateTotals();
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
    }
  },
  deleteFromCart: async (product) => {
    try {
      set({ isLoadingId: product._id });
      set((prevState) => ({
        cart: prevState.cart.filter((item) => item._id !== product.id),
      }));
      await axios.delete(`/cart/delete`, { data: { productId: product._id } });
      set({ isLoadingId: null });
      get().calculateTotals();
      get().getCartItems();
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
    }
  },
  updateQuantity: async (product) => {
    try {
      set((prevState) => ({
        cart: prevState.cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: product.quantity }
            : item
        ),
      }));
      await axios.put(`/cart/update/${product._id}`);

      get().calculateTotals();
      get().getCartItems();
    } catch (error) {}
  },
  calculateTotals: () => {
    const { cart, coupon } = get();
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    let total = subtotal;
    if (coupon) {
      const discount = subtotal * (coupon.discountPercentage / 100);
      total = subtotal - discount;
    }
    set({ subtotal, total });
  },
  fetchRecomendation: async () => {
    try {
      const res = await axios.get("/products/get/recommendations");
      set({ recomendations: res.data });
      console.log(res.data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  },
}));

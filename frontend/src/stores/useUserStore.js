import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-toastify";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: false,

  signup: async ({ name, email, password }) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      toast.success(res.data || "Signup successful");
      set({
        user: res.data.user,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      if (error.response?.status === 400) {
        toast.error("User already exists");
      } else {
        toast.error(error.response?.data?.message || "Signup failed");
      }
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/login", { email, password });
      toast.success("Login successful");
      console.log(res.data.user);
      set({
        user: res.data.user || null,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Login failed");
    }
  },
  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axios.get("/auth/profile");
      set({ loading: false });
      set({ user: res.data, checkingAuth: false });
    } catch (error) {
      set({ loading: false });
      set({ user: null, checkingAuth: false });
    }
  },
}));

import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-toastify";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password }) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      toast.success(res.data.message);
      set({ user: res?.data.user });
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      if (error.status === 400) {
        toast.error("User already exists");
      }
    }
  },
  login: async ({ email, password }) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/login", { email, password });
      toast.success(res.data.message);

      set({ user: res?.data.user });
      set({ loading: false });
    } catch (error) {
      set({ loading: false });

      toast.error(error.response.data.message);
    }
  },
}));

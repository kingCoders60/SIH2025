import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,

  signup: async (userData) => {
    set({ isSigningUp: true });
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/signup`, userData, {
        withCredentials: true,
      });

      set({ authUser: res.data }); // Update global user state
      toast.success("Signup successfull");

      setTimeout(() => {
        window.location.reload();
      }, 1500);
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
      console.error("Signup error:", error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
      console.log("Error in Login As User Not Existed.");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket?.();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));

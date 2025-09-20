import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
  try {
    const res = await axiosInstance.get("/auth/check");
    console.log("Auth check response:", res.data);
    // Combine authUser and isCheckingAuth update
    set({ authUser: res.data.user, isCheckingAuth: false }); 
  } catch (error) {
    console.error("Error in checkAuth:", error);
    // Combine authUser and isCheckingAuth update
    set({ authUser: null, isCheckingAuth: false });
  }
  // The 'finally' block is no longer needed
},

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      console.log("Signup response:", res.data);
      set({ authUser: res.data.user }); // ✅ assumes backend returns { user, token }
      toast.success("Account created successfully");
    } catch (error) {
      const message = error.response?.data?.message || "Signup failed";
      toast.error(message);
      console.error("Signup error:", error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      console.log("Login response:", res.data);
      set({ authUser: res.data.user }); // ✅ consistent shape
      toast.success("Logged in successfully");
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      console.error("Login error:", error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
  try {
    await axiosInstance.post("/auth/logout");
    toast.success("Logged out successfully");
  } catch (error) {
    const message = error.response?.data?.message || "Logout failed on the server";
    toast.error(message); // Still inform the user of the server error
    console.error("Logout error:", error);
  } finally {
    set({ authUser: null }); // ✅ Always clears the user from the client state
  }
},

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      console.log("Update profile response:", res.data);
      set({ authUser: res.data.user }); // ✅ consistent shape
      toast.success("Profile updated successfully");
    } catch (error) {
      const message = error.response?.data?.message || "Update failed";
      toast.error(message);
      console.error("Update profile error:", error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));

// context/AuthProvider.jsx
"use client";

import { createContext, useContext } from "react";
import { useAuthStore } from "../store/useAuthStore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useAuthStore();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return {
    ...context,
    user: context.authUser,
    isAuthenticated: !!context.authUser,
    isAdmin: context.authUser?.role === "admin",
  };
};

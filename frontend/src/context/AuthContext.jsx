"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export { AuthContext };

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      // Placeholder for API call
      // const response = await authAPI.login(credentials)

      // Mock login for development with enhanced user data
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: credentials.name || "John Doe",
        email: credentials.email,
        role: credentials.role,
        region: credentials.region || "North",
        avatar: "/diverse-user-avatars.png",
        joinedAt: new Date().toISOString(),
        stats: {
          modulesCompleted: 0,
          drillsParticipated: 0,
          totalXP: 0,
          level: 1,
          badges: [],
        },
        preferences: {
          notifications: true,
          emailAlerts: true,
          theme: "light",
        },
      };

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return { success: true, user: mockUser };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: error.message || "Login failed" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const updateUserStats = (statUpdates) => {
    const updatedUser = {
      ...user,
      stats: { ...user.stats, ...statUpdates },
    };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    updateUserStats,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

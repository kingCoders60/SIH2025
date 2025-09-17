"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useTheme } from "../context/ThemeContext"; // Import the useTheme hook
import {
  Shield,
  Menu,
  X,
  LogOut,
  PanelLeft,
  PanelLeftClose,
  Sun,
  Moon,
} from "lucide-react";

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme(); // Use the theme context
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              DisasterPrep
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {/* Dark mode toggle for desktop */}
            <button
              onClick={toggleDarkMode}
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              {isDarkMode ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
            </button>

            {!user ? (
              <>
                <Link
                  to="/"
                  className="text-gray-700 dark:text-gray-400 hover:text-primary-600 font-medium transition-colors">
                  Home
                </Link>
                <Link to="/login" className="btn-primary">
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 dark:text-gray-400 hover:text-primary-600 font-medium transition-colors">
                  Dashboard
                </Link>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {user.name}
                    </span>
                    <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                      {user.role}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-gray-500 dark:text-gray-400 hover:text-red-600 transition-colors">
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-4">
            {/* Dark mode toggle for mobile */}
            <button
              onClick={toggleDarkMode}
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              {isDarkMode ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-400 hover:text-primary-600">
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            {!user ? (
              <div className="space-y-2">
                <Link
                  to="/"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-primary-600 font-medium hover:bg-primary-50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <img
                      src={user.avatar || "/placeholder.png"}
                      alt={user.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user.role}
                      </p>
                    </div>
                  </div>
                </div>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg">
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

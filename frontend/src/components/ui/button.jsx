import React from "react";

export function Button({ children, className = "", variant = "primary", size = "md", ...props }) {
  const base = "inline-flex items-center justify-center font-semibold rounded-lg transition-colors duration-200 focus:outline-none";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
  };
  const sizes = {
    md: "px-4 py-2 text-base",
    icon: "p-2 text-lg",
  };
  return (
    <button
      className={`${base} ${variants[variant] || ""} ${sizes[size] || ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

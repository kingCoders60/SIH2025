import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm p-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "" }) {
  return (
    <h3 className={`text-xl font-semibold text-gray-900 mb-2 ${className}`}>{children}</h3>
  );
}

export function CardDescription({ children, className = "" }) {
  return (
    <p className={`text-gray-600 ${className}`}>{children}</p>
  );
}

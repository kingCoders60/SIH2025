import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import {
  LayoutDashboard,
  BookOpen,
  Target,
  AlertTriangle,
  Settings,
  Trophy,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      roles: ["student", "teacher", "admin"],
    },
    {
      name: "Modules",
      href: "/modules",
      icon: BookOpen,
      roles: ["student", "teacher", "admin"],
    },
    {
      name: "Drills",
      href: "/drills",
      icon: Target,
      roles: ["student", "teacher", "admin"],
    },
    {
      name: "Gamification",
      href: "/gamification",
      icon: Trophy,
      roles: ["student", "teacher", "admin"],
    },
    {
      name: "Alerts",
      href: "/alerts",
      icon: AlertTriangle,
      roles: ["student", "teacher", "admin"],
    },
    { name: "Admin Panel", href: "/admin", icon: Settings, roles: ["admin"] },
    {
      name: "Report Case",
      href: "/report-case",
      icon: AlertTriangle,
      roles: ["student", "teacher"],
    },
  ];

  const filteredNavigation = navigation.filter((item) =>
    item.roles.includes(user?.role?.toLowerCase())
  );

  return (
    <>
      {/* Narrow hover zone to trigger sidebar open */}
      <div
        className="fixed top-0 left-0 h-screen w-4 z-50"
        onMouseEnter={() => setIsOpen(true)}
      />

      {/* Sidebar container */}
      <div
        className="fixed left-0 top-0 h-screen w-64 z-40 transition-transform duration-300 ease-in-out"
        onMouseLeave={() => setIsOpen(false)}>
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`fixed top-1/2 p-2 bg-primary-600 text-white rounded-r-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-transform duration-300 transform -translate-y-1/2 ${
            isOpen ? "left-64" : "left-0"
          } z-50`}>
          {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>

        {/* Slidable Sidebar */}
        <div
          className={`h-full bg-white shadow-lg border-r border-gray-200 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}>
          <div className="p-4 pt-16">
            <nav className="space-y-2">
              {filteredNavigation.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary-100 text-primary-700 border-r-2 border-primary-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}>
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

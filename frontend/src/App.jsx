import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import AnimatedBackground from "./components/AnimatedBackground";
import { ThemeProvider } from "./context/ThemeContext";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Modules from "./pages/Modules";
import ModuleDetails from "./pages/ModuleDetails";
import Drills from "./pages/Drills";
import Alerts from "./pages/Alerts";
import AdminPanel from "./pages/AdminPanel";
import ChatbotPage from "./pages/ChatbotPage";
import Gamification from "./pages/Gamification"; // ✅ Added

// Components
import Leaderboard from "./components/Leaderboard";
import FloatingAiIcon from "./components/FloatingAiIcon";

// Protected Route
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { authUser } = useAuthStore();
  const isAuthenticated = !!authUser;

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (adminOnly && authUser?.role !== "admin")
    return <Navigate to="/dashboard" replace />;
  return children;
};

// Layouts
const Layout = ({ children }) => (
  <div className="min-h-screen bg-background/80 backdrop-blur-sm">
    <Navbar />
    <div className="flex">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
    <Footer />
  </div>
);

const AuthLayout = ({ children }) => (
  <div className="min-h-screen bg-background/80 backdrop-blur-sm">
    {children}
  </div>
);

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const isAuthenticated = !!authUser;

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      <AnimatedBackground />
      <ThemeProvider>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          {/* <Route path='/drills' element={<Drills />} /> */}

          {/* Auth */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <AuthLayout>
                  <Login />
                </AuthLayout>
              )
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <AuthLayout>
                  <Signup />
                </AuthLayout>
              )
            }
          />

          {/* Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/modules"
            element={
              <ProtectedRoute>
                <Layout>
                  <Modules />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/modules/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <ModuleDetails />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/drills"
            element={
              <ProtectedRoute>
                <Layout>
                  <Drills />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/alerts"
            element={
              <ProtectedRoute>
                <Layout>
                  <Alerts />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Leaderboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/gamification"
            element={
              <ProtectedRoute>
                <Layout>
                  <Gamification />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <Layout>
                  <AdminPanel />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ThemeProvider>
      <FloatingAiIcon />
    </div>
  );
}

export default App;

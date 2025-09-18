import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore"; // ✅ use Zustand directly
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import AnimatedBackground from "./components/AnimatedBackground";
import { ThemeProvider } from "./context/ThemeContext";
// Import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Modules from "./pages/Modules";
import ModuleDetails from "./pages/ModuleDetails";
import Drills from "./pages/Drills";
import Alerts from "./pages/Alerts";
import AdminPanel from "./pages/AdminPanel";
import Leaderboard from "./components/Leaderboard";
import FloatingAiIcon from './components/FloatingAiIcon';
import ChatbotPage from "./pages/ChatbotPage"; 


// Protected Route component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { authUser } = useAuthStore();
  const isAuthenticated = !!authUser;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && authUser?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// Layout component for pages with navbar and sidebar
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

// Layout for auth pages (no navbar/sidebar)
const AuthLayout = ({ children }) => (
  <div className="min-h-screen bg-background/80 backdrop-blur-sm">
    {children}
  </div>
);

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const isAuthenticated = !!authUser;

  useEffect(() => {
    checkAuth(); // ✅ restore auth state on refresh
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
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path='/chatbot' element={<ChatbotPage />} />

          {/* Auth routes */}
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

          {/* Protected routes */}
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

          {/* Admin only routes */}
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

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ThemeProvider>
      <FloatingAiIcon />
    </div>
  );
}

export default App;

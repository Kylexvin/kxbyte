import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import './App.css';

// ==================== Pages & Components ====================
import Home from './pages/Home/Home';
import About from './pages/About/About';
import WebDevelopment from './pages/Services/ServiceDetail/WebDevelopment';
import Branding from './pages/Services/ServiceDetail/Branding';
import SEO from './pages/Services/ServiceDetail/SEO';
import Enterprise from './pages/Services/ServiceDetail/Enterprise';
import WebPlatforms from './pages/Services/ServiceDetail/WebPlatforms';
import MobileSolutions from './pages/Services/ServiceDetail/MobileSolutions';
import Contact from './pages/Contact/Contact';
import BrandingPortfolio from './pages/Portfolio/BrandingPortfolio';
import Login from './pages/Login/Login';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ApplicationsPage from './pages/Admin/ApplicationsPage';
import AnalyticsPage from './pages/Admin/AnalyticsPage';
import ShopManagement from './pages/Admin/ShopManagement';
// ==================== AXIOS CONFIG ====================
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'https://kxtill.onrender.com/api';
axios.defaults.timeout = 10000;

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('adminToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// ==================== AUTH CONTEXT ====================
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');
    if (token && userData) setUser(JSON.parse(userData));
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post('/auth/login', { email, password });
      const { token, user } = data;

      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminUser', JSON.stringify(user));
      setUser(user);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ==================== PROTECTED ROUTE ====================
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/admin/login" state={{ from: location }} replace />;

  return children;
};

// ==================== MAIN APP ====================
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services/web-development" element={<WebDevelopment />} />
            <Route path="/services/branding" element={<Branding />} />
            <Route path="/services/seo" element={<SEO />} />
            <Route path="/services/enterprise" element={<Enterprise />} />
            <Route path="/services/web-platforms" element={<WebPlatforms />} />
            <Route path="/services/mobile-solutions" element={<MobileSolutions />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/portfolio/branding" element={<BrandingPortfolio />} />

            {/* Auth Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/applications"
              element={
                <ProtectedRoute>
                  <ApplicationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <ProtectedRoute>
                  <AnalyticsPage />
                </ProtectedRoute>
              }
            />
<Route
  path="/admin/shops"
  element={
    <ProtectedRoute>
      <ShopManagement />
    </ProtectedRoute>
  }
/>
            {/* Fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
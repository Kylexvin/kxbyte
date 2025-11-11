// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
// Import your components
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
import './App.css';
// ==================== AXIOS LOGICS INSIDE APP.JS ====================
// Configure axios defaults
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
axios.defaults.timeout = 10000;

// Add auth token to every request
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle auth errors globally
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);
// ==================== END AXIOS LOGICS ====================



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
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
          <Route path="/admin/login" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
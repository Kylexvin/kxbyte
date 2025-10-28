import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import WebDevelopment from './pages/Services/ServiceDetail/WebDevelopment';
import Branding from './pages/Services/ServiceDetail/Branding';
import SEO from './pages/Services/ServiceDetail/SEO';
import Enterprise from './pages/Services/ServiceDetail/Enterprise';
import WebPlatforms from './pages/Services/ServiceDetail/WebPlatforms';
import MobileSolutions from './pages/Services/ServiceDetail/MobileSolutions';
import Contact from './pages/Contact/Contact';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />
          
          {/* Service Detail Pages */}
          <Route path="/services/web-development" element={<WebDevelopment />} />
          <Route path="/services/branding" element={<Branding />} />
          <Route path="/services/seo" element={<SEO />} />
          <Route path="/services/enterprise" element={<Enterprise />} />
          <Route path="/services/web-platforms" element={<WebPlatforms />} />
          <Route path="/services/mobile-solutions" element={<MobileSolutions />} />
          
          {/* Contact Page */}
          <Route path="/contact" element={<Contact />} />
          
          {/* Fallback to Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
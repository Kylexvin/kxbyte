import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
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
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services/web-development" element={<WebDevelopment />} />
          <Route path="/services/branding" element={<Branding />} />
          <Route path="/services/seo" element={<SEO />} />
          <Route path="/services/enterprise" element={<Enterprise />} />
          <Route path="/services/web-platforms" element={<WebPlatforms />} />
          <Route path="/services/mobile-solutions" element={<MobileSolutions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
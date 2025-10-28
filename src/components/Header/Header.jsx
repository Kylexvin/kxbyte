import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (path) => {
    setIsMobileMenuOpen(false);
    
    switch (path) {
      case 'home':
        if (location.pathname === '/') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          navigate('/');
        }
        break;
      
      case 'about':
        navigate('/about');
        break;
      
      case 'services':
        if (location.pathname === '/') {
          const servicesSection = document.getElementById('services-section');
          if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          navigate('/');
          // Wait for navigation then scroll to services
          setTimeout(() => {
            const servicesSection = document.getElementById('services-section');
            if (servicesSection) {
              servicesSection.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }
        break;
      
      case 'contact':
        navigate('/contact');
        break;
      
      default:
        navigate('/');
    }
  };

  const handleLogoClick = () => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActiveLink = (path) => {
    if (path === 'home' && location.pathname === '/') return true;
    if (path === 'about' && location.pathname === '/about') return true;
    if (path === 'services' && location.pathname.includes('/services')) return true;
    if (path === 'contact' && location.pathname === '/contact') return true;
    return false;
  };

  return (
    <header>
      <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        <img src="/assets/images/logo.png" alt="KXBYTE Logo" className="logo-img" />
        KXBYT<span className="glitch">E</span>
      </div>

      {/* Desktop Navigation */}
      <nav className="desktop-nav">
        <a 
          href="/" 
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className={isActiveLink('home') ? 'active' : ''}
        >
          Home
        </a>
        <a 
          href="/about" 
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('about');
          }}
          className={isActiveLink('about') ? 'active' : ''}
        >
          About
        </a>
        <a 
          href="#services" 
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('services');
          }}
          className={isActiveLink('services') ? 'active' : ''}
        >
          Services
        </a>
        <a 
          href="/contact" 
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('contact');
          }}
          className={isActiveLink('contact') ? 'active' : ''}
        >
          Contact
        </a>
      </nav>

      {/* Mobile Menu Button */}
      <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <a 
          href="/" 
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className={isActiveLink('home') ? 'active' : ''}
        >
          Home
        </a>
        <a 
          href="/about" 
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('about');
          }}
          className={isActiveLink('about') ? 'active' : ''}
        >
          About
        </a>
        <a 
          href="#services" 
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('services');
          }}
          className={isActiveLink('services') ? 'active' : ''}
        >
          Services
        </a>
        <a 
          href="/contact" 
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('contact');
          }}
          className={isActiveLink('contact') ? 'active' : ''}
        >
          Contact
        </a>
      </nav>
    </header>
  );
};

export default Header;
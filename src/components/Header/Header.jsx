import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path) => {
    if (location.pathname === '/') {
      // If we're on home page, scroll to section
      if (path === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (path === 'services-section') {
        const servicesSection = document.getElementById('services-section');
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      // If we're on another page, navigate to home with hash
      if (path === 'home') {
        navigate('/');
      } else {
        navigate(`/#${path}`);
      }
    }
  };

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const isActiveLink = (path) => {
    if (location.pathname === '/' && path === 'home') return true;
    if (location.pathname.includes(path) && path !== 'home') return true;
    return false;
  };

  return (
    <header>
      <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        <img src="/assets/images/logo.png" alt="KXBYTE Logo" className="logo-img" />
        KXBYT<span className="glitch">E</span>
      </div>
      <nav>
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
          href="#about" 
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
            handleNavClick('services-section');
          }}
          className={isActiveLink('services') ? 'active' : ''}
        >
          Services
        </a>
        <a 
          href="#contact" 
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
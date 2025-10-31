import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (path.startsWith('/')) {
      navigate(path);
    } else {
      // Scroll to section on home page
      if (window.location.pathname === '/') {
        const section = document.getElementById(path);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/');
        setTimeout(() => {
          const section = document.getElementById(path);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  };

  const services = [
    { name: 'Web Development', path: '/services/web-development' },
    { name: 'Mobile Solutions', path: '/services/mobile-solutions' },
    { name: 'Brand Identity', path: '/services/branding' },
    { name: 'SEO & Marketing', path: '/services/seo' },
    { name: 'Enterprise Systems', path: '/services/enterprise' }
  ];

  const company = [
    { name: 'About Us', path: '/about' },
    { name: 'Our Process', path: '/process' },
    { name: 'Case Studies', path: '/portfolio' },
    { name: 'Careers', path: '/careers' },
    { name: 'Blog', path: '/blog' }
  ];

  const contactInfo = [
    { 
      icon: '📧', 
      label: 'Email', 
      value: 'info@kxbyte.com', 
      link: 'mailto:info@kxbyte.com' 
    },
    { 
      icon: '📞', 
      label: 'Phone', 
      value: '+254 712 345 678', 
      link: 'tel:+254712345678' 
    },
    { 
      icon: '📍', 
      label: 'Address', 
      value: 'Nairobi, Kenya', 
      link: 'https://maps.google.com/?q=Nairobi,Kenya' 
    },
    { 
      icon: '🕒', 
      label: 'Working Hours', 
      value: 'Mon - Fri: 9AM - 6PM EAT', 
      link: null 
    }
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com/company/kxbyte' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com/kxbyte' },
    { name: 'GitHub', icon: '💻', url: 'https://github.com/kxbyte' },
    { name: 'Instagram', icon: '📷', url: 'https://instagram.com/kxbyte' }
  ];

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-section">
              <div className="footer-logo">
                <img src="/assets/images/logo.png" alt="KXBYTE" className="logo-img" />
                <span className="logo-text">KXBYTE</span>
              </div>
              <p className="company-description">
                We build digital solutions that drive growth. From web development to brand identity, 
                we create experiences that connect with your audience and deliver results.
              </p>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <span className="social-icon">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="footer-section">
              <h3 className="section-title">Services</h3>
              <ul className="footer-links">
                {services.map((service, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNavigation(service.path)}
                      className="footer-link"
                    >
                      {service.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="footer-section">
              <h3 className="section-title">Company</h3>
              <ul className="footer-links">
                {company.map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNavigation(item.path)}
                      className="footer-link"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-section">
              {/* <h3 className="section-title">Get In Touch</h3>
              <div className="contact-info">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="contact-item">
                    <span className="contact-icon">{contact.icon}</span>
                    <div className="contact-details">
                      <span className="contact-label">{contact.label}:</span>
                      {contact.link ? (
                        <a href={contact.link} className="contact-value">
                          {contact.value}
                        </a>
                      ) : (
                        <span className="contact-value">{contact.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div> */}
              
              <div className="newsletter">
                <h4>Stay Updated</h4>
                <p>Get the latest insights on tech and design</p>
                <div className="newsletter-form">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="newsletter-input"
                  />
                  <button className="newsletter-btn">→</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="copyright">
              &copy; {new Date().getFullYear()} KXBYTE. All rights reserved.
            </div>
            <div className="footer-legal">
              <button 
                onClick={() => handleNavigation('/privacy')}
                className="legal-link"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => handleNavigation('/terms')}
                className="legal-link"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => handleNavigation('/cookies')}
                className="legal-link"
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
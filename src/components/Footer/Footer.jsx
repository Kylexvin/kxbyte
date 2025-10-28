import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h2>KXBYTE</h2>
          <p>Innovative digital solutions tailored for your business—web, branding, and everything in between.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#careers">Careers</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: <a href="mailto:info@kxbyte.com">info@kxbyte.com</a></p>
          <p>Phone: +254 712 345 678</p>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; 2025 KXBYTE. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
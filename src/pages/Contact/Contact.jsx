import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <Header />
      <div className="contact-hero">
        <h1>Get In Touch</h1>
        <p>Ready to start your project? Let's talk about how we can help.</p>
      </div>
      <div className="contact-content">
        <p>Contact form and information coming soon...</p>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
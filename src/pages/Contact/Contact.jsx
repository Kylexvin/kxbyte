import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/common/Button';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://formspree.io/f/mqalydvo', { // Replace with your Formspree ID
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          service: '',
          budget: '',
          timeline: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email Us',
      details: 'info@kxbyte.com',
      link: 'mailto:info@kxbyte.com'
    },
    {
      icon: '📞',
      title: 'Call Us',
      details: '+254 712 345 678',
      link: 'tel:+254712345678'
    },
    {
      icon: '📍',
      title: 'Visit Us',
      details: 'Nairobi, Kenya',
      link: 'https://maps.google.com'
    },
    {
      icon: '🕒',
      title: 'Working Hours',
      details: 'Mon - Fri: 9AM - 6PM EAT',
      link: null
    }
  ];

  const services = [
    'Web Development',
    'Mobile App Development',
    'Brand Identity',
    'SEO & Marketing',
    'Enterprise Systems',
    'Other'
  ];

  const budgets = [
    'Less than $5,000',
    '$5,000 - $15,000',
    '$15,000 - $30,000',
    '$30,000 - $50,000',
    '$50,000+',
    'Not sure yet'
  ];

  const timelines = [
    'Urgent (1-4 weeks)',
    'Standard (1-3 months)',
    'Flexible (3-6 months)',
    'Just planning phase'
  ];

  return (
    <div className="contact-page">
      <Header />
      
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <h1>Let's Build Something Amazing</h1>
            <p>Ready to start your project? Get in touch and let's discuss how we can bring your ideas to life.</p>
          </div>
        </div>
      </section>

      <div className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info">
              <h2>Get In Touch</h2>
              <p className="info-subtitle">
                We're here to help you transform your ideas into digital reality. 
                Reach out and let's start the conversation.
              </p>

              <div className="contact-methods">
                {contactInfo.map((item, index) => (
                  <div key={index} className="contact-method">
                    <div className="method-icon">{item.icon}</div>
                    <div className="method-details">
                      <h4>{item.title}</h4>
                      {item.link ? (
                        <a href={item.link}>{item.details}</a>
                      ) : (
                        <p>{item.details}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="social-links">
                <h4>Follow Us</h4>
                <div className="social-icons">
                  <a href="#" className="social-link">LinkedIn</a>
                  <a href="#" className="social-link">Twitter</a>
                  <a href="#" className="social-link">Instagram</a>
                  <a href="#" className="social-link">GitHub</a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-container">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="service">Service Interested In *</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="budget">Project Budget *</label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select budget range</option>
                      {budgets.map((budget, index) => (
                        <option key={index} value={budget}>{budget}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="timeline">Timeline *</label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select timeline</option>
                      {timelines.map((timeline, index) => (
                        <option key={index} value={timeline}>{timeline}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Project Details *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell us about your project goals, requirements, and any specific features you need..."
                  ></textarea>
                </div>

                {submitStatus === 'success' && (
                  <div className="form-message success">
                    ✅ Thank you! Your message has been sent. We'll get back to you within 24 hours.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="form-message error">
                    ❌ There was an error sending your message. Please try again or email us directly.
                  </div>
                )}

                <Button 
                  type="submit" 
                  variant="primary" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : '→ Send Message'}
                </Button>

                <p className="form-note">
                  We respect your privacy. Your information is secure and will never be shared with third parties.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>How long does a typical project take?</h4>
              <p>Project timelines vary based on complexity. Simple websites take 2-4 weeks, while complex applications can take 3-6 months. We'll provide a detailed timeline during our consultation.</p>
            </div>
            <div className="faq-item">
              <h4>Do you offer ongoing support?</h4>
              <p>Yes! We offer various support packages for maintenance, updates, and technical support after project completion.</p>
            </div>
            <div className="faq-item">
              <h4>What's your development process?</h4>
              <p>We follow an agile methodology: Discovery → Design → Development → Testing → Launch → Support.</p>
            </div>
            <div className="faq-item">
              <h4>Do you work with startups?</h4>
              <p>Absolutely! We love working with startups and offer flexible engagement models to suit early-stage businesses.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
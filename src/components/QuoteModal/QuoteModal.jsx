import React, { useState } from 'react';
import './QuoteModal.css';

const QuoteModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    referral: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call - replace with actual backend integration
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      
      // Here you would send data to your backend:
      // await fetch('/api/quote-request', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      console.log('Quote request submitted:', formData);
      setSubmitted(true);
      
      // Optional: Send email notification to yourself
      // await sendEmailNotification(formData);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your request. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const projectTypes = [
    { value: 'web', label: 'Web Application', icon: '🌐' },
    { value: 'mobile', label: 'Mobile App', icon: '📱' },
    { value: 'ecommerce', label: 'E-commerce Store', icon: '🛒' },
    { value: 'branding', label: 'Brand Identity', icon: '🎨' },
    { value: 'enterprise', label: 'Enterprise System', icon: '💼' },
    { value: 'ai', label: 'AI/ML Solution', icon: '🤖' },
    { value: 'other', label: 'Other Project', icon: '⚡' }
  ];

  if (submitted) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content success-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>×</button>
          
          <div className="success-icon">✅</div>
          <h2>Request Received!</h2>
          <p className="success-message">
            Thank you <strong>{formData.name}</strong>! We've received your project details and will:
          </p>
          
          <ul className="next-steps">
            <li>📧 Send a confirmation email within 1 hour</li>
            <li>🔍 Review your project requirements</li>
            <li>💬 Schedule a free 30-minute consultation call</li>
            <li>💰 Provide a detailed quote within 24 hours</li>
          </ul>
          
          <div className="contact-info">
            <p><strong>Need immediate assistance?</strong></p>
            <p>Email: <a href="mailto:info@kxbyte.com">info@kxbyte.com</a></p>
            <p>Phone: +254 712 345 678</p>
          </div>
          
          <button className="close-success-btn" onClick={onClose}>
            Close Window
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        
        <h2>Get Your Project Quote</h2>
        <p className="modal-subtitle">
          Provide some details and we'll prepare a custom quote tailored to your needs
        </p>
        
        <form onSubmit={handleSubmit} className="quote-form">
          {/* Contact Information */}
          <fieldset className="form-section">
            <legend>Contact Information</legend>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@company.com"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+254 712 345 678"
                />
              </div>

              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company name"
                />
              </div>
            </div>
          </fieldset>

          {/* Project Details */}
          <fieldset className="form-section">
            <legend>Project Details</legend>
            
            <div className="form-group">
              <label>Project Type *</label>
              <div className="project-type-grid">
                {projectTypes.map(type => (
                  <label key={type.value} className="project-type-option">
                    <input
                      type="radio"
                      name="projectType"
                      value={type.value}
                      checked={formData.projectType === type.value}
                      onChange={handleChange}
                      required
                    />
                    <span className="option-content">
                      <span className="option-icon">{type.icon}</span>
                      <span className="option-label">{type.label}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Budget Range *</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select budget...</option>
                  <option value="1k-5k">$1,000 - $5,000</option>
                  <option value="5k-15k">$5,000 - $15,000</option>
                  <option value="15k-30k">$15,000 - $30,000</option>
                  <option value="30k-50k">$30,000 - $50,000</option>
                  <option value="50k+">$50,000+</option>
                  <option value="not-sure">Not sure yet</option>
                </select>
              </div>

              <div className="form-group">
                <label>Timeline *</label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select timeline...</option>
                  <option value="urgent">Urgent (1-4 weeks)</option>
                  <option value="standard">Standard (1-3 months)</option>
                  <option value="flexible">Flexible (3-6 months)</option>
                  <option value="planning">Just planning phase</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Project Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Please describe your project goals, target audience, key features, and any specific requirements..."
                rows="5"
                required
              />
              <small>Be as detailed as possible for the most accurate quote</small>
            </div>

            <div className="form-group">
              <label>How did you hear about us?</label>
              <select
                name="referral"
                value={formData.referral}
                onChange={handleChange}
              >
                <option value="">Select source...</option>
                <option value="google">Google Search</option>
                <option value="social">Social Media</option>
                <option value="referral">Friend/Colleague</option>
                <option value="portfolio">Saw your portfolio</option>
                <option value="other">Other</option>
              </select>
            </div>
          </fieldset>

          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : '→ Get My Custom Quote'}
          </button>

          <p className="privacy-notice">
            Your information is secure. We'll never share your details with third parties.
          </p>
        </form>
      </div>
    </div>
  );
};

export default QuoteModal;
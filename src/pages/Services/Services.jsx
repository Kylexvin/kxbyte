import React from 'react';
import { services } from '../../data/servicesData';
import './Services.css';

const Services = () => {
  return (
    <section className="services-section">
      <div className="section-header">
        <h2 className="section-title">Precision Digital Craft</h2>
        <p className="section-subtitle">Bespoke solutions engineered for business impact</p>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card glass-card">
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-desc">{service.description}</p>
            <ul className="service-features">
              {service.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <a href={service.link} className="service-link">
              {service.linkText} →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
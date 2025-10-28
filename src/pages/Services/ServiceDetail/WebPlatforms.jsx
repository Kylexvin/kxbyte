import React from 'react';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import Button from '../../../components/common/Button';
import './ServiceDetail.css';

const WebPlatforms = () => {
  return (
    <div className="service-detail">
      <Header />
      
      <section className="service-hero">
        <div className="service-hero-content">
          <div className="service-icon">⟢</div>
          <h1>Web Platforms</h1>
          <p>Scalable, secure web platforms built with React, Next.js, and Node—optimized for performance, maintainability, and growth.</p>
        </div>
      </section>

      <div className="service-content">
        <div className="content-grid">
          <div>
            <div className="features-section">
              <h2 className="section-title">Platform Solutions</h2>
              <ul className="features-list">
                <li>E-commerce systems with payment integration</li>
                <li>SaaS applications and web portals</li>
                <li>API development and third-party integrations</li>
                <li>Real-time collaboration tools</li>
                <li>Content management systems</li>
                <li>Marketplace platforms</li>
                <li>Learning management systems</li>
                <li>Custom dashboard and analytics</li>
              </ul>
            </div>
          </div>

          <div>
            <div className="process-section">
              <h2 className="section-title">Development Process</h2>
              <div className="process-steps">
                <div className="process-step">
                  <div className="step-number">1</div>
                  <h3>Architecture Planning</h3>
                  <p>Design scalable architecture that supports current and future needs.</p>
                </div>
                <div className="process-step">
                  <div className="step-number">2</div>
                  <h3>UI/UX Design</h3>
                  <p>Create intuitive user interfaces with exceptional user experience.</p>
                </div>
                <div className="process-step">
                  <div className="step-number">3</div>
                  <h3>Full-Stack Development</h3>
                  <p>Build both frontend and backend with modern technologies.</p>
                </div>
                <div className="process-step">
                  <div className="step-number">4</div>
                  <h3>Testing & Deployment</h3>
                  <p>Rigorous testing and smooth deployment to production.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h2>Ready to Build Your Web Platform?</h2>
          <p>Let's create a scalable solution that grows with your business.</p>
          <div className="cta-buttons">
            <Button variant="primary" onClick={() => window.location.href = '/contact'}>
              Start Platform Project
            </Button>
            <Button variant="secondary" onClick={() => window.location.href = '/portfolio/web'}>
              View Web Projects
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WebPlatforms;
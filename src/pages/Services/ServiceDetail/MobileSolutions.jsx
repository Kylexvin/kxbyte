import React from 'react';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import Button from '../../../components/common/Button';
import './ServiceDetail.css';

const MobileSolutions = () => {
  return (
    <div className="service-detail">
      <Header />
      
      <section className="service-hero">
        <div className="service-hero-content">
          <div className="service-icon">↯</div>
          <h1>Mobile Solutions</h1>
          <p>Cross-platform apps designed for performance, native feel, and seamless synchronization across devices and services.</p>
        </div>
      </section>

      <div className="service-content">
        <div className="content-grid">
          <div>
            <div className="features-section">
              <h2 className="section-title">Mobile App Services</h2>
              <ul className="features-list">
                <li>React Native cross-platform development</li>
                <li>Enterprise mobility solutions</li>
                <li>IoT-enabled mobile applications</li>
                <li>E-commerce mobile apps</li>
                <li>Social and community platforms</li>
                <li>Real-time messaging and notifications</li>
                <li>Offline functionality and sync</li>
                <li>App store deployment and management</li>
              </ul>
            </div>
          </div>

          <div>
            <div className="process-section">
              <h2 className="section-title">App Development Process</h2>
              <div className="process-steps">
                <div className="process-step">
                  <div className="step-number">1</div>
                  <h3>Discovery & Strategy</h3>
                  <p>Define app objectives, target audience, and feature requirements.</p>
                </div>
                <div className="process-step">
                  <div className="step-number">2</div>
                  <h3>UI/UX Design</h3>
                  <p>Create mobile-first designs with intuitive navigation and interactions.</p>
                </div>
                <div className="process-step">
                  <div className="step-number">3</div>
                  <h3>Development & Testing</h3>
                  <p>Build with React Native and test across multiple devices and platforms.</p>
                </div>
                <div className="process-step">
                  <div className="step-number">4</div>
                  <h3>Deployment & Support</h3>
                  <p>App store submission, launch, and ongoing maintenance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h2>Ready to Build Your Mobile App?</h2>
          <p>Let's create a mobile experience that engages users and drives results.</p>
          <div className="cta-buttons">
            <Button variant="primary" onClick={() => window.location.href = '/contact'}>
              Discuss Mobile Project
            </Button>
            <Button variant="secondary" onClick={() => window.location.href = '/portfolio/mobile'}>
              View Mobile Apps
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MobileSolutions;
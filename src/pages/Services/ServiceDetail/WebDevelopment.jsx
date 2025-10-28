import React from 'react';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import Button from '../../../components/common/Button';
import './ServiceDetail.css';

const WebDevelopment = () => {
  return (
    <div className="service-detail">
      <Header />
      
      <section className="service-hero">
        <div className="service-hero-content">
          <div className="service-icon">🚀</div>
          <h1>Web Development</h1>
          <p>We build fast, scalable websites and web apps with precision. Every line of code focuses on performance, security, and clean design.</p>
        </div>
      </section>

      <div className="service-content">
        <div className="content-grid">
          <div>
            <div className="features-section">
              <h2 className="section-title">What We Deliver</h2>
              <ul className="features-list">
                <li>Custom web applications built with modern frameworks</li>
                <li>E-commerce platforms with secure payment integration</li>
                <li>Progressive Web Apps (PWAs) for mobile-like experience</li>
                <li>API development and third-party integrations</li>
                <li>Performance optimization and speed enhancement</li>
                <li>Security implementation and best practices</li>
              </ul>
            </div>

            <div className="tech-stack">
              <h3 className="section-title">Our Tech Stack</h3>
              <div className="tech-tags">
                <span className="tech-tag">React</span>
                <span className="tech-tag">Next.js</span>
                <span className="tech-tag">Node.js</span>
                <span className="tech-tag">TypeScript</span>
                <span className="tech-tag">MongoDB</span>
                <span className="tech-tag">PostgreSQL</span>
                <span className="tech-tag">AWS</span>
                <span className="tech-tag">Firebase</span>
              </div>
            </div>
          </div>

          <div>
            <div className="process-section">
              <h2 className="section-title">Our Process</h2>
              <div className="process-steps">
                <div className="process-step">
                  <div className="step-number">1</div>
                  <h3>Discovery & Planning</h3>
                  <p>We analyze your requirements, target audience, and business goals to create a detailed project roadmap.</p>
                </div>
                <div className="process-step">
                  <div className="step-number">2</div>
                  <h3>Design & Prototyping</h3>
                  <p>Create wireframes and prototypes to visualize the user experience and interface before development.</p>
                </div>
                <div className="process-step">
                  <div className="step-number">3</div>
                  <h3>Development & Testing</h3>
                  <p>Agile development with continuous testing to ensure quality, performance, and security standards.</p>
                </div>
                <div className="process-step">
                  <div className="step-number">4</div>
                  <h3>Launch & Support</h3>
                  <p>Deployment to production environment and ongoing maintenance with performance monitoring.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h2>Ready to Build Your Web Solution?</h2>
          <p>Let's discuss your project requirements and create something amazing together.</p>
          <div className="cta-buttons">
            <Button variant="primary" onClick={() => window.location.href = '/contact'}>
              Start Your Project
            </Button>
            <Button variant="secondary" onClick={() => window.location.href = '/portfolio'}>
              View Our Work
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WebDevelopment;
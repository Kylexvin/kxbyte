import React from 'react';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import Button from '../../../components/common/Button';
import './ServiceDetail.css';

const Enterprise = () => {
  return (
    <div className="service-detail">
      <Header />
      
      <section className="service-hero">
        <div className="service-hero-content">
          <div className="service-icon">⌘</div>
          <h1>Enterprise Systems</h1>
          <p>Custom-built automation, management, and intelligence tools engineered to streamline operations and strengthen decision-making.</p>
        </div>
      </section>

      <div className="service-content">
        <div className="content-grid">
          <div>
            <div className="features-section">
              <h2 className="section-title">Enterprise Solutions</h2>
              <ul className="features-list">
                <li>Custom CRM and ERP systems</li>
                <li>Business process automation</li>
                <li>Data architecture and analytics</li>
                <li>Workflow management systems</li>
                <li>Inventory and supply chain management</li>
                <li>HR and employee management portals</li>
                <li>Reporting and dashboard systems</li>
                <li>Integration with existing systems</li>
              </ul>
            </div>
          </div>

          <div>
            <div className="process-section">
              <h2 className="section-title">Our Approach</h2>
              <div className="process-steps">
                <div className="process-step">
                  <div className="step-number">1</div>
                  <h3>Business Analysis</h3>
                  <p>Deep understanding of your workflows, pain points, and business objectives.</p>
                </div>
                <div className="process-step">
                  <div className="step-number">2</div>
                  <h3>Solution Design</h3>
                  <p>Architect scalable systems that integrate with your existing infrastructure.</p>
                </div>
                <div className="process-step">
                  <div className="step-number">3</div>
                  <h3>Agile Development</h3>
                  <p>Iterative development with continuous feedback and quality assurance.</p>
                </div>
                <div className="process-step">
                  <div className="step-number">4</div>
                  <h3>Deployment & Training</h3>
                  <p>Smooth implementation and comprehensive team training for adoption.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h2>Ready to Transform Your Business Operations?</h2>
          <p>Let's build enterprise solutions that drive efficiency and growth.</p>
          <div className="cta-buttons">
            <Button variant="primary" onClick={() => window.location.href = '/contact'}>
              Request Consultation
            </Button>
            <Button variant="secondary" onClick={() => window.location.href = '/case-studies/enterprise'}>
              View Case Studies
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Enterprise;
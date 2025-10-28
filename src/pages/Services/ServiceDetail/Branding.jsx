import React from 'react';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import Button from '../../../components/common/Button';
import './ServiceDetail.css';

const Branding = () => {
  return (
    <div className="service-detail">
      <Header />
      
      <section className="service-hero">
        <div className="service-hero-content">
          <div className="service-icon">⍟</div>
          <h1>Brand Identity</h1>
          <p>We design clear, consistent brand systems—logos, colors, and visuals that make your business recognizable and trusted across all channels.</p>
        </div>
      </section>

      <div className="service-content">
        <div className="content-grid">
          <div>
            <div className="features-section">
              <h2 className="section-title">Branding Services</h2>
              <ul className="features-list">
                <li>Logo design and visual identity systems</li>
                <li>Brand strategy and positioning</li>
                <li>Color palette and typography systems</li>
                <li>Brand guidelines and documentation</li>
                <li>Marketing collateral design</li>
                <li>Social media branding kits</li>
                <li>Stationery and business materials</li>
                <li>Brand voice and messaging</li>
              </ul>
            </div>
          </div>

          <div>
            <div className="process-section">
              <h2 className="section-title">Our Branding Process</h2>
              <div className="process-steps">
                <div className="process-step">
                  <div className="step-number">1</div>
                  <h3>Brand Discovery</h3>
                  <p>Deep dive into your business, values, target audience, and competitive landscape.</p>
                </div>
                <div className="process-step">
                  <div className="step-number">2</div>
                  <h3>Strategy & Concept</h3>
                  <p>Develop brand positioning, personality, and creative direction for your identity.</p>
                </div>
                <div className="process-step">
                  <div className="step-number">3</div>
                  <h3>Visual Design</h3>
                  <p>Create logo variations, color systems, typography, and visual elements.</p>
                </div>
                <div className="process-step">
                  <div className="step-number">4</div>
                  <h3>Brand Application</h3>
                  <p>Apply the brand across various touchpoints and create comprehensive guidelines.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h2>Ready to Build Your Brand?</h2>
          <p>Let's create a memorable identity that resonates with your audience and drives growth.</p>
          <div className="cta-buttons">
            <Button variant="primary" onClick={() => window.location.href = '/contact'}>
              Start Branding Project
            </Button>
            <Button variant="secondary" onClick={() => window.location.href = '/portfolio/branding'}>
              View Brand Portfolio
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Branding;
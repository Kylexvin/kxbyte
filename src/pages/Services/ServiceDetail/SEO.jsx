import React from 'react';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import Button from '../../../components/common/Button';
import './ServiceDetail.css';

const SEO = () => {
  return (
    <div className="service-detail">
      <Header />
      
      <section className="service-hero">
        <div className="service-hero-content">
          <div className="service-icon">📈</div>
          <h1>SEO & Marketing</h1>
          <p>We engineer visibility through technical SEO, content strategy, and analytics. The goal: reach your audience, rank higher, and convert effectively.</p>
        </div>
      </section>

      <div className="service-content">
        <div className="content-grid">
          <div>
            <div className="features-section">
              <h2 className="section-title">SEO Services</h2>
              <ul className="features-list">
                <li>Comprehensive technical SEO audit</li>
                <li>Keyword research and strategy development</li>
                <li>On-page optimization and content strategy</li>
                <li>Link building and digital PR</li>
                <li>Local SEO optimization</li>
                <li>E-commerce SEO for online stores</li>
                <li>Performance tracking and analytics</li>
                <li>Competitor analysis and reporting</li>
              </ul>
            </div>

            <div className="tech-stack">
              <h3 className="section-title">Tools We Use</h3>
              <div className="tech-tags">
                <span className="tech-tag">Google Analytics</span>
                <span className="tech-tag">Google Search Console</span>
                <span className="tech-tag">SEMrush</span>
                <span className="tech-tag">Ahrefs</span>
                <span className="tech-tag">Screaming Frog</span>
                <span className="tech-tag">GTmetrix</span>
              </div>
            </div>
          </div>

          <div>
            <div className="process-section">
              <h2 className="section-title">Our SEO Process</h2>
              <div className="process-steps">
                <div className="process-step">
                  <div className="step-number">1</div>
                  <h3>Audit & Analysis</h3>
                  <p>Comprehensive website audit, competitor analysis, and keyword research.</p>
                </div>
                <div className="process-step">
                  <div className="step-number">2</div>
                  <h3>Strategy Development</h3>
                  <p>Create customized SEO strategy with clear objectives and KPIs.</p>
                </div>
                <div className="process-step">
                  <div className="step-number">3</div>
                  <h3>Implementation</h3>
                  <p>Technical fixes, content optimization, and link building campaigns.</p>
                </div>
                <div className="process-step">
                  <div className="step-number">4</div>
                  <h3>Monitoring & Reporting</h3>
                  <p>Continuous monitoring, performance analysis, and monthly reporting.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h2>Ready to Dominate Search Rankings?</h2>
          <p>Let's develop an SEO strategy that drives organic traffic and converts visitors into customers.</p>
          <div className="cta-buttons">
            <Button variant="primary" onClick={() => window.location.href = '/contact'}>
              Get SEO Audit
            </Button>
            <Button variant="secondary" onClick={() => window.location.href = '/case-studies/seo'}>
              View SEO Results
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SEO;
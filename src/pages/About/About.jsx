import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/common/Button';
import './About.css';

const About = () => {
  const teamMembers = [
    {
      name: "Alex Developer",
      role: "Lead Full-Stack Developer",
      description: "Specializes in React, Node.js, and cloud architecture with 5+ years of experience.",
      expertise: ["React", "Node.js", "AWS", "MongoDB"]
    },
    {
      name: "Sarah Designer",
      role: "UI/UX Designer",
      description: "Creates intuitive user experiences and beautiful interfaces that drive engagement.",
      expertise: ["Figma", "UI/UX", "Branding", "Prototyping"]
    },
    {
      name: "Mike Strategist",
      role: "Digital Strategist",
      description: "Helps businesses define their digital roadmap and achieve their goals.",
      expertise: ["SEO", "Analytics", "Strategy", "Growth"]
    }
  ];

  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "3+", label: "Years Experience" },
    { number: "95%", label: "Client Satisfaction" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <div className="about-page">
      <Header />
      
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1>About KXBYTE</h1>
            <p>We are a passionate team of developers, designers, and strategists dedicated to creating digital experiences that drive results and transform businesses.</p>
          </div>
        </div>
      </section>

      <section className="about-story">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <h2>Our Story</h2>
              <p>
                Founded in 2022, KXBYTE emerged from a simple belief: every business deserves 
                access to cutting-edge digital solutions without the corporate price tag. We 
                bridge the gap between innovative technology and practical business needs.
              </p>
              <p>
                Our team brings together diverse expertise in web development, mobile applications, 
                brand identity, and digital marketing to deliver comprehensive solutions that 
                actually work in the real world.
              </p>
            </div>
            <div className="story-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2>Meet Our Team</h2>
            <p>The passionate individuals behind KXBYTE's success</p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="member-avatar">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3>{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-description">{member.description}</p>
                <div className="member-expertise">
                  {member.expertise.map((skill, skillIndex) => (
                    <span key={skillIndex} className="expertise-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Values</h2>
            <p>The principles that guide everything we do</p>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Innovation</h3>
              <p>We stay ahead of technology trends to deliver cutting-edge solutions that give you a competitive advantage.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Partnership</h3>
              <p>We work with you as partners, not just vendors. Your success is our success.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">⚡</div>
              <h3>Efficiency</h3>
              <p>We deliver quality work quickly without compromising on excellence or attention to detail.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Results-Driven</h3>
              <p>Every project is measured by the value it brings to your business and your customers.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Work With Us?</h2>
          <p>Let's discuss how we can help transform your digital presence and drive business growth.</p>
          <div className="cta-buttons">
            <Button variant="primary" onClick={() => window.location.href = '/contact'}>
              Start a Project
            </Button>
            <Button variant="secondary" onClick={() => window.location.href = '/services'}>
              View Services
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './BrandingPortfolio.css';

const BrandingPortfolio = () => {
  const brandingProjects = [
    {
      id: 1,
      image: "../../assets/images/hero-bg.jpg",
      title: "Tech Startup"
    },
    {
      id: 2,
      image: "../../assets/images/hero-bg.jpg",
      title: "Coffee Shop"
    },
    {
      id: 3,
      image: "../../assets/images/hero-bg.jpg",
      title: "Fitness App"
    },
    {
      id: 4,
      image: "../../assets/images/hero-bg.jpg",
      title: "Luxury Hotel"
    },
    {
      id: 5,
      image: "../../assets/images/hero-bg.jpg",
      title: "Eco Products"
    },
    {
      id: 6,
      image: "../../assets/images/hero-bg.jpg",
      title: "Tech Conference"
    },
    {
      id: 7,
      image: "../../assets/images/hero-bg.jpg",
      title: "Fashion Brand"
    },
    {
      id: 8,
      image: "../../assets/images/hero-bg.jpg",
      title: "Restaurant"
    },
    {
      id: 9,
      image: "../../assets/images/hero-bg.jpg",
      title: "Healthcare"
    },
    {
      id: 10,
      image: "../../assets/images/hero-bg.jpg",
      title: "Fintech"
    },
    {
      id: 11,
      image: "../../assets/images/hero-bg.jpg",
      title: "Education"
    },
    {
      id: 12,
      image: "../../assets/images/hero-bg.jpg",
      title: "Real Estate"
    }
  ];

  return (
    <div className="branding-portfolio">
      <Header />
      
      <section className="portfolio-hero">
        <div className="portfolio-hero-content">
          <div className="service-icon">⍟</div>
          <h1>Branding Portfolio</h1>
          <p>Complete brand identities showcased in single, comprehensive visuals</p>
        </div>
      </section>

      <div className="portfolio-content">
        <div className="pinterest-grid">
          {brandingProjects.map(project => (
            <div key={project.id} className="pin-card">
              <div className="pin-image">
                <img 
                  src={project.image} 
                  alt={project.title}
                  onError={(e) => {
                    e.target.src = '/images/placeholder-branding.jpg';
                  }}
                />
              </div>
              <div className="pin-title">
                <span>{project.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BrandingPortfolio;
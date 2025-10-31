import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Services from '../Services/Services';
import QuoteModal from '../../components/QuoteModal/QuoteModal';
import './Home.css';

const Home = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const heroCards = [
    {
      title: "Web Development",
      description: "We build fast, scalable websites and web apps with precision. Every line of code focuses on performance, security, and clean design.",
      buttonText: "View Work",
      onClick: () => window.location.href = '/services/web-development'
    },
    {
      title: "Brand Identity",
      description: "We design clear, consistent brand systems—logos, colors, and visuals that make your business recognizable and trusted across all channels.",
      buttonText: "See Designs",
      onClick: () => window.location.href = '/services/branding'
    },
    {
      title: "SEO & Marketing",
      description: "We engineer visibility through technical SEO, content strategy, and analytics. The goal: reach your audience, rank higher, and convert effectively.",
      buttonText: "Boost Growth",
      onClick: () => window.location.href = '/services/seo'
    }
  ];

  // Why Choose KXBYTE data
  const trustPoints = [
    {
      icon: "🛡️",
      title: "Trust & Reliability",
      description: "We deliver on our promises with transparent communication and consistent results that exceed expectations."
    },
    // {
    //   icon: "💡",
    //   title: "Innovation First",
    //   description: "Staying ahead of tech trends to provide cutting-edge solutions that give you a competitive advantage."
    // },
    // {
    //   icon: "⚡",
    //   title: "Fast & Efficient",
    //   description: "Quick turnaround times without compromising quality. We value your time as much as you do."
    // }
  ];

  // Featured brands/clients
  const featuredBrands = [
    { name: "TechCorp", logo: "🚀", description: "E-commerce platform" },
    { name: "DesignHub", logo: "🎨", description: "Brand identity system" },
    { name: "Local Cafe", logo: "☕", description: "Website & marketing" },
    { name: "StartupXYZ", logo: "💼", description: "Mobile app development" },
    { name: "EduTech", logo: "📚", description: "Learning platform" },
    { name: "HealthPlus", logo: "🏥", description: "Healthcare portal" }
  ];

  // Testimonials from Google My Business
  const testimonials = [
    {
      name: "Sarah M.",
      role: "Small Business Owner",
      content: "KXBYTE transformed our online presence. Our website traffic increased by 200% in just 3 months!",
      rating: 5,
      date: "2 weeks ago"
    },
    {
      name: "Mike R.",
      role: "Startup Founder",
      content: "Professional, reliable, and incredibly skilled. They delivered our mobile app ahead of schedule!",
      rating: 5,
      date: "1 month ago"
    },
    {
      name: "Jessica T.",
      role: "Marketing Director",
      content: "The branding work they did for us was exceptional. Our customers love the new visual identity.",
      rating: 5,
      date: "3 weeks ago"
    }
  ];

  const handlePrimaryClick = () => {
    document.getElementById('services-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const handleGetQuote = () => {
    setShowQuoteModal(true);
  };

  const handleCloseModal = () => {
    setShowQuoteModal(false);
  };

  const handleCardHover = (index) => {
    setActiveCard(index);
  };

  const handleCardLeave = () => {
    setActiveCard(null);
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating);
  };

  return (
    <div className="home">
      <section className="hero-section">
        <Header />
        
        <div className="hero">
          <div className="hero__container">
            <h1 className="hero__headline">Digital Tools for a New Generation.</h1>
            <p className="hero__subtext">
              We build smart, scalable systems for startups, creators, and local brands.
            </p>
            
            <div className="cta-buttons">
              <Button 
                variant="primary" 
                onClick={handlePrimaryClick}
              >
                → Products
              </Button>
              <Button 
                variant="secondary" 
                onClick={handleGetQuote}
              >
                → Get a Quote
              </Button>
            </div>
          </div>

          <section className="cards">
            {heroCards.map((card, index) => (
              <div
                key={index}
                className="card-wrapper"
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={handleCardLeave}
              >
                <Card
                  title={card.title}
                  description={card.description}
                  buttonText={card.buttonText}
                  onButtonClick={card.onClick}
                  isActive={activeCard === index}
                />
              </div>
            ))}
          </section>
        </div>
      </section>

      {/* Why Choose KXBYTE Section */}
      <section className="why-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose KXBYTE</h2>
            <p className="section-subtitle">Building trust through innovation and reliability</p>
          </div>
          
          <div className="trust-grid">
            {trustPoints.map((point, index) => (
              <div key={index} className="trust-card">
                <div className="trust-icon">{point.icon}</div>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div id="services-section">
        <Services />
      </div>

      {/* Featured Work Section */}
      {/* <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Work</h2>
            <p className="section-subtitle">Brands we've partnered with to create digital excellence</p>
          </div>
          
          <div className="brands-grid">
            {featuredBrands.map((brand, index) => (
              <div key={index} className="brand-card">
                <div className="brand-logo">{brand.logo}</div>
                <h4>{brand.name}</h4>
                <p>{brand.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Client Testimonials</h2>
            <p className="section-subtitle">What our clients say about working with us</p>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="stars">
                    {renderStars(testimonial.rating)}
                  </div>
                  <span className="date">{testimonial.date}</span>
                </div>
                <p className="testimonial-content">"{testimonial.content}"</p>
                <div className="testimonial-author">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />

      {showQuoteModal && (
        <QuoteModal onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Home;
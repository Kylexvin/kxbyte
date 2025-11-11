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
  const [activeFaq, setActiveFaq] = useState(null);

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

  // What You Get / Benefits Section
  const benefits = [
    {
      icon: "🚀",
      title: "Faster Time to Market",
      description: "Get your digital products launched quickly without sacrificing quality or performance."
    },
    {
      icon: "💰",
      title: "Cost-Effective Solutions",
      description: "Maximize your ROI with efficient development processes and scalable architecture."
    },
    {
      icon: "📈",
      title: "Proven Results",
      description: "Data-driven approaches that deliver measurable growth and performance improvements."
    },
    {
      icon: "🛡️",
      title: "Reliable Support",
      description: "Ongoing maintenance and support to keep your systems running smoothly."
    },
    {
      icon: "⚡",
      title: "High Performance",
      description: "Lightning-fast applications optimized for speed and user experience."
    },
    {
      icon: "🔒",
      title: "Secure & Scalable",
      description: "Enterprise-grade security with architecture that grows with your business."
    }
  ];

  // Target Audience / For Who? Section
  const targetAudiences = [
    {
      icon: "🏢",
      title: "Small Businesses",
      description: "Affordable digital solutions to establish your online presence and compete effectively.",
      features: ["Basic Websites", "Local SEO", "Brand Identity", "Social Media Setup"]
    },
    {
      icon: "🚀",
      title: "Startups",
      description: "Rapid prototyping and scalable architecture to support your growth trajectory.",
      features: ["MVP Development", "Tech Stack Consulting", "Scalable Architecture", "Investor-Ready Products"]
    },
    {
      icon: "🎨",
      title: "Creators & Agencies",
      description: "Custom platforms and tools to showcase your work and streamline your operations.",
      features: ["Portfolio Sites", "Content Management", "E-commerce", "Booking Systems"]
    },
    {
      icon: "🏪",
      title: "Local Brands",
      description: "Location-based marketing and digital storefronts to connect with your community.",
      features: ["Local SEO", "Google Business", "Review Management", "Community Engagement"]
    }
  ];

  // Testimonials
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

  // Tools & Integration
  const tools = [
    {
      category: "Development",
      items: ["React", "Node.js", "Python", "MongoDB", "PostgreSQL", "AWS"]
    },
    {
      category: "Design",
      items: ["Figma", "Adobe Creative Suite", "Webflow", "Sketch"]
    },
    {
      category: "Marketing",
      items: ["Google Analytics", "SEMrush", "HubSpot", "Mailchimp", "Meta Business"]
    },
    {
      category: "Project Management",
      items: ["Jira", "Trello", "Slack", "Notion", "GitHub"]
    }
  ];

  // Pricing Tiers
  const pricingTiers = [
    {
      name: "Starter",
      price: "KSH 19,499",
      description: "Perfect for small businesses and personal brands",
      features: [
        "5-Page Website",
        "Basic SEO Setup",
        "Mobile Responsive",
        "Contact Form",
        "1 Month Support",
        "Basic Analytics"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Business",
      price: "KSH 29,999",
      description: "Ideal for growing businesses and startups",
      features: [
        "10-Page Website",
        "Advanced SEO",
        "E-commerce Ready",
        "CMS Integration",
        "3 Months Support",
        "Advanced Analytics",
        "Brand Guide",
        "Social Media Setup"
      ],
      cta: "Most Popular",
      popular: true
    },
    {
      name: "Enterprise",
      price: "KSH 49,999+",
      description: "Custom solutions for established businesses",
      features: [
        "Custom Web App",
        "Full Stack Development",
        "API Integration",
        "6 Months Support",
        "Performance Optimization",
        "Security Audit",
        "Dedicated Team",
        "24/7 Monitoring"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  // FAQs
  const faqs = [
    {
      question: "How long does a typical project take?",
      answer: "Most projects range from 4-12 weeks depending on complexity. We provide detailed timelines during our initial consultation."
    },
    {
      question: "Do you offer ongoing support?",
      answer: "Yes, we offer flexible support packages from basic maintenance to full-scale managed services."
    },
    {
      question: "Can you work with our existing team?",
      answer: "Absolutely! We seamlessly integrate with your current team and workflows."
    },
    {
      question: "What's your payment structure?",
      answer: "We typically work with 50% upfront and 50% upon completion, with custom payment plans available for larger projects."
    },
    {
      question: "Do you provide source code?",
      answer: "Yes, you own all the code and assets we create for your project."
    }
  ];

  const handlePrimaryClick = () => {
    document.getElementById('what-you-get')?.scrollIntoView({ 
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

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
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
                → See Benefits
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

      {/* What You Get / Benefits Section */}
      <section id="what-you-get" className="benefits-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What You Get With KXBYTE</h2>
            <p className="section-subtitle">Comprehensive solutions that drive real business results</p>
          </div>
          
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Who? / Target Audience Section */}
      <section className="audience-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Who We Work With</h2>
            <p className="section-subtitle">Tailored solutions for different business needs</p>
          </div>
          
          <div className="audience-grid">
            {targetAudiences.map((audience, index) => (
              <div key={index} className="audience-card">
                <div className="audience-icon">{audience.icon}</div>
                <h3>{audience.title}</h3>
                <p>{audience.description}</p>
                <ul className="audience-features">
                  {audience.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>✓ {feature}</li>
                  ))}
                </ul>
                <Button 
                  variant="outline" 
                  onClick={handleGetQuote}
                  className="audience-cta"
                >
                  Get Quote for {audience.title}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <div id="services-section">
        <Services />
      </div>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Client Success Stories</h2>
            <p className="section-subtitle">Join hundreds of satisfied clients who trust KXBYTE</p>
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

      {/* Tools & Integration Section */}
      <section className="tools-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Tech Stack & Tools</h2>
            <p className="section-subtitle">Modern technologies for modern solutions</p>
          </div>
          
          <div className="tools-grid">
            {tools.map((toolCategory, index) => (
              <div key={index} className="tool-category">
                <h3>{toolCategory.category}</h3>
                <div className="tool-items">
                  {toolCategory.items.map((item, itemIndex) => (
                    <span key={itemIndex} className="tool-item">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Simple, Transparent Pricing</h2>
            <p className="section-subtitle">Choose the plan that fits your business needs</p>
          </div>
          
          <div className="pricing-grid">
            {pricingTiers.map((tier, index) => (
              <div key={index} className={`pricing-card ${tier.popular ? 'popular' : ''}`}>
                {tier.popular && <div className="popular-badge">Most Popular</div>}
                <div className="pricing-header">
                  <h3>{tier.name}</h3>
                  <div className="price">{tier.price}</div>
                  <p className="tier-description">{tier.description}</p>
                </div>
                <ul className="features-list">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>✓ {feature}</li>
                  ))}
                </ul>
                <Button 
                  variant={tier.popular ? "primary" : "outline"}
                  onClick={handleGetQuote}
                  className="pricing-cta"
                >
                  {tier.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Everything you need to know about working with us</p>
          </div>
          
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <div 
                  className="faq-question" 
                  onClick={() => toggleFaq(index)}
                >
                  <h4>{faq.question}</h4>
                  <span className="faq-toggle">
                    {activeFaq === index ? '−' : '+'}
                  </span>
                </div>
                {activeFaq === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="final-cta">
            <h3>Ready to Transform Your Business?</h3>
            <p>Let's discuss your project and create something amazing together</p>
            <div className="cta-buttons">
              <Button variant="primary" onClick={handleGetQuote}>
                → Start Your Project
              </Button>
              <Button variant="outline" onClick={() => document.getElementById('services-section').scrollIntoView({ behavior: 'smooth' })}>
                → Explore Services
              </Button>
            </div>
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
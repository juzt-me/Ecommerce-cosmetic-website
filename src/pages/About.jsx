import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-hero">
          <h1 className="gradient-text">About Aura Pop Beauty</h1>
          <p className="hero-subtitle">Beauty That Shines With You</p>
        </div>

        <div className="about-content">
          <section className="about-section">
            <h2>Our Story</h2>
            <p>
              Aura Pop Beauty was born from a simple belief: everyone deserves to feel confident and beautiful in their own skin. 
              Founded with a passion for high-quality cosmetics and skincare, we've dedicated ourselves to creating products 
              that enhance your natural beauty while caring for your skin.
            </p>
          </section>

          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              We're committed to providing premium beauty products that are cruelty-free, sustainable, and accessible to everyone. 
              Our carefully curated collection features the latest trends and timeless classics, ensuring you always have the 
              perfect products for any occasion.
            </p>
          </section>

          <section className="about-section">
            <h2>What Makes Us Special</h2>
            <div className="features-grid">
              <div className="feature-card card">
                <h3>Quality First</h3>
                <p>Every product is carefully selected and tested to meet our high standards for quality and performance.</p>
              </div>
              <div className="feature-card card">
                <h3>Cruelty-Free</h3>
                <p>We're proud to offer only cruelty-free products that are never tested on animals.</p>
              </div>
              <div className="feature-card card">
                <h3>Expert Curation</h3>
                <p>Our beauty experts handpick each product to ensure you get the best in cosmetics and skincare.</p>
              </div>
              <div className="feature-card card">
                <h3>Customer Care</h3>
                <p>Your satisfaction is our priority. We're here to help you find your perfect beauty routine.</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Join Our Beauty Community</h2>
            <p>
              At Aura Pop Beauty, you're not just a customer – you're part of our beauty-loving community. 
              Follow us on social media, join our rewards program, and discover new ways to express your unique style.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
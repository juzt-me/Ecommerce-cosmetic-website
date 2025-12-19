import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard/ProductCard';
import { products } from '../data/products';
import './Home.css';

const Home = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Beauty That <span className="gradient-text">Shines With You</span>
          </h1>
          <p className="hero-subtitle">
            Premium picks to bring out your best, every day.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary">
              Shop Now
            </Link>
            <Link to="/about" className="btn btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600" 
            alt="Beautiful Woman with Natural Glow" 
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card card">
              <div className="feature-icon">✨</div>
              <h3>Premium Quality</h3>
              <p>Carefully curated products with the finest ingredients for exceptional results.</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">🌿</div>
              <h3>Cruelty-Free</h3>
              <p>All our products are ethically made and never tested on animals.</p>
            </div>
            <div className="feature-card card skincare-feature">
              <div className="feature-icon">🌸</div>
              <h3>Skincare Collection</h3>
              <p>Discover our premium skincare line with science-backed formulations.</p>
              <Link to="/skincare" className="btn btn-primary feature-btn">
                Explore Skincare
              </Link>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">🚚</div>
              <h3>Fast Shipping</h3>
              <p>Free shipping on orders over $50 with quick delivery to your door.</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">💝</div>
              <h3>Gift Ready</h3>
              <p>Beautiful packaging that makes every purchase feel like a special treat.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header featured-header">
            <h2>Featured Products</h2>
          </div>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="section-footer">
            <Link to="/products" className="btn btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay in the Glow</h2>
            <p>Subscribe to get exclusive offers, beauty tips, and new product updates.</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="newsletter-input"
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
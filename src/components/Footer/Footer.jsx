import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="gradient-text">Aura Pop Beauty</h3>
            <p>Discover your inner glow with our premium cosmetic collection.</p>
            <div className="social-links">
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="YouTube">📺</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Categories</h4>
            <ul>
              <li><Link to="/products?category=face">Face</Link></li>
              <li><Link to="/products?category=eyes">Eyes</Link></li>
              <li><Link to="/products?category=lips">Lips</Link></li>
              <li><Link to="/products?category=skincare">Skincare</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Customer Service</h4>
            <ul>
              <li><a href="#">Shipping Info</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Size Guide</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Aura Pop Beauty. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
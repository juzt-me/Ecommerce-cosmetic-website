import React, { useState } from 'react';
import './OfferBanner.css';

const OfferBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="offer-banner">
      <div className="container">
        <div className="offer-content">
          <span className="offer-text">
            🎉 Special Offer: Use code <strong>FLASH20</strong> for 20% OFF on orders ₹4000+ | 
            Code <strong>SAVE15</strong> for 15% OFF on orders ₹2400+
          </span>
          <button 
            className="close-banner"
            onClick={() => setIsVisible(false)}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferBanner;
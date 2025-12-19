import React from 'react';
import './LoadingSkeleton.css';

const LoadingSkeleton = ({ type = 'product' }) => {
  if (type === 'product') {
    return (
      <div className="skeleton-card">
        <div className="skeleton-image loading-skeleton"></div>
        <div className="skeleton-content">
          <div className="skeleton-title loading-skeleton"></div>
          <div className="skeleton-rating loading-skeleton"></div>
          <div className="skeleton-price loading-skeleton"></div>
        </div>
        <div className="skeleton-button loading-skeleton"></div>
      </div>
    );
  }

  if (type === 'cart') {
    return (
      <div className="skeleton-cart-item">
        <div className="skeleton-cart-image loading-skeleton"></div>
        <div className="skeleton-cart-details">
          <div className="skeleton-cart-name loading-skeleton"></div>
          <div className="skeleton-cart-price loading-skeleton"></div>
        </div>
        <div className="skeleton-cart-controls loading-skeleton"></div>
      </div>
    );
  }

  return <div className="skeleton-default loading-skeleton"></div>;
};

export default LoadingSkeleton;
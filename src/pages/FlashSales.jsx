import React, { useState, useEffect } from 'react';
import './FlashSales.css';

const FlashSales = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const coupons = [
    { code: 'FLASH20', discount: 20, type: 'percentage', minOrder: 4000 },
    { code: 'SAVE15', discount: 15, type: 'percentage', minOrder: 2400 },
    { code: 'NEWBIE10', discount: 800, type: 'fixed', minOrder: 0 }
  ];

  const rawFlashSaleProducts = [
    { id: 1, name: 'Waterproof Mascara', price: 2000, originalPrice: 2800, discount: 30, image: '/waterproof-mascara.jpg' },
    { id: 2, name: 'Red Nail Polish', price: 1200, originalPrice: 1600, discount: 25, image: '/red-nail-polish.jpg' },
    { id: 3, name: 'Waterproof Mascara', price: 1800, originalPrice: 2800, discount: 35, image: '/waterproof-mascara.jpg' },
    { id: 4, name: 'Red Nail Polish', price: 1400, originalPrice: 1600, discount: 12, image: '/red-nail-polish.jpg' }
  ];

  // Normalize products to have consistent pricing (use lowest price for best deal)
  const normalizeProducts = (products) => {
    const productMap = new Map();
    
    products.forEach(product => {
      const existing = productMap.get(product.name);
      if (!existing || product.price < existing.price) {
        productMap.set(product.name, product);
      }
    });
    
    return Array.from(productMap.values());
  };

  const flashSaleProducts = normalizeProducts(rawFlashSaleProducts);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const applyCoupon = () => {
    const coupon = coupons.find(c => c.code === couponCode.toUpperCase());
    if (coupon) {
      setAppliedCoupon(coupon);
      alert(`Coupon ${coupon.code} applied! ${coupon.discount}${coupon.type === 'percentage' ? '%' : '₹'} off`);
    } else {
      alert('Invalid coupon code');
    }
    setCouponCode('');
  };

  return (
    <div className="container flash-sales-page">
      <div className="flash-header">
        <h1>⚡ Flash Sale</h1>
        <div className="countdown">
          <span>Ends in:</span>
          <div className="timer">
            <div className="time-unit">
              <span className="number">{timeLeft.hours.toString().padStart(2, '0')}</span>
              <span className="label">Hours</span>
            </div>
            <div className="time-unit">
              <span className="number">{timeLeft.minutes.toString().padStart(2, '0')}</span>
              <span className="label">Minutes</span>
            </div>
            <div className="time-unit">
              <span className="number">{timeLeft.seconds.toString().padStart(2, '0')}</span>
              <span className="label">Seconds</span>
            </div>
          </div>
        </div>
      </div>

      <div className="coupon-section">
        <h3>🎟️ Promo Codes</h3>
        <div className="coupon-input">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button onClick={applyCoupon} className="apply-btn">Apply</button>
        </div>
        
        <div className="available-coupons">
          {coupons.map(coupon => (
            <div key={coupon.code} className="coupon-card">
              <div className="coupon-code">{coupon.code}</div>
              <div className="coupon-details">
                {coupon.discount}{coupon.type === 'percentage' ? '% OFF' : '₹ OFF'}
                {coupon.minOrder > 0 && <span> on orders ₹{coupon.minOrder}+</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flash-products">
        <h3>🔥 Limited Time Offers</h3>
        <div className="products-grid">
          {flashSaleProducts.map((product, index) => (
            <div key={index} className="flash-product">
              <div className="discount-badge">{product.discount}% OFF</div>
              <div className="product-card">
                <img src={product.image} alt={product.name} style={{width: '100%', height: '200px', objectFit: 'cover'}} />
                <h4>{product.name}</h4>
              </div>
              <div className="price-comparison">
                <span className="original-price">₹{product.originalPrice}</span>
                <span className="sale-price">₹{product.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlashSales;
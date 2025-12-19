import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Checkout.css';

const Checkout = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  const coupons = {
    'FLASH20': { discount: 20, minAmount: 4000 },
    'SAVE15': { discount: 15, minAmount: 2400 },
    'NEWBIE10': { discount: 800, minAmount: 0, type: 'fixed' }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const token = localStorage.getItem('aura-token');
      if (!token) {
        alert('Please login to place an order.');
        setIsProcessing(false);
        return;
      }
      
      const orderData = {
        items: items.map(item => ({
          product: item._id || item.id,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: total,
        shippingAddress: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        }
      };

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (data.success) {
        clearCart();
        setIsProcessing(false);
        alert(`Order placed successfully! Order ID: ${data.order._id}`);
        navigate('/orders');
      } else {
        throw new Error(data.message || 'Order failed');
      }
    } catch (error) {
      console.error('Order error:', error);
      setIsProcessing(false);
      
      // Check if it's a network error
      if (error.message.includes('fetch')) {
        alert('Network error. Please check if the server is running.');
      } else {
        alert('Order failed. Please try again.');
      }
    }
  };

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="empty-checkout">
            <h2>Your cart is empty</h2>
            <p>Add some products to your cart before checking out.</p>
            <button onClick={() => navigate('/products')} className="btn btn-primary">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  const applyCoupon = () => {
    const coupon = coupons[couponCode.toUpperCase()];
    if (!coupon) {
      setCouponError('Invalid coupon code');
      return;
    }
    if (getCartTotal() < coupon.minAmount) {
      setCouponError(`Minimum order amount ₹${coupon.minAmount} required`);
      return;
    }
    setAppliedCoupon({ code: couponCode.toUpperCase(), ...coupon });
    setCouponError('');
    setCouponCode('');
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  const subtotal = getCartTotal();
  const shipping = subtotal >= 4150 ? 0 : 499;
  let discount = 0;
  if (appliedCoupon) {
    discount = appliedCoupon.type === 'fixed' ? appliedCoupon.discount : (subtotal * appliedCoupon.discount / 100);
  }
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal + shipping + tax - discount;

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>
        
        <div className="checkout-content">
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-section">
              <h2>Contact Information</h2>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <h2>Shipping Address</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="zipCode">ZIP Code *</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>Payment Information</h2>
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number *</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date *</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">CVV *</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="nameOnCard">Name on Card *</label>
                <input
                  type="text"
                  id="nameOnCard"
                  name="nameOnCard"
                  value={formData.nameOnCard}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className={`btn btn-primary place-order-btn ${isProcessing ? 'processing' : ''}`}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Place Order - ₹${total.toFixed(0)}`}
            </button>
          </form>

          <div className="order-summary">
            <div className="summary-card card">
              <h3>Order Summary</h3>
              
              <div className="order-items">
                {items.map(item => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>Qty: {item.quantity}</p>
                    </div>
                    <span className="item-price">₹{(item.price * item.quantity).toFixed(0)}</span>
                  </div>
                ))}
              </div>

              <div className="coupon-section">
                <h4>Promo Code</h4>
                <div className="coupon-input">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button type="button" onClick={applyCoupon} className="apply-btn">
                    Apply
                  </button>
                </div>
                {couponError && <p className="coupon-error">{couponError}</p>}
                {appliedCoupon && (
                  <div className="applied-coupon">
                    <span>✅ {appliedCoupon.code} applied</span>
                    <button type="button" onClick={removeCoupon} className="remove-coupon">×</button>
                  </div>
                )}
              </div>

              <div className="summary-totals">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(0)}</span>
                </div>
                {appliedCoupon && (
                  <div className="summary-row discount">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-₹{discount.toFixed(0)}</span>
                  </div>
                )}
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(0)}`}</span>
                </div>
                <div className="summary-row">
                  <span>Tax</span>
                  <span>₹{tax.toFixed(0)}</span>
                </div>
                <hr />
                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹{total.toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
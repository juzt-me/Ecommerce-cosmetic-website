import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem/CartItem';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { items, getCartTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any products to your cart yet.</p>
            <Link to="/products" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <button onClick={clearCart} className="clear-cart-btn">
            Clear Cart
          </button>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {items.map(item => (
              <CartItem key={item._id || item.id} item={item} />
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card card">
              <h3>Order Summary</h3>
              
              <div className="summary-row">
                <span>Subtotal ({items.length} items)</span>
                <span>₹{getCartTotal().toFixed(0)}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping</span>
                <span>{getCartTotal() >= 4150 ? 'Free' : '₹499'}</span>
              </div>
              
              <div className="summary-row">
                <span>Tax</span>
                <span>₹{(getCartTotal() * 0.08).toFixed(0)}</span>
              </div>
              
              <hr />
              
              <div className="summary-row total">
                <span>Total</span>
                <span>
                  ₹{(getCartTotal() + (getCartTotal() >= 4150 ? 0 : 499) + (getCartTotal() * 0.08)).toFixed(0)}
                </span>
              </div>

              {getCartTotal() < 50 && (
                <div className="shipping-notice">
                  Add ₹{(4150 - getCartTotal()).toFixed(0)} more for free shipping!
                </div>
              )}

              <div className="signin-prompt">
                <p>Sign in for faster checkout and order tracking</p>
                <Link to="/signin" className="btn btn-secondary signin-cart-btn">
                  Sign In
                </Link>
              </div>

              <Link to="/checkout" className="btn btn-primary checkout-btn">
                Proceed to Checkout
              </Link>

              <Link to="/products" className="continue-shopping">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    const productId = item._id || item.id;
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <div className="cart-item">
      <Link to={`/product/${item.id}`} className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </Link>
      
      <div className="cart-item-details">
        <Link to={`/product/${item.id}`} className="cart-item-name">
          {item.name}
        </Link>
        <p className="cart-item-price">₹{item.price}</p>
      </div>
      
      <div className="cart-item-controls">
        <div className="quantity-controls">
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(item.quantity - 1)}
          >
            -
          </button>
          <span className="quantity">{item.quantity}</span>
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            +
          </button>
        </div>
        
        <p className="cart-item-total">
          ₹{(item.price * item.quantity).toFixed(0)}
        </p>
        
        <button
          className="remove-btn"
          onClick={() => removeFromCart(item._id || item.id)}
          aria-label="Remove item"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default CartItem;
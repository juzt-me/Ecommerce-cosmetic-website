import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const productId = product._id || product.id;
    setIsWishlisted(wishlist.some(item => (item._id || item.id) === productId));
  }, [product._id, product.id]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock === 0) {
      alert('Sorry! This product is currently out of stock and cannot be added to cart.');
      return;
    }
    addToCart(product);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const productId = product._id || product.id;
    if (isWishlisted) {
      const updatedWishlist = wishlist.filter(item => (item._id || item.id) !== productId);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setIsWishlisted(false);
    } else {
      wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setIsWishlisted(true);
    }
    
    // Trigger custom event to update header counter
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  return (
    <div className="product-card card">
      <Link to={`/product/${product._id || product.id}`} className="product-link">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
          <button 
            className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
            onClick={handleWishlistToggle}
            title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            ❤️
          </button>
          {product.stock === 0 && <div className="out-of-stock">Out of Stock</div>}
        </div>
        
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <div className="product-rating">
            {'★'.repeat(5)}
            <span className="rating-text">(5.0)</span>
          </div>
          <p className="product-price">₹{product.price}</p>
        </div>
      </Link>
      
      <button
        className={`btn btn-primary add-to-cart-btn ${product.stock === 0 ? 'disabled' : ''}`}
        onClick={product.stock === 0 ? undefined : handleAddToCart}
        disabled={product.stock === 0}
        style={product.stock === 0 ? { pointerEvents: 'none' } : {}}
      >
        {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  );
};

export default ProductCard;
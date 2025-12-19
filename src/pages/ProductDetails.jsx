import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    
    // Simulate loading delay
    setTimeout(() => {
      setProduct(foundProduct);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleAddToCart = () => {
    if (product && product.inStock) {
      addToCart(product);
      // Show success message or redirect to cart
      alert('Product added to cart!');
    }
  };

  if (loading) {
    return (
      <div className="product-details-page">
        <div className="container">
          <div className="product-details-loading">
            <div className="loading-skeleton" style={{ height: '400px', marginBottom: '2rem' }}></div>
            <div className="loading-skeleton" style={{ height: '40px', marginBottom: '1rem' }}></div>
            <div className="loading-skeleton" style={{ height: '20px', marginBottom: '2rem' }}></div>
            <div className="loading-skeleton" style={{ height: '50px', width: '200px' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-details-page">
        <div className="container">
          <div className="product-not-found">
            <h2>Product Not Found</h2>
            <p>The product you're looking for doesn't exist.</p>
            <button onClick={() => navigate('/products')} className="btn btn-primary">
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Create multiple images for gallery (using same image for demo)
  const productImages = [
    product.image,
    product.image,
    product.image
  ];

  return (
    <div className="product-details-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>

        <div className="product-details">
          <div className="product-gallery">
            <div className="main-image">
              <img src={productImages[selectedImage]} alt={product.name} />
              {!product.inStock && <div className="out-of-stock-overlay">Out of Stock</div>}
            </div>
            <div className="image-thumbnails">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-rating">
              <div className="stars">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
              <span className="rating-text">({product.rating} out of 5)</span>
            </div>

            <div className="product-price">
              <span className="price">₹{product.price}</span>
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-features">
              <h3>Key Features</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="product-actions">
              <button
                className={`btn btn-primary add-to-cart ${!product.inStock ? 'disabled' : ''}`}
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button className="btn btn-secondary wishlist-btn">
                ♡ Add to Wishlist
              </button>
            </div>

            <div className="product-meta">
              <div className="meta-item">
                <strong>Category:</strong> {product.category}
              </div>
              <div className="meta-item">
                <strong>Availability:</strong> 
                <span className={product.inStock ? 'in-stock' : 'out-of-stock'}>
                  {product.inStock ? ' In Stock' : ' Out of Stock'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
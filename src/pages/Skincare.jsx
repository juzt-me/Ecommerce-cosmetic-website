import React, { useState } from 'react';
import ProductCard from '../components/ProductCard/ProductCard';
import { products } from '../data/products';
import './Skincare.css';

const Skincare = () => {
  const [selectedSkinType, setSelectedSkinType] = useState('all');
  const [selectedBenefit, setSelectedBenefit] = useState('all');

  const skincareProducts = products.filter(product => {
    if (product.category !== 'skincare') return false;
    if (selectedSkinType === 'all') return true;
    return product.skinType && product.skinType.includes(selectedSkinType);
  });

  const skinTypes = [
    { id: 'all', name: 'All Skin Types' },
    { id: 'dry', name: 'Dry Skin' },
    { id: 'oily', name: 'Oily Skin' },
    { id: 'sensitive', name: 'Sensitive Skin' },
    { id: 'combination', name: 'Combination' }
  ];

  const benefits = [
    { id: 'all', name: 'All Benefits' },
    { id: 'hydrating', name: 'Hydrating' },
    { id: 'anti-aging', name: 'Anti-Aging' },
    { id: 'brightening', name: 'Brightening' },
    { id: 'cleansing', name: 'Cleansing' }
  ];

  const ingredients = [
    { name: 'Hyaluronic Acid', benefit: 'Deep Hydration' },
    { name: 'Vitamin C', benefit: 'Brightening' },
    { name: 'Retinol', benefit: 'Anti-Aging' },
    { name: 'Niacinamide', benefit: 'Pore Refining' },
    { name: 'Rose Extract', benefit: 'Soothing' },
    { name: 'Peptides', benefit: 'Firming' }
  ];

  return (
    <div className="skincare-page">
      {/* Hero Section */}
      <section className="skincare-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Skincare Collection</h1>
            <p>Discover your perfect skincare routine with our luxurious, science-backed formulations</p>
          </div>
        </div>
      </section>

      {/* Skin Type Selector */}
      <section className="skin-type-section">
        <div className="container">
          <h2>Find Your Skin Type</h2>
          <div className="skin-type-grid">
            {skinTypes.map(type => (
              <button
                key={type.id}
                className={`skin-type-card ${selectedSkinType === type.id ? 'active' : ''}`}
                onClick={() => setSelectedSkinType(type.id)}
              >
                <span className="skin-type-name">{type.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <h2>Shop by Benefits</h2>
          <div className="benefits-grid">
            {benefits.map(benefit => (
              <button
                key={benefit.id}
                className={`benefit-card ${selectedBenefit === benefit.id ? 'active' : ''}`}
                onClick={() => setSelectedBenefit(benefit.id)}
              >
                <span className="benefit-name">{benefit.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Key Ingredients */}
      <section className="ingredients-section">
        <div className="container">
          <h2>Key Ingredients</h2>
          <p className="section-subtitle">Powerful actives that transform your skin</p>
          <div className="ingredients-grid">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="ingredient-card card">
                <h3>{ingredient.name}</h3>
                <p>{ingredient.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="skincare-products">
        <div className="container">
          <div className="products-header">
            <h2>Our Skincare Products</h2>
            <p>Curated formulations for every skin concern</p>
            {selectedSkinType !== 'all' && (
              <div className="skin-type-recommendation">
                <h3>Recommended for {skinTypes.find(type => type.id === selectedSkinType)?.name}</h3>
                <p>Showing {skincareProducts.length} products perfect for your skin type</p>
              </div>
            )}
          </div>
          <div className="products-grid">
            {skincareProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Skincare Routine */}
      <section className="routine-section">
        <div className="container">
          <h2>Your Perfect Routine</h2>
          <div className="routine-steps">
            <div className="routine-step">
              <div className="step-number">1</div>
              <h3>Cleanse</h3>
              <p>Start with our gentle cleansing foam to remove impurities</p>
            </div>
            <div className="routine-step">
              <div className="step-number">2</div>
              <h3>Treat</h3>
              <p>Apply targeted serums for your specific skin concerns</p>
            </div>
            <div className="routine-step">
              <div className="step-number">3</div>
              <h3>Moisturize</h3>
              <p>Lock in hydration with our nourishing creams</p>
            </div>
            <div className="routine-step">
              <div className="step-number">4</div>
              <h3>Protect</h3>
              <p>Shield your skin with SPF during the day</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skincare;
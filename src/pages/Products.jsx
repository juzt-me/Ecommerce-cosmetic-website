import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard/ProductCard';
import LoadingSkeleton from '../components/LoadingSkeleton/LoadingSkeleton';
import { categories } from '../data/products';
import './Products.css';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('name');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const searchQuery = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || 'all';

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory, searchQuery, sortBy]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const newParams = new URLSearchParams(searchParams);
    if (category === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', category);
    }
    setSearchParams(newParams);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="products-page">
      <div className="container">
        <div className="page-header">
          <h1>Our Products</h1>
          {searchQuery && (
            <p className="search-results">
              Showing results for "{searchQuery}" ({filteredProducts.length} products)
            </p>
          )}
        </div>

        <div className="products-controls">
          <div className="filters">
            <h3>Categories</h3>
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="sort-controls">
            <label htmlFor="sort">Sort by:</label>
            <select id="sort" value={sortBy} onChange={handleSortChange}>
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        <div className="products-grid">
          {loading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <LoadingSkeleton key={index} type="product" />
            ))
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="no-products">
              <h3>No products found</h3>
              <p>Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
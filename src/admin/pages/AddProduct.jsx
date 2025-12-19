import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProduct.css';

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    image: null
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('aura-token');
      const formDataToSend = new FormData();
      
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', `${formData.name} - Premium beauty product`);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('stock', formData.stock);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      const data = await response.json();
      
      if (data.success) {
        alert('Product added successfully!');
        navigate('/admin');
      } else {
        alert(data.message || 'Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  return (
    <div className="add-product-page">
      <div className="container">
        <div className="add-product-header">
          <button onClick={() => navigate('/admin')} className="btn btn-secondary">
            ← Back to Admin
          </button>
          <h1>Add New Product</h1>
        </div>

        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>



          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              <option value="faces">Faces</option>
              <option value="eyes">Eyes</option>
              <option value="lips">Lips</option>
              <option value="body">Body</option>
              <option value="hair">Hair</option>
              <option value="skincare">Skincare</option>
              <option value="nails">Nails</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Product Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/admin')} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
# Aura Pop Beauty API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Response Format
All API responses follow this structure:
```json
{
  "success": true/false,
  "data": {}, // Response data (if success)
  "message": "string", // Error/success message
  "errors": [] // Validation errors (if any)
}
```

---

## Authentication Endpoints

### Register User
- **POST** `/users/register`
- **Access:** Public
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login User
- **POST** `/users/login`
- **Access:** Public
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get User Profile
- **GET** `/users/profile`
- **Access:** Private
- **Headers:** `Authorization: Bearer <token>`

### Update User Profile
- **PUT** `/users/profile`
- **Access:** Private
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "phone": "+1234567890",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

---

## Product Endpoints

### Get All Products
- **GET** `/products`
- **Access:** Public
- **Query Parameters:**
  - `pageNumber` (optional): Page number (default: 1)
  - `pageSize` (optional): Items per page (default: 12)
  - `category` (optional): Filter by category
  - `search` (optional): Search products by name/description

### Get Single Product
- **GET** `/products/:id`
- **Access:** Public

### Get Products by Category
- **GET** `/products/category/:category`
- **Access:** Public
- **Categories:** `makeup`, `skincare`, `fragrance`, `haircare`, `nails`

### Get Flash Sale Products
- **GET** `/products/flash-sale`
- **Access:** Public

### Create Product (Admin Only)
- **POST** `/products`
- **Access:** Private/Admin
- **Headers:** `Authorization: Bearer <admin-token>`
- **Body:**
```json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 29.99,
  "originalPrice": 39.99,
  "category": "makeup",
  "subcategory": "lipstick",
  "brand": "Aura Pop",
  "image": "/product-image.jpg",
  "stockQuantity": 50,
  "shades": ["Red", "Pink", "Nude"],
  "sizes": ["5ml", "10ml"]
}
```

### Update Product (Admin Only)
- **PUT** `/products/:id`
- **Access:** Private/Admin
- **Headers:** `Authorization: Bearer <admin-token>`

### Delete Product (Admin Only)
- **DELETE** `/products/:id`
- **Access:** Private/Admin
- **Headers:** `Authorization: Bearer <admin-token>`

---

## Cart Endpoints

### Get User Cart
- **GET** `/cart`
- **Access:** Private
- **Headers:** `Authorization: Bearer <token>`

### Add Item to Cart
- **POST** `/cart/add`
- **Access:** Private
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "productId": "product_id_here",
  "quantity": 2,
  "selectedShade": "Rose Gold",
  "selectedSize": "30ml"
}
```

### Update Cart Item
- **PUT** `/cart/update`
- **Access:** Private
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "productId": "product_id_here",
  "quantity": 3,
  "selectedShade": "Rose Gold",
  "selectedSize": "30ml"
}
```

### Remove Item from Cart
- **DELETE** `/cart/remove/:productId`
- **Access:** Private
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters:**
  - `selectedShade` (optional)
  - `selectedSize` (optional)

### Clear Cart
- **DELETE** `/cart`
- **Access:** Private
- **Headers:** `Authorization: Bearer <token>`

---

## Order Endpoints

### Create Order
- **POST** `/orders`
- **Access:** Private
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "orderItems": [
    {
      "_id": "product_id",
      "name": "Product Name",
      "image": "/product-image.jpg",
      "price": 29.99,
      "quantity": 2,
      "selectedShade": "Rose Gold",
      "selectedSize": "30ml"
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "credit_card",
  "itemsPrice": 59.98,
  "taxPrice": 4.80,
  "shippingPrice": 9.99,
  "totalPrice": 74.77
}
```

### Get Order by ID
- **GET** `/orders/:id`
- **Access:** Private
- **Headers:** `Authorization: Bearer <token>`

### Get My Orders
- **GET** `/orders/myorders`
- **Access:** Private
- **Headers:** `Authorization: Bearer <token>`

### Update Order to Paid
- **PUT** `/orders/:id/pay`
- **Access:** Private
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "id": "payment_id",
  "status": "COMPLETED",
  "update_time": "2023-12-01T10:00:00Z",
  "payer": {
    "email_address": "customer@example.com"
  }
}
```

### Get All Orders (Admin Only)
- **GET** `/orders`
- **Access:** Private/Admin
- **Headers:** `Authorization: Bearer <admin-token>`

### Update Order to Delivered (Admin Only)
- **PUT** `/orders/:id/deliver`
- **Access:** Private/Admin
- **Headers:** `Authorization: Bearer <admin-token>`
- **Body:**
```json
{
  "trackingNumber": "TRK123456789"
}
```

---

## Error Codes

- **200** - Success
- **201** - Created
- **400** - Bad Request
- **401** - Unauthorized
- **403** - Forbidden
- **404** - Not Found
- **500** - Internal Server Error

---

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/aura-pop-beauty
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
NODE_ENV=development
```

---

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env` file

3. Start MongoDB service

4. Seed the database (optional):
```bash
node seedData.js
```

5. Start the server:
```bash
npm run dev  # Development mode with nodemon
npm start    # Production mode
```

The API will be available at `http://localhost:5000`

---

## Frontend Integration

### Example API calls from React:

```javascript
// Login user
const loginUser = async (email, password) => {
  const response = await fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

// Get products
const getProducts = async (category = '', search = '') => {
  const query = new URLSearchParams({
    ...(category && { category }),
    ...(search && { search }),
  });
  
  const response = await fetch(`/api/products?${query}`);
  return response.json();
};

// Add to cart
const addToCart = async (productId, quantity, token) => {
  const response = await fetch('/api/cart/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ productId, quantity }),
  });
  return response.json();
};
```
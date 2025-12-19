# Aura Pop Beauty Backend API

A comprehensive Node.js backend API for the Aura Pop Beauty cosmetic ecommerce website built with Express.js, MongoDB, and JWT authentication.

## 🚀 Features

- **User Authentication**: JWT-based authentication with registration, login, and profile management
- **Product Management**: CRUD operations for cosmetic products with categories and search
- **Shopping Cart**: Add, update, remove items with user-specific cart persistence
- **Order Management**: Complete order processing with payment tracking and delivery status
- **Category Support**: Specialized skincare category and other cosmetic categories
- **Security**: Password hashing, JWT tokens, input validation, and error handling
- **Database**: MongoDB with Mongoose ODM for robust data modeling

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **CORS**: Cross-origin resource sharing enabled
- **Environment**: dotenv for configuration

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── productController.js # Product CRUD operations
│   ├── cartController.js    # Shopping cart management
│   └── orderController.js   # Order processing
├── middleware/
│   ├── auth.js             # JWT authentication middleware
│   └── errorHandler.js     # Global error handling
├── models/
│   ├── User.js             # User schema
│   ├── Product.js          # Product schema
│   ├── Cart.js             # Shopping cart schema
│   └── Order.js            # Order schema
├── routes/
│   ├── authRoutes.js       # Authentication endpoints
│   ├── productRoutes.js    # Product endpoints
│   ├── cartRoutes.js       # Cart endpoints
│   └── orderRoutes.js      # Order endpoints
├── .env                    # Environment variables
├── server.js               # Main server file
├── seedData.js             # Database seeding script
└── package.json            # Dependencies and scripts
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
cd cosmetic-project/backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/aura-pop-beauty
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
NODE_ENV=development
```

4. **Start MongoDB**
Make sure MongoDB is running on your system.

5. **Seed the database (optional)**
```bash
node seedData.js
```

6. **Start the server**
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:5000`

## 📚 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile (Protected)
- `PUT /api/users/profile` - Update user profile (Protected)

### Products
- `GET /api/products` - Get all products with pagination and filters
- `GET /api/products/:id` - Get single product
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/flash-sale` - Get flash sale products
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Shopping Cart
- `GET /api/cart` - Get user cart (Protected)
- `POST /api/cart/add` - Add item to cart (Protected)
- `PUT /api/cart/update` - Update cart item (Protected)
- `DELETE /api/cart/remove/:productId` - Remove item from cart (Protected)
- `DELETE /api/cart` - Clear cart (Protected)

### Orders
- `POST /api/orders` - Create new order (Protected)
- `GET /api/orders/:id` - Get order by ID (Protected)
- `GET /api/orders/myorders` - Get user's orders (Protected)
- `PUT /api/orders/:id/pay` - Update order payment status (Protected)
- `GET /api/orders` - Get all orders (Admin only)
- `PUT /api/orders/:id/deliver` - Update delivery status (Admin only)

## 🔒 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: express-validator for request validation
- **CORS Configuration**: Controlled cross-origin access
- **Error Handling**: Comprehensive error responses
- **Admin Protection**: Role-based access control

## 🗄 Database Models

### User Model
- Personal information (name, email, phone)
- Secure password storage
- Shipping address
- Admin role flag

### Product Model
- Product details (name, description, price)
- Category and subcategory classification
- Inventory management
- Product variants (shades, sizes)
- Rating and review system

### Cart Model
- User-specific shopping cart
- Product references with quantities
- Selected variants (shade, size)
- Automatic total calculation

### Order Model
- Complete order information
- Payment and shipping details
- Order status tracking
- Delivery management

## 🧪 Testing the API

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Register User
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Get Products
```bash
curl http://localhost:5000/api/products
```

## 🔧 Development

### Available Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Environment Modes
- **Development**: Detailed error messages, CORS for localhost
- **Production**: Optimized error handling, restricted CORS

## 📝 API Documentation

Detailed API documentation is available in `API_DOCUMENTATION.md` with:
- Complete endpoint descriptions
- Request/response examples
- Authentication requirements
- Error codes and handling

## 🤝 Frontend Integration

The backend is designed to work seamlessly with the React frontend. Key integration points:

- **Authentication**: JWT tokens for user sessions
- **Product Catalog**: RESTful endpoints for product browsing
- **Shopping Cart**: Real-time cart management
- **Order Processing**: Complete checkout workflow
- **User Management**: Profile and order history

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aura-pop-beauty
JWT_SECRET=your-production-jwt-secret-key
PORT=5000
```

### Production Considerations
- Use MongoDB Atlas for cloud database
- Implement rate limiting
- Add request logging
- Set up monitoring and alerts
- Configure SSL/HTTPS
- Implement caching strategies

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

**Aura Pop Beauty Backend API** - Powering beautiful ecommerce experiences 💄✨
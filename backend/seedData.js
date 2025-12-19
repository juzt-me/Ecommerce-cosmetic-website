const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const products = [
  {
    name: "Rose Gold Glow Foundation",
    description: "A luxurious liquid foundation that provides full coverage with a radiant, rose gold finish. Perfect for all skin types.",
    price: 45.99,
    originalPrice: 55.99,
    category: "makeup",
    subcategory: "foundation",
    brand: "Aura Pop",
    image: "/Rose-gold-glow-foundation.jpg",
    inStock: true,
    stockQuantity: 50,
    rating: 4.8,
    numReviews: 124,
    shades: ["Fair", "Light", "Medium", "Tan", "Deep"],
    sizes: ["30ml", "50ml"]
  },
  {
    name: "Velvet Matte Lipstick",
    description: "Long-lasting matte lipstick with intense color payoff and comfortable wear.",
    price: 24.99,
    category: "makeup",
    subcategory: "lipstick",
    brand: "Aura Pop",
    image: "/velvet-matte-lipstick.jpg",
    inStock: true,
    stockQuantity: 75,
    rating: 4.6,
    numReviews: 89,
    shades: ["Ruby Red", "Berry Bliss", "Nude Pink", "Coral Crush"]
  },
  {
    name: "Hydrating Face Serum",
    description: "Intensive hydrating serum with hyaluronic acid for plump, moisturized skin.",
    price: 39.99,
    category: "skincare",
    subcategory: "serum",
    brand: "Aura Pop",
    image: "/hydrating-face-serum.jpg",
    inStock: true,
    stockQuantity: 30,
    rating: 4.9,
    numReviews: 156,
    ingredients: ["Hyaluronic Acid", "Vitamin B5", "Glycerin"],
    sizes: ["30ml", "50ml"]
  },
  {
    name: "Vitamin C Brightening Serum",
    description: "Powerful vitamin C serum that brightens skin and reduces dark spots.",
    price: 42.99,
    category: "skincare",
    subcategory: "serum",
    brand: "Aura Pop",
    image: "/vitamin-C-brightening-serum.jpg",
    inStock: true,
    stockQuantity: 25,
    rating: 4.7,
    numReviews: 98,
    ingredients: ["Vitamin C", "Niacinamide", "Vitamin E"]
  },
  {
    name: "Eyeshadow Palette",
    description: "12-shade eyeshadow palette with matte and shimmer finishes.",
    price: 35.99,
    category: "makeup",
    subcategory: "eyeshadow",
    brand: "Aura Pop",
    image: "/eyeshadow-palette.jpg",
    inStock: true,
    stockQuantity: 40,
    rating: 4.5,
    numReviews: 67
  },
  {
    name: "Golden Aura Perfume",
    description: "Luxurious floral fragrance with notes of jasmine, rose, and vanilla.",
    price: 68.99,
    category: "fragrance",
    subcategory: "perfume",
    brand: "Aura Pop",
    image: "/golden-aura-perfumes.jpg",
    inStock: true,
    stockQuantity: 20,
    rating: 4.8,
    numReviews: 45,
    sizes: ["30ml", "50ml", "100ml"]
  },
  {
    name: "Waterproof Mascara",
    description: "Long-lasting waterproof mascara for dramatic, voluminous lashes.",
    price: 22.99,
    category: "makeup",
    subcategory: "mascara",
    brand: "Aura Pop",
    image: "/waterproof-mascara.jpg",
    inStock: true,
    stockQuantity: 60,
    rating: 4.4,
    numReviews: 78
  },
  {
    name: "Moisturizing Night Cream",
    description: "Rich night cream that deeply nourishes and repairs skin overnight.",
    price: 48.99,
    category: "skincare",
    subcategory: "moisturizer",
    brand: "Aura Pop",
    image: "/moisturizing-night-cream.jpg",
    inStock: true,
    stockQuantity: 35,
    rating: 4.6,
    numReviews: 112,
    ingredients: ["Retinol", "Peptides", "Ceramides"]
  },
  {
    name: "Liquid Highlighter",
    description: "Buildable liquid highlighter for a natural, dewy glow.",
    price: 28.99,
    category: "makeup",
    subcategory: "highlighter",
    brand: "Aura Pop",
    image: "/liquid-highlighter.jpg",
    inStock: true,
    stockQuantity: 45,
    rating: 4.7,
    numReviews: 56,
    shades: ["Champagne", "Rose Gold", "Pearl"]
  },
  {
    name: "Nourishing Hair Shampoo",
    description: "Sulfate-free shampoo that gently cleanses and nourishes all hair types.",
    price: 26.99,
    category: "haircare",
    subcategory: "shampoo",
    brand: "Aura Pop",
    image: "/nourishing-hair-shampoo.jpg",
    inStock: true,
    stockQuantity: 55,
    rating: 4.5,
    numReviews: 89,
    sizes: ["250ml", "500ml"]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    await Product.insertMany(products);
    console.log('Sample products inserted');

    // Create admin user if it doesn't exist
    const adminExists = await User.findOne({ email: 'admin@aurapop.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@aurapop.com',
        password: 'admin123',
        isAdmin: true
      });
      console.log('Admin user created - Email: admin@aurapop.com, Password: admin123');
    } else {
      console.log('Admin user already exists');
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
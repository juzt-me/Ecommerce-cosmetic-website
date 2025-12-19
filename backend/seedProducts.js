require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const sampleProducts = [
  { name: 'Waterproof Mascara', description: 'Long-lasting waterproof mascara', price: 2074, image: '/waterproof-mascara.jpg', category: 'eyes', stock: 100 },
  { name: 'Red Nail Polish', description: 'Classic red nail polish', price: 3237, image: '/red-nail-polish.jpg', category: 'nails', stock: 75 },
  { name: 'Eyeshadow Palette', description: 'Professional eyeshadow palette', price: 4398, image: '/eyeshadow-palette.jpg', category: 'eyes', stock: 50 },
  { name: 'Rose Gold Foundation', description: 'Glowing foundation', price: 2850, image: '/Rose-gold-glow-foundation.jpg', category: 'face', stock: 80 },
  { name: 'Vitamin C Serum', description: 'Brightening serum', price: 3500, image: '/vitamin-C-brightening-serum.jpg', category: 'skincare', stock: 60 },
  { name: 'Velvet Matte Lipstick', description: 'Rich matte lipstick', price: 1899, image: '/velvet-matte-lipstick.jpg', category: 'lips', stock: 90 },
  { name: 'Liquid Highlighter', description: 'Radiant liquid highlighter', price: 2200, image: '/liquid-highlighter.jpg', category: 'face', stock: 45 },
  { name: 'Gel Eyeliner', description: 'Smudge-proof gel eyeliner', price: 1650, image: '/gel-eyeliner.jpg', category: 'eyes', stock: 70 },
  { name: 'Nourishing Lip Balm', description: 'Moisturizing lip balm', price: 899, image: '/nourishing-lip-balm.jpg', category: 'lips', stock: 120 },
  { name: 'Setting Powder', description: 'Translucent setting powder', price: 2750, image: '/setting-powder.jpg', category: 'face', stock: 55 },
  { name: 'Hydrating Face Serum', description: 'Intensive hydrating serum', price: 4200, image: '/hydrating-face-serum.jpg', category: 'skincare', stock: 40 },
  { name: 'False Eyelashes', description: 'Natural-looking false eyelashes', price: 1299, image: '/false-eyelashes.jpg', category: 'eyes', stock: 85 },
  { name: 'Concealer Palette', description: 'Multi-shade concealer palette', price: 2999, image: '/concealer-palette.jpg', category: 'face', stock: 65 },
  { name: 'Contouring Palette', description: 'Professional contouring kit', price: 3899, image: '/contouring-palette.jpg', category: 'face', stock: 40 },
  { name: 'Cuticle Oil', description: 'Nourishing cuticle treatment', price: 799, image: '/cuticle-oil .jpg', category: 'nails', stock: 95 },
  { name: 'Deep Conditioning Hair Mask', description: 'Intensive hair treatment', price: 2499, image: '/deep-conditioning-hair-mask .jpg', category: 'hair', stock: 30 },
  { name: 'Dry Shampoo', description: 'Refreshing dry shampoo', price: 1149, image: '/dry-shampoo.jpg', category: 'hair', stock: 80 },
  { name: 'Exfoliating Body Scrub', description: 'Gentle body exfoliator', price: 1899, image: '/exfoliating-body-scrub.jpg', category: 'body', stock: 50 },
  { name: 'Exfoliating Face Scrub', description: 'Gentle facial exfoliator', price: 1599, image: '/exfoliating-face-scrub.jpg', category: 'skincare', stock: 70 },
  { name: 'Eye Primer', description: 'Long-lasting eye primer', price: 1299, image: '/eye-primer.jpg', category: 'eyes', stock: 85 },
  { name: 'Eyebrow Pencil', description: 'Precision eyebrow pencil', price: 999, image: '/eyebrow-pencil.jpg', category: 'eyes', stock: 110 },
  { name: 'Eyeliner', description: 'Classic black eyeliner', price: 1199, image: '/eyeliner.jpg', category: 'eyes', stock: 90 },
  { name: 'Eyeshadow Brush', description: 'Professional eyeshadow brush', price: 899, image: '/eyeshadow-brush.jpg', category: 'tools', stock: 75 },
  { name: 'Fresh Citrus Perfume', description: 'Refreshing citrus fragrance', price: 4999, image: '/fresh-citrus-perfume.jpg', category: 'fragrance', stock: 25 },
  { name: 'Gentle Cleansing Foam', description: 'Mild facial cleanser', price: 1799, image: '/gentle-cleansing-foam.jpg', category: 'skincare', stock: 60 },
  { name: 'Gentle Makeup Remover', description: 'Effective makeup remover', price: 1399, image: '/gentle-makeup-remover.jpg', category: 'skincare', stock: 80 },
  { name: 'Glitter Nail Polish', description: 'Sparkly nail polish', price: 1599, image: '/glitter-nail-polish.jpg', category: 'nails', stock: 55 },
  { name: 'Glossy Lip Gloss', description: 'High-shine lip gloss', price: 1299, image: '/glossy-lip-gloss.jpg', category: 'lips', stock: 95 },
  { name: 'Golden Aura Perfume', description: 'Luxurious golden fragrance', price: 6999, image: '/golden-aura-perfumes.jpg', category: 'fragrance', stock: 15 },
  { name: 'Heat Protection Hair Serum', description: 'Protective hair serum', price: 2199, image: '/heat-production-hair-serum .jpg', category: 'hair', stock: 45 },
  { name: 'Lip Liner Set', description: 'Multi-color lip liner set', price: 2499, image: '/lip-liner-set.jpg', category: 'lips', stock: 40 },
  { name: 'Lip Scrub', description: 'Exfoliating lip scrub', price: 899, image: '/lip-scrub.jpg', category: 'lips', stock: 85 },
  { name: 'Liquid Lipstick', description: 'Long-lasting liquid lipstick', price: 1799, image: '/liquid-lipstick.jpg', category: 'lips', stock: 70 },
  { name: 'Matte Foundation Stick', description: 'Full coverage foundation', price: 3299, image: '/matte-foundation-stick.jpg', category: 'face', stock: 35 },
  { name: 'Moisturizing Night Cream', description: 'Intensive night moisturizer', price: 3799, image: '/moisturizing-night-cream.jpg', category: 'skincare', stock: 50 },
  { name: 'Nail Art Kit', description: 'Complete nail art set', price: 2999, image: '/nail-art-kit.jpg', category: 'nails', stock: 30 },
  { name: 'Nail Base Coat', description: 'Protective base coat', price: 999, image: '/nail-base-coat.jpg', category: 'nails', stock: 90 },
  { name: 'Nail Polish Remover', description: 'Gentle nail polish remover', price: 699, image: '/nail-polish-remover.jpg', category: 'nails', stock: 100 },
  { name: 'Nourishing Hair Shampoo', description: 'Moisturizing shampoo', price: 1599, image: '/nourishing-hair-shampoo.jpg', category: 'hair', stock: 65 },
  { name: 'Nude Pink Nail Polish', description: 'Classic nude pink polish', price: 1299, image: '/nude-pink-nail-polish.jpg', category: 'nails', stock: 80 },
  { name: 'Plumping Lip Serum', description: 'Volumizing lip treatment', price: 2799, image: '/plumbing-lip-serum.jpg', category: 'lips', stock: 35 },
  { name: 'Rose Garden Perfume', description: 'Romantic rose fragrance', price: 5499, image: '/rose-garden-perfume.jpg', category: 'fragrance', stock: 20 },
  { name: 'Rose Gold Nail Polish', description: 'Trendy rose gold polish', price: 1799, image: '/rose-gold-nail-polish.jpg', category: 'nails', stock: 60 },
  { name: 'Shimmer Body Oil', description: 'Glowing body oil', price: 2999, image: '/shimmer-body-oil-perfume.jpg', category: 'body', stock: 40 },
  { name: 'Tinted Lip Oil', description: 'Nourishing tinted lip oil', price: 1599, image: '/tinted-lip-oil.jpg', category: 'lips', stock: 75 },
  { name: 'Vanilla Body Mist', description: 'Sweet vanilla body spray', price: 1999, image: '/vanilla-body-mist-perfume.jpg', category: 'fragrance', stock: 55 },
  { name: 'Volumizing Hair Spray', description: 'Volume-boosting hair spray', price: 1799, image: '/Volumizing-hair-spray .jpg', category: 'hair', stock: 50 }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    await Product.deleteMany({});
    console.log('Adding', sampleProducts.length, 'products...');
    await Product.insertMany(sampleProducts);
    
    console.log('Sample products added successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
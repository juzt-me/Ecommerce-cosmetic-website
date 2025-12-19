const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const checkAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const admin = await User.findOne({ email: 'admin@aurapop.com' });
    
    if (admin) {
      console.log('✅ Admin user found:');
      console.log('Name:', admin.name);
      console.log('Email:', admin.email);
      console.log('isAdmin:', admin.isAdmin);
      console.log('Created:', admin.createdAt);
    } else {
      console.log('❌ Admin user not found');
      
      // Create admin user
      const newAdmin = await User.create({
        name: 'Admin User',
        email: 'admin@aurapop.com',
        password: 'admin123',
        isAdmin: true
      });
      
      console.log('✅ Admin user created:');
      console.log('Name:', newAdmin.name);
      console.log('Email:', newAdmin.email);
      console.log('isAdmin:', newAdmin.isAdmin);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkAdmin();
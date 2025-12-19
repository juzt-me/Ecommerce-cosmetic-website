const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const resetAdminPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    const result = await User.updateOne(
      { email: 'admin@aurapop.com' },
      { 
        password: hashedPassword,
        isAdmin: true 
      }
    );

    if (result.modifiedCount > 0) {
      console.log('✅ Admin password reset successfully');
      console.log('Email: admin@aurapop.com');
      console.log('Password: admin123');
      
      const admin = await User.findOne({ email: 'admin@aurapop.com' });
      console.log('isAdmin:', admin.isAdmin);
    } else {
      console.log('❌ Admin user not found');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

resetAdminPassword();
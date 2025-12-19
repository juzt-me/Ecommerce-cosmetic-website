const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const makeAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // First, delete any existing admin user to start fresh
    await User.deleteOne({ email: "admin@aurapop.com" });
    console.log("Deleted existing admin user if any");

    // Create new admin user
    const admin = new User({
      name: "Admin User",
      email: "admin@aurapop.com",
      password: "admin123",
      isAdmin: true
    });
    
    const savedAdmin = await admin.save();
    console.log("✅ Admin user created successfully");
    
    // Verify the admin was created with isAdmin field
    const verifyAdmin = await User.findOne({ email: "admin@aurapop.com" });
    console.log("\n=== VERIFICATION ===");
    console.log("Name:", verifyAdmin.name);
    console.log("Email:", verifyAdmin.email);
    console.log("isAdmin:", verifyAdmin.isAdmin);
    console.log("ID:", verifyAdmin._id);
    
    // Also check all users to see the admin
    const allUsers = await User.find({});
    console.log("\n=== ALL USERS ===");
    allUsers.forEach(user => {
      console.log(`${user.name} (${user.email}) - Admin: ${user.isAdmin}`);
    });

    // Close connection properly
    await mongoose.connection.close();
    console.log("\nDatabase connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

makeAdmin();

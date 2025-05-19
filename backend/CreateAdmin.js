const mongoose = require('mongoose');    // Mongoose for MongoDB interaction
const dotenv = require('dotenv');        // Loads env variables from .env file
const bcrypt = require('bcryptjs');      // To hash passwords securely
const User = require('./models/User');   // User model

dotenv.config();  // Load environment variables from .env

// Connect to MongoDB using the URI from environment variables
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    // Hash the password for the admin user (here: 'admin123')
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Create a new admin user document
    const admin = new User({
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin'
    });

    // Save the admin user to the database
    await admin.save();

    console.log('Admin user created');

    // Exit process after user creation
    process.exit();
  })
  .catch(err => console.log(err));  // Log any connection or save errors

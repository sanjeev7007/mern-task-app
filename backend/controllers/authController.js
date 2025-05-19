const User = require('../models/User');       // User model for admin users
const bcrypt = require('bcryptjs');           // For hashing passwords securely
const jwt = require('jsonwebtoken');          // For generating JWT tokens

// Controller to register a new admin user
exports.registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin with the same email already exists
    const existing = await User.findOne({ email });
    if (existing) 
      return res.status(400).json({ message: 'Admin already exists' });

    // Hash the password before saving to DB for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin user document and save it
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Respond with success message
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    // Handle server errors
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller to login admin and return JWT token
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin user by email
    const user = await User.findOne({ email });
    if (!user) 
      return res.status(400).json({ message: 'Invalid credentials' });

    // Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) 
      return res.status(400).json({ message: 'Invalid credentials' });

    // Create a JWT token with user ID and secret key, expires in 1 day
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    // Send token to client for authenticated requests
    res.json({ token });
  } catch (err) {
    // Handle server errors
    res.status(500).json({ message: 'Server Error' });
  }
};

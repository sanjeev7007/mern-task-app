const mongoose = require('mongoose');

// Schema for users (admins in your app)
const userSchema = new mongoose.Schema({
  // User email, required and unique
  email: {
    type: String,
    required: true,
    unique: true
  },
  // User password, required
  password: {
    type: String,
    required: true
  },
  // Role field, default is 'admin' (can be extended later)
  role: {
    type: String,
    default: 'admin'  // For now, assume all users are admins
  }
});

// Export User model
module.exports = mongoose.model('User', userSchema);

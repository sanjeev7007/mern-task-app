const mongoose = require('mongoose');

// Define schema for Agent collection
const agentSchema = new mongoose.Schema({
  // Agent's full name (required)
  name: { type: String, required: true },

  // Agent's email (required and unique)
  email: { type: String, required: true, unique: true },

  // Agent's mobile number (required)
  mobile: { type: String, required: true },

  // Agent's password (optional field)
  password: { type: String, required: false }
}, { 
  timestamps: true  // Automatically adds createdAt and updatedAt timestamps
});

// Export the model to use in other parts of the app
module.exports = mongoose.model('Agent', agentSchema);

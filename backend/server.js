const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();  // Load environment variables from .env file

const app = express();

app.use(cors());           // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json());   // Parse incoming JSON request bodies

// Serve static files from the 'uploads' folder at /uploads route
// Useful for accessing uploaded files directly via URL
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;          // Server port from env or default 5000
const MONGO_URI = process.env.MONGO_URI;        // MongoDB connection string from env

// Connect to MongoDB database
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    // Start server listening only after DB connection is successful
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    // Log DB connection errors and exit process
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Import route handlers
const authRoutes = require('./routes/authRoutes');
const agentRoutes = require('./routes/agentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const distributedListRoutes = require('./routes/distributedListRoutes');

// Define API endpoints and link them to route handlers
app.use('/api/auth', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/upload', uploadRoutes);                // Upload-related routes
app.use('/api/distributedLists', distributedListRoutes);  // Distributed tasks routes

// Basic root endpoint to verify API is running
app.get('/', (req, res) => {
  res.send('API is running...');
});

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Global error handler middleware to catch errors in routes
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.message);
  res.status(500).json({ messaage: err.message || 'Server Error' });
});

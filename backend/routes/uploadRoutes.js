const express = require('express');
const router = express.Router();
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');
const { uploadAgentsFromCSV } = require('../controllers/agentController');

// Set up multer
const upload = multer({ dest: 'uploads/' });

// Route with auth and multer middleware, then controller function handler
router.post('/upload', authMiddleware, upload.single('file'), uploadAgentsFromCSV);

module.exports = router;

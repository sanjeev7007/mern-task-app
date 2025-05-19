const express = require('express');
const router = express.Router();
const multer = require('multer'); // ← uncommented this
const authMiddleware = require('../middleware/authMiddleware'); // ← fixed path
const { uploadAgentsFromCSV } = require('../controllers/agentController'); // ← fixed path

// Set up multer to save files to "uploads" folder
const upload = multer({ dest: 'uploads/' });

// Protected route: user must be authenticated
router.post('/upload', authMiddleware, upload.single('file'), uploadAgentsFromCSV);

module.exports = router;

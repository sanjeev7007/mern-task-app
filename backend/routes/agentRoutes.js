const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');
const authMiddleware = require('../middleware/authMiddleware'); // this file must exist

router.get('/', authMiddleware, agentController.getAgents);

module.exports = router;

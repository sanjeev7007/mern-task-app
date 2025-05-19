const express = require('express');
const router = express.Router();
const DistributedList = require('../models/DistributedList');
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
  try {
    const lists = await DistributedList.find().populate('agent', 'name email mobile');
    res.json(lists);
  } catch (err) {
    console.error('Error fetching all distributed lists:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/agent/:agentId', async (req, res) => {
  try {
    const { agentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(agentId)) {
      return res.status(400).json({ message: 'Invalid agent ID' });
    }

    const list = await DistributedList.findOne({ agent: agentId }).populate('agent', 'name email mobile');
    if (!list) {
      return res.status(404).json({ message: 'No tasks found for this agent' });
    }

    // ✅ Send in frontend-friendly format
    res.json({
      agent: list.agent,
      tasks: list.tasks
    });

  } catch (err) {
    console.error('Error fetching distributed list for agent:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;
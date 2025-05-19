// controllers/agentController.js

const Agent = require('../models/Agent'); // Your Agent model

// Create a new agent
exports.createAgent = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;

    // Basic validation (you can add more)
    if (!name || !email || !mobile) {
      return res.status(400).json({ message: 'Please provide name, email, and mobile.' });
    }

    // Check if agent with email already exists
    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) {
      return res.status(400).json({ message: 'Agent with this email already exists.' });
    }

    // Create new agent
    const newAgent = new Agent({ name, email, mobile });
    await newAgent.save();

    res.status(201).json(newAgent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all agents
exports.getAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get agent by ID
exports.getAgentById = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) return res.status(404).json({ message: 'Agent not found' });
    res.json(agent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an agent
exports.updateAgent = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;
    const agent = await Agent.findById(req.params.id);

    if (!agent) return res.status(404).json({ message: 'Agent not found' });

    agent.name = name || agent.name;
    agent.email = email || agent.email;
    agent.mobile = mobile || agent.mobile;

    await agent.save();
    res.json(agent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete an agent
exports.deleteAgent = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) return res.status(404).json({ message: 'Agent not found' });

    await agent.remove();
    res.json({ message: 'Agent deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

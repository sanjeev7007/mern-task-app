const Agent = require('../models/Agent');
const csv = require('csv-parser');
const fs = require('fs');
const DistributedList = require('../models/DistributedList');

exports.createAgent = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;

    if (!name || !email || !mobile) {
      return res.status(400).json({ message: 'Please provide name, email, and mobile.' });
    }

    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) {
      return res.status(400).json({ message: 'Agent with this email already exists.' });
    }

    const newAgent = new Agent({ name, email, mobile });
    await newAgent.save();

    res.status(201).json(newAgent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

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

exports.uploadAgentsFromCSV = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        await DistributedList.deleteMany({});

        const agentTasksMap = new Map();

        for (const row of results) {
          let agent = await Agent.findOne({ email: row.email });

          if (!agent) {
            agent = await Agent.create({
              name: row.name,
              email: row.email,
              mobile: row.mobile,
            });
          }

          if (!agentTasksMap.has(agent._id.toString())) {
            agentTasksMap.set(agent._id.toString(), { agent, tasks: [] });
          }

          agentTasksMap.get(agent._id.toString()).tasks.push({ task: row.tasks });
        }

        for (const { agent, tasks } of agentTasksMap.values()) {
          await DistributedList.create({
            agent: agent._id,
            tasks,
          });
        }

        fs.unlinkSync(req.file.path);

        res.status(200).json({ message: 'CSV uploaded and data distributed' });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

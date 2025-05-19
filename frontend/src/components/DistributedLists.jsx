const csv = require('csv-parser');
const fs = require('fs');
const Agent = require('../models/Agent');
const DistributedList = require('../models/DistributedList');

exports.uploadCSV = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        await DistributedList.deleteMany({}); // clear old data

        // Group tasks by agent email
        const agentTasksMap = {};

        for (const row of results) {
          let agent = await Agent.findOne({ email: row.email });

          if (!agent) {
            agent = await Agent.create({
              name: row.name,
              email: row.email,
              mobile: row.mobile
            });
          }

          if (!agentTasksMap[agent._id]) {
            agentTasksMap[agent._id] = [];
          }

          agentTasksMap[agent._id].push({ task: row.tasks });
        }

        // Save one DistributedList per agent with all tasks
        const distributedData = Object.entries(agentTasksMap).map(([agentId, tasks]) => ({
          agent: agentId,
          tasks,
        }));

        await DistributedList.insertMany(distributedData);

        fs.unlinkSync(req.file.path);
        res.status(200).json({ message: 'CSV uploaded and data distributed' });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

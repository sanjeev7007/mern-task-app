const csv = require('csv-parser');             // For parsing CSV files
const fs = require('fs');                       // For file system operations
const Agent = require('../models/Agent');      // Agent model
const DistributedList = require('../models/DistributedList');  // Model for task distribution

exports.uploadCSV = async (req, res) => {
  try {
    // Check if a CSV file was uploaded
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const results = [];  // Array to hold CSV rows as objects

    // Create a readable stream from uploaded CSV file and pipe through csv-parser
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => results.push(data))  // Push each parsed row into results array
      .on('end', async () => {
        // Clear any existing data from DistributedList to avoid duplicates
        await DistributedList.deleteMany({});

        // Map to group tasks by agent ID for bulk insertion later
        const agentTasksMap = new Map();

        // Iterate through each row from the CSV
        for (const row of results) {
          // Find an agent by email; if agent doesn't exist, create a new one
          let agent = await Agent.findOne({ email: row.email });

          if (!agent) {
            agent = await Agent.create({
              name: row.name,
              email: row.email,
              mobile: row.mobile,
            });
          }

          // If this agent is not yet in the map, initialize with empty tasks array
          if (!agentTasksMap.has(agent._id.toString())) {
            agentTasksMap.set(agent._id.toString(), { agent, tasks: [] });
          }

          // Add the task (from CSV's 'tasks' column) to this agent's task list
          agentTasksMap.get(agent._id.toString()).tasks.push({ task: row.tasks });
        }

        // Iterate over the map and create DistributedList entries for each agent with their tasks
        for (const { agent, tasks } of agentTasksMap.values()) {
          await DistributedList.create({
            agent: agent._id,
            tasks,
          });
        }

        // Delete the uploaded CSV file after processing to free up space
        fs.unlinkSync(req.file.path);

        // Send success response
        res.status(200).json({ message: 'CSV uploaded and data distributed' });
      });
  } catch (err) {
    console.error(err);
    // Handle unexpected server errors
    res.status(500).json({ message: 'Server error' });
  }
};

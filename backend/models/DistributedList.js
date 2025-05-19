const mongoose = require('mongoose');

// Schema to store tasks distributed to agents
const DistributedListSchema = new mongoose.Schema({
  // Reference to the Agent this list belongs to
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent',      // Reference to Agent model
    required: true,
  },
  // Array of task objects, each with a 'task' string field
  tasks: [
    {
      task: String
    }
  ],
}, { 
  timestamps: true    // Automatically adds createdAt and updatedAt fields
});

// Export the model for use in other parts of the app
module.exports = mongoose.model('DistributedList', DistributedListSchema);

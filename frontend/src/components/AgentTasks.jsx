import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AgentTasks = () => {
  const { agentId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/distributedLists/agent/${agentId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setTasks(res.data.tasks);
        setAgent(res.data.agent);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [agentId]);

  if (loading) return <div>Loading...</div>;
  if (!tasks.length) return <div>No tasks found for this agent.</div>;

  return (
    <div>
      <h2>Tasks for {agent?.name}</h2>
      <p>Mobile: {agent?.mobile}</p>
      <ul>
        {tasks.map((task, i) => (
          <li key={i}><strong>{task.task}</strong></li>
        ))}
      </ul>
    </div>
  );
};

export default AgentTasks;

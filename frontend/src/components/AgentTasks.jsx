import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './AgentTasks.css';

const AgentTasks = () => {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const [agent, setAgent] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAgentTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/distributedLists/agent/${agentId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAgent(res.data.agent);
        setTasks(res.data.tasks);
      } catch (err) {
        setError('Failed to fetch tasks for this agent');
      } finally {
        setLoading(false);
      }
    };

    fetchAgentTasks();
  }, [agentId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!agent) return <div>No agent data found.</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="grid-overlay"></div>
      </div>

      <div className="navbar">
        <div className="brand">
          <div className="brand-logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
              <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
            </svg>
          </div>
          <span className="brand-text">Agent Manager</span>
        </div>

        <div className="user-menu">
          <div className="user-avatar">
            <span>U</span>
          </div>
          <div className="user-info">
            <span className="user-name">User</span>
            <span className="user-role">Admin</span>
          </div>
        </div>
      </div>

      <div className="dashboard-main">
        <button
          className="back-button"
          onClick={() => navigate(-1)}
          aria-label="Go Back"
        >
          ← Back
        </button>

        <h2>Tasks for {agent.name}</h2>
        <p className="mobile">
          <strong>Mobile:</strong>{' '}
          <a href={`tel:${agent.mobile}`}>
            {agent.mobile}
          </a>
        </p>
        <ul className="task-list">
          {tasks.length === 0 ? (
            <li className="empty">No tasks assigned.</li>
          ) : (
            tasks.map((task, index) => (
              <li key={index} className="task-item">
                {task.task || 'No task info'}
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="dashboard-footer">
        <p>© 2025 Agent Manager. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AgentTasks;
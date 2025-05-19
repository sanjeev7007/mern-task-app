import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AgentList.css';

function AgentList() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/agents', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAgents(res.data);
      } catch (err) {
        console.error('Failed to fetch agents:', err);
      }
    };

    fetchAgents();
  }, []);

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
        <h1 className="dashboard-title">Agent List</h1>
        <div className="table-wrapper">
          <table className="agent-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Tasks</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent._id}>
                  <td>{agent.name}</td>
                  <td>{agent.email}</td>
                  <td>{agent.mobile}</td>
                  <td>
                    <Link to={`/agent-tasks/${agent._id}`} className="task-link">
                      View Tasks
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="dashboard-footer">
        <p>© 2025 Agent Manager. All rights reserved.</p>
      </div>
    </div>
  );
}

export default AgentList;
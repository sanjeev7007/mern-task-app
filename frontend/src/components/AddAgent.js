import React, { useState } from 'react';
import axios from 'axios';
import './AddAgent.css';

function AddAgent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/agents', formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      alert('Agent added successfully!');
    } catch (err) {
      console.error(err);
      alert('Error adding agent');
    }
  };

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
        <h1 className="dashboard-title">Add New Agent</h1>

        <div className="form-card fade-in">
          <form className="add-agent-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Add Agent</h2>
            <input
              className="form-input"
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
            />
            <input
              className="form-input"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              className="form-input"
              type="text"
              name="mobile"
              placeholder="Mobile with country code"
              onChange={handleChange}
              required
            />
            <input
              className="form-input"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <button className="btn btn-primary" type="submit">
              Add Agent
            </button>
          </form>
        </div>
      </div>

      <div className="dashboard-footer">
        <p>© 2025 Agent Manager. All rights reserved.</p>
      </div>
    </div>
  );
}

export default AddAgent;
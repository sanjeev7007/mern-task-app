import React, { useState } from 'react';
import axios from 'axios';
import './AddAgent.css'; // Updated CSS file

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
      setFormData({ name: '', email: '', mobile: '', password: '' });
    } catch (err) {
      console.error(err);
      alert('Error adding agent');
    }
  };

  return (
    <div className="add-agent-container">
      <nav className="navbar">
        <div className="nav-logo">MyApp</div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/add-agent" className="active">Add Agent</a></li>
        </ul>
      </nav>

      <form className="add-agent-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Add Agent</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile with country code"
          value={formData.mobile}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="form-input"
        />
        <button type="submit" className="submit-btn">Add Agent</button>
      </form>
    </div>
  );
}

export default AddAgent; 
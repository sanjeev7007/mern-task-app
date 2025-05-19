import React, { useState } from 'react';
import axios from 'axios';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'admin', // defaulting to admin for now
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/', formData);
      setMessage('Admin created successfully! You can now login.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Signup failed.');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Create Admin Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: '100%', margin: '8px 0', padding: '8px' }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ width: '100%', margin: '8px 0', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '10px 15px' }}>Sign Up</button>
      </form>
      {message && <p style={{ marginTop: '10px' }}>{message}</p>}
    </div>
  );
};

export default SignupPage;

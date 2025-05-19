import React, { useState } from 'react';
import axios from 'axios';
import './CSVUploader.css';

const CsvUploader = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  // const [activeTab, setActiveTab] = useState('upload');

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first');
      return;
    }
    
    setUploading(true);
    setMessage('');
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMessage(res.data.message);
      setFile(null);
      // Reset file input by clearing its value
      document.getElementById('file-input').value = '';
    } catch (err) {
      setMessage(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && !selectedFile.name.endsWith('.csv')) {
      setMessage('Please select a valid CSV file');
      e.target.value = '';
      return;
    }
    setFile(selectedFile);
    setMessage('');
  };

  return (
    <div className="dashboard-container">
      {/* Background Elements */}
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
          <span className="brand-text">CSV Manager</span>
        </div>
        
        <ul className="nav-links">
         {/* <li><a href="#" className={activeTab === 'upload' ? 'active' : ''} onClick={() => setActiveTab('upload')}>Upload</a></li>
          <li><a href="#" className={activeTab === 'history' ? 'active' : ''} onClick={() => setActiveTab('history')}>History</a></li>
          <li><a href="#" className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>Settings</a></li>*/}
        </ul>
        
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
        <h1 className="dashboard-title">CSV Data Management</h1>
        
        <div className="form-card fade-in">
          <div className="form-title">Upload CSV File</div>
          <div className="form-group">
            <label htmlFor="file-input" className="form-label">Select CSV File</label>
            <div className="file-upload-wrapper">
              <input
                id="file-input"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="form-input file-input"
              />
              <div className="file-upload-info">
                {file ? (
                  <span className="file-name">{file.name}</span>
                ) : (
                  <span className="file-placeholder">No file selected</span>
                )}
              </div>
            </div>
            <p className="form-hint">Only CSV files are accepted. Max size: 10MB</p>
          </div>
          
          <div className="form-actions">
            <button 
              onClick={handleUpload} 
              className={`btn btn-primary ${uploading ? 'uploading' : ''}`}
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <span className="spinner"></span>
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <span>Upload CSV</span>
                </>
              )}
            </button>
          </div>
          
          {message && (
            <div className={`message-container ${message.includes('failed') ? 'error' : 'success'}`}>
              <div className="message-icon">
                {message.includes('failed') ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                )}
              </div>
              <p className="message-text">{message}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="dashboard-footer">
        <p>© 2025 CSV Manager. All rights reserved.</p>
      </div>
    </div>
  );
};

export default CsvUploader;
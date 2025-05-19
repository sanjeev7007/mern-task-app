import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddAgent from './components/AddAgent';
import CSVUploader from './components/CSVUploader';
//import Agents from './components/Agents'; 
import AgentList from './components/AgentList';
import SignupPage from './components/SignupPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-agent" element={<AddAgent />} />
        <Route path="/upload-csv" element={<CSVUploader />} />
        <Route path="/agents" element={<AgentList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;

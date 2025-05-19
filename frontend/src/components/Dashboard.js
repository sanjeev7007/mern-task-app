import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Dashboard.css';

// Icons component - Custom SVG icons
const Icons = {
  Home: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Users: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Upload: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  List: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  ),
  Dashboard: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  Settings: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  ChevronLeft: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Bell: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  ChevronDown: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  Edit: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  Trash: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  PlusCircle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  ),
  FileUpload: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="12" y1="18" x2="12" y2="12" />
      <line x1="9" y1="15" x2="15" y2="15" />
    </svg>
  ),
  ViewList: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 6h13" />
      <path d="M8 12h13" />
      <path d="M8 18h13" />
      <path d="M3 6h.01" />
      <path d="M3 12h.01" />
      <path d="M3 18h.01" />
    </svg>
  ),
  TrendUp: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  TrendDown: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  ),
  ChevronRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
};

// Mock data for stats and agents (moved outside component)
const mockAgents = [
  { id: 'AG-0012', name: 'John Doe', email: 'john.doe@example.com', status: 'active', date: '2023-05-15' },
  { id: 'AG-0013', name: 'Jane Smith', email: 'jane.smith@example.com', status: 'pending', date: '2023-05-14' },
  { id: 'AG-0014', name: 'Robert Johnson', email: 'robert.johnson@example.com', status: 'active', date: '2023-05-10' },
  { id: 'AG-0015', name: 'Emily Clark', email: 'emily.clark@example.com', status: 'inactive', date: '2023-05-08' },
  { id: 'AG-0016', name: 'Michael Brown', email: 'michael.brown@example.com', status: 'active', date: '2023-05-05' }
];

function Dashboard() {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    // Format current date
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(date.toLocaleDateString('en-US', options));
    
    // Set mock data
    setAgents(mockAgents);
  }, []);

  // Function to get initials from name
  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  // Function to determine avatar background class based on index
  const getAvatarBgClass = (index) => {
    const classes = ['avatar-bg-1', 'avatar-bg-2', 'avatar-bg-3', 'avatar-bg-4', 'avatar-bg-5'];
    return classes[index % classes.length];
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

      {/* Sidebar */}
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="brand">
            <div className="brand-logo">
              <Icons.Dashboard />
            </div>
            <div className="brand-text">Agent Database</div>
          </div>
          <button 
            className="toggle-sidebar" 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label="Toggle Sidebar"
          >
            <Icons.ChevronLeft />
          </button>
        </div>

        <nav>
          <div className="nav-section">
            <div className="nav-section-title">Main Navigation</div>
            <ul className="nav-links">
              <li className="nav-item">
                <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                  <div className="nav-icon"><Icons.Home /></div>
                  <span className="nav-text">Dashboard</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/agents" className={`nav-link ${location.pathname === '/agents' ? 'active' : ''}`}>
                  <div className="nav-icon"><Icons.Users /></div>
                  <span className="nav-text">Agent List</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/add-agent" className={`nav-link ${location.pathname === '/add-agent' ? 'active' : ''}`}>
                  <div className="nav-icon"><Icons.PlusCircle /></div>
                  <span className="nav-text">Add Agent</span>
                  <div className="nav-indicator"></div>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/upload-csv" className={`nav-link ${location.pathname === '/upload-csv' ? 'active' : ''}`}>
                  <div className="nav-icon"><Icons.Upload /></div>
                  <span className="nav-text">Upload CSV</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Settings</div>
            <ul className="nav-links">
              <li className="nav-item">
                <Link to="/settings" className={`nav-link ${location.pathname === '/settings' ? 'active' : ''}`}>
                  <div className="nav-icon"><Icons.Settings /></div>
                  <span className="nav-text">Settings</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Bar */}
        <div className="topbar">
          <div className="topbar-left">
            <h1 className="page-title">Dashboard</h1>
            <div className="breadcrumb">
              <div className="breadcrumb-item">
                <Link to="/">Home</Link>
                <span className="breadcrumb-separator">/</span>
              </div>
              <div className="breadcrumb-item">Dashboard</div>
            </div>
          </div>

          <div className="topbar-right">
            <div className="search-bar">
              <div className="search-icon"><Icons.Search /></div>
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search..." 
              />
            </div>

            <div className="topbar-actions">
              <button className="action-button" aria-label="Notifications">
                <Icons.Bell />
                <div className="notification-badge">3</div>
              </button>

              <div className="user-menu">
                <div className="user-avatar">
                  <span>AD</span>
                </div>
                <div className="user-info">
                  <div className="user-name">Admin</div>
                  <div className="user-role">Administrator</div>
                </div>
                <div className="chevron-icon">
                  <Icons.ChevronDown />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <div className="dashboard-header">
            <h2 className="welcome-message">Welcome to Agent Database</h2>
            <div className="date-display">{currentDate}</div>
          </div>

          {/* Stats Cards */}
          <div className="stats-section">
            <div className="dashboard-grid">
              <div className="dashboard-card">
                <div className="card-header">
                  <h3 className="card-title">Total Agents</h3>
                  <div className="card-icon icon-purple">
                    <Icons.Users />
                  </div>
                </div>
                <div className="card-metric">248</div>
                <div className="card-description">
                  <span className="trend-up">
                    <Icons.TrendUp /> 12%
                  </span>
                  &nbsp;since last month
                </div>
                <div className="card-decoration"></div>
              </div>

              <div className="dashboard-card">
                <div className="card-header">
                  <h3 className="card-title">Active Agents</h3>
                  <div className="card-icon icon-blue">
                    <Icons.Users />
                  </div>
                </div>
                <div className="card-metric">187</div>
                <div className="card-description">
                  <span className="trend-up">
                    <Icons.TrendUp /> 8%
                  </span>
                  &nbsp;since last month
                </div>
                <div className="card-decoration"></div>
              </div>

              <div className="dashboard-card">
                <div className="card-header">
                  <h3 className="card-title">Pending Approval</h3>
                  <div className="card-icon icon-pink">
                    <Icons.Users />
                  </div>
                </div>
                <div className="card-metric">24</div>
                <div className="card-description">
                  <span className="trend-down">
                    <Icons.TrendDown /> 5%
                  </span>
                  &nbsp;since last month
                </div>
                <div className="card-decoration"></div>
              </div>

              <div className="dashboard-card">
                <div className="card-header">
                  <h3 className="card-title">Inactive Agents</h3>
                  <div className="card-icon icon-green">
                    <Icons.Users />
                  </div>
                </div>
                <div className="card-metric">37</div>
                <div className="card-description">
                  <span className="trend-down">
                    <Icons.TrendDown /> 3%
                  </span>
                  &nbsp;since last month
                </div>
                <div className="card-decoration"></div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="actions-section">
            <div className="section-header">
              <h3 className="section-title">Quick Actions</h3>
              <div className="section-actions">
                <Link to="/settings" className="section-link">
                  All Actions <Icons.ChevronRight />
                </Link>
              </div>
            </div>

            <div className="button-group">
              <Link to="/add-agent" className="dashboard-button">
                <div className="button-icon">
                  <Icons.PlusCircle />
                </div>
                <div className="button-content">
                  <div className="button-title">Add New Agent</div>
                  <div className="button-description">Create a new agent profile</div>
                </div>
              </Link>

              <Link to="/upload-csv" className="dashboard-button">
                <div className="button-icon">
                  <Icons.FileUpload />
                </div>
                <div className="button-content">
                  <div className="button-title">Upload CSV</div>
                  <div className="button-description">Import agents from CSV file</div>
                </div>
              </Link>

              <Link to="/agents" className="dashboard-button">
                <div className="button-icon">
                  <Icons.ViewList />
                </div>
                <div className="button-content">
                  <div className="button-title">View Agent List</div>
                  <div className="button-description">See all registered agents</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Recent Agents */}
          <div className="recent-agents">
            <div className="section-header">
              <h3 className="section-title">Recent Agents</h3>
              <div className="section-actions">
                <Link to="/agents" className="section-link">
                  View All <Icons.ChevronRight />
                </Link>
              </div>
            </div>

            <div className="agent-list">
              <div className="list-header">
                <div className="header-cell">Agent</div>
                <div className="header-cell">ID</div>
                <div className="header-cell">Status</div>
                <div className="header-cell">Date Added</div>
                <div className="header-cell">Actions</div>
              </div>

              {agents.map((agent, index) => (
                <div className="agent-item" key={agent.id}>
                  <div className="agent-info">
                    <div className={`agent-avatar ${getAvatarBgClass(index)}`}>
                      {getInitials(agent.name)}
                    </div>
                    <div className="agent-details">
                      <div className="agent-name">{agent.name}</div>
                      <div className="agent-email">{agent.email}</div>
                    </div>
                  </div>
                  <div className="agent-id">{agent.id}</div>
                  <div className="agent-status">
                    <span className={`status-badge status-${agent.status}`}>
                      {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                    </span>
                  </div>
                  <div className="agent-date">{new Date(agent.date).toLocaleDateString()}</div>
                  <div className="agent-actions">
                    <button className="agent-action" aria-label="Edit">
                      <Icons.Edit />
                    </button>
                    <button className="agent-action" aria-label="Delete">
                      <Icons.Trash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pagination">
              <div className="pagination-info">
                Showing 1 to 5 of 248 entries
              </div>
              <div className="pagination-controls">
                <button className="pagination-button" disabled>
                  <Icons.ChevronLeft />
                </button>
                <button className="pagination-button active">1</button>
                <button className="pagination-button">2</button>
                <button className="pagination-button">3</button>
                <button className="pagination-button">4</button>
                <button className="pagination-button">5</button>
                <button className="pagination-button">
                  <Icons.ChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="dashboard-footer">
          &copy; {new Date().getFullYear()} Agent Database. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default Dashboard;
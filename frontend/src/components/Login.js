import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  const particlesRef = useRef(null);
  const navigate = useNavigate();

  // Initialize particles and text glowing effect
  useEffect(() => {
    setMounted(true);

    const particlesTimer = setTimeout(() => {
      createParticles();
    }, 1000);

    const textTimer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2000);

    return () => {
      clearTimeout(particlesTimer);
      clearTimeout(textTimer);
      setMounted(false);
    };
  }, []);

  const createParticles = () => {
    if (!particlesRef.current) return;

    const container = particlesRef.current;
    container.innerHTML = '';

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';

      const size = Math.random() * 10 + 5;
      const posX = Math.random() * window.innerWidth;
      const posY = Math.random() * window.innerHeight;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      const opacity = Math.random() * 0.5 + 0.3;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}px`;
      particle.style.top = `${posY}px`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.opacity = opacity;

      container.appendChild(particle);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setIsTyping(true);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);

      setTimeout(() => {
        setIsLoading(false);
        document.querySelector('.login-card').classList.add('success');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }, 1500);
    } catch (err) {
      setIsLoading(false);
      setIsTyping(false);
      setErrorMessage(err.response?.data?.message || 'Login failed. Please check your credentials.');

      const form = document.querySelector('.login-form');
      form.classList.add('shake');
      setTimeout(() => form.classList.remove('shake'), 600);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputFocus = () => {
    document.querySelector('.login-card').classList.add('focus-active');
  };

  const handleInputBlur = () => {
    document.querySelector('.login-card').classList.remove('focus-active');
    setIsTyping(false);
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setIsTyping(true);
  };

  return (
    <div className="login-container">
      <div className="animated-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div ref={particlesRef} className="particles-container"></div>
        <div className="grid-overlay"></div>
      </div>

      <div className="login-wrapper">
        <nav className="navigation-bar">
          <div className="nav-logo">
            <span className="logo-text">Admin</span>
            <span className="logo-accent">Portal</span>
            <div className="logo-glow"></div>
          </div>
          <div className="nav-links">
            {/*<a href="" className="nav-link">Home</a>
            <a href="#" className="nav-link active">Login</a>
            <a href="#" className="nav-link">Help</a>*/}
          </div>
        </nav>

        <div className="login-content">
          <div className={`login-card ${mounted ? 'appear' : ''} ${animationComplete ? 'text-glow' : ''}`}>
            <div className="cyber-lines"></div>
            <div className="login-header">
              <h1 className="login-title">
                <span className="glowing-text">Welcome Back</span>
                <div className="title-underline"></div>
              </h1>
              <p className="login-subtitle">Enter your credentials to access your account</p>
            </div>

            <form className="login-form" onSubmit={handleLogin}>
              {errorMessage && (
                <div className="error-message">
                  <svg className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email" className="input-label">Email Address</label>
                <div className={`input-container ${isTyping ? 'typing' : ''}`}>
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <input
                    id="email"
                    type="email"
                    className="input-field"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={handleInputChange(setEmail)}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    required
                    autoComplete="username"
                  />
                  <div className="input-glow"></div>
                  <div className="input-pulse"></div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="input-label">Password</label>
                <div className={`input-container ${isTyping ? 'typing' : ''}`}>
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0110 0v4"></path>
                  </svg>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="input-field"
                    placeholder="••••••••"
                    value={password}
                    onChange={handleInputChange(setPassword)}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    required
                    autoComplete="current-password"
                  />
                  <div className="input-glow"></div>
                  <div className="input-pulse"></div>
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg className="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg className="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <div className="remember-me">
                  <input type="checkbox" id="remember" className="remember-checkbox" />
                  <label htmlFor="remember" className="remember-label">Remember me</label>
                </div>
                <a href="/" className="forgot-password">Forgot password?</a>
              </div>

              <button
                type="submit"
                className={`login-button ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                <span className="button-glow"></span>
                {isLoading ? (
                  <span className="button-content">
                    <span className="spinner"></span>
                    <span className="button-text">Signing In...</span>
                  </span>
                ) : (
                  <span className="button-content">
                    <svg className="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"></path>
                      <polyline points="10 17 15 12 10 7"></polyline>
                      <line x1="15" y1="12" x2="3" y2="12"></line>
                    </svg>
                    <span className="button-text">Sign In</span>
                  </span>
                )}
              </button>
            </form>

            <div className="signup-option">
              <span>Don't have an account?</span>
              <Link to="/signup" className="signup-link">Sign up</Link>
            </div>

            <div className="corner-accents">
              <div className="corner top-left"></div>
              <div className="corner top-right"></div>
              <div className="corner bottom-left"></div>
              <div className="corner bottom-right"></div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <p className="copyright">© 2025 Admin Portal. All rights reserved.</p>
          <div className="footer-links">
            <a href="/" className="footer-link">Privacy Policy</a>
            <a href="/" className="footer-link">Terms of Service</a>
            <a href="/" className="footer-link">Contact</a>
          </div>
        </div>
        <div className="footer-glow"></div>
      </footer>
    </div>
  );
}

export default Login;

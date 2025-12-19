import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './SignIn.css';

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        login(data.user, data.token);
        navigate('/');
      } else {
        alert(data.message || 'Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleGoogleSignIn = () => {
    const userData = {
      firstName: 'Google',
      lastName: 'User',
      email: 'user@gmail.com'
    };
    login(userData);
    alert('Signing in with Google...');
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const handleFacebookSignIn = () => {
    const userData = {
      firstName: 'Facebook',
      lastName: 'User',
      email: 'user@facebook.com'
    };
    login(userData);
    alert('Signing in with Facebook...');
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        <div className="signin-card">
          <div className="signin-header">
            <h1 className="brand-name gradient-text">Aura Pop Beauty</h1>
            <h2>Welcome Back</h2>
            <p>Sign in to your account to continue your beauty journey</p>
          </div>

          <form onSubmit={handleSubmit} className="signin-form">
            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="btn btn-primary signin-btn">
              Sign In
            </button>
          </form>

          <div className="signin-divider">
            <span>or</span>
          </div>

          <div className="social-signin">
            <button className="btn btn-social google-btn" onClick={handleGoogleSignIn}>
              Continue with Google
            </button>
            <button className="btn btn-social facebook-btn" onClick={handleFacebookSignIn}>
              Continue with Facebook
            </button>
          </div>

          <div className="signin-footer">
            <p>
              Don't have an account? 
              <Link to="/signup" className="signup-link"> Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
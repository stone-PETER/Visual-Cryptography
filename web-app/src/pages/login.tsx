import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate authentication
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('authToken', 'your-token');
      navigate('/user'); // Redirect to dashboard after login
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} id="loginForm"> 
        <div>
          <label>Username:</label>
          <input
            type="text"
            className="input-group"
            id="username"
            placeholder="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            className="input-group"
            type="password"
            id="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-btn">Login</button>
      </form>
      <a href="/register" className="signup-link">Don't have an account? Sign Up</a>
    </div>
  );
};

export default Login;

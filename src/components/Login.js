import React, { useState } from 'react';
import { setUsername } from '../utils/localStorage';
import '../styles/App.css';

const Login = ({ onLogin }) => {
  const [username, setUser] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Username is required');
      return;
    }
    setUsername(username.trim());
    onLogin(username.trim());
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div style={{ marginBottom: 16 }}>
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="User Icon" width="64" height="64" />
      </div>
      <div style={{ marginBottom: 12, color: '#1976d2', fontWeight: 500 }}>
        Personal Task Tracker
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={e => { setUser(e.target.value); setError(''); }}
        />
        <button type="submit">Login</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Login; 
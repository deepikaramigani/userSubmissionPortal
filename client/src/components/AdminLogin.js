// src/components/Home.js
// components/AdminLogin.js
import React, { useState } from 'react';
import axios from 'axios';
import { redirect } from 'react-router-dom';
import "./style.css";

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting:', username, password);  // Add this line

    const response= await fetch('http://localhost:5000/admin/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: 'admin',
            password: 'password'
        }),
    })
      console.log(response.data.success);
      if (response.data.success) {
        redirect('/dashboard');
        console.log(response.data.message)// Redirect to the dashboard if login is successful
      }
    } catch (err) {
      setError('Invalid login credentials');
    }
  };

  return (
    <div className="login-form">
      <h2>Admin Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <label>UserName : </label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="input-style"
        />
        <label>Password : </label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input-style"
        />
        <button type="submit" className='button'>Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;


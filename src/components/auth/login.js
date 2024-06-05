import React, { useState } from 'react';
import AuthService from '../../services/authservice';

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogIn = async () => {
    try {
      await AuthService.login(username, password);
      alert('Login successful');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div>
      <h2>Log In</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogIn}>Log In</button>
    </div>
  );
};

export default LogIn;

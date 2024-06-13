import React, { useState } from 'react';
import AuthService from '.././services/AuthService';

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
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogIn}>Log In</button>
    </div>
  );
};

export default LogIn;

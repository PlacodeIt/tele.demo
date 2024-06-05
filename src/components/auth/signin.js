import React, { useState } from 'react';
import AuthService from '../../services/authservice';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      await AuthService.register(username, password);
      alert('Registration successful');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default SignIn;

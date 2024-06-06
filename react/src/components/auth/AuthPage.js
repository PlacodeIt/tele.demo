import React, { useState } from 'react';
import axios from 'axios';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignUp = async () => {
    try {
      await axios.post('http://localhost:3001/register', { email, username, password });
      alert('Sign up successful');
    } catch (error) {
      alert('Sign up failed');
    }
  };

  const handleLogIn = async () => {
    try {
      await axios.post('http://localhost:3001/login', { username, password });
      alert('Login successful');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div>
      <h2>{isSignUp ? 'Sign Up' : 'Log In'}</h2>
      {isSignUp && (
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      )}
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
      {!isSignUp && (
        <>
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
          </label>
          <button onClick={handleLogIn}>Log In</button>
          <p>
            Forgot my password | <span onClick={() => setIsSignUp(true)} style={{ cursor: 'pointer', color: 'blue' }}>Sign Up</span>
          </p>
        </>
      )}
      {isSignUp && (
        <>
          <button onClick={handleSignUp}>Sign Up</button>
          <p>
            Already have an account? <span onClick={() => setIsSignUp(false)} style={{ cursor: 'pointer', color: 'blue' }}>Log In</span>
          </p>
        </>
      )}
    </div>
  );
};

export default AuthPage;

import React, { useState } from 'react';
import AuthService from '.././services/AuthService';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    try {
      await AuthService.login(username, password);
      alert('Login successful');
      // Redirect to another page or handle successful login
    } catch (error) {
      alert('Login failed');
    }
  };

  const handleSignUp = async () => {
    try {
      await AuthService.register(username, password);
      alert('Sign up successful');
      // Redirect to another page or handle successful sign up
    } catch (error) {
      alert('Sign up failed');
    }
  };

  return (
    <div>
      <h2>{isSignUp ? 'Sign Up' : 'Log In'}</h2>
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
          <button onClick={handleLogin}>Log In</button>
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

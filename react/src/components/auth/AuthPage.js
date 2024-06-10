import React, { useState } from 'react';
import axios from 'axios';
import './AuthPage.css';
import { Button, TextField, Checkbox, FormControlLabel, Typography, Container, CssBaseline, Link, Grid } from '@material-ui/core';

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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="auth-container">
        <Typography component="h1" variant="h5" className="auth-title">
          {isSignUp ? 'Sign Up' : 'Log In'}
        </Typography>
        {isSignUp && (
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
          />
        )}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="auth-input"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />
        {!isSignUp && (
          <>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogIn}
              className="auth-button"
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={() => setIsSignUp(true)} className="auth-link">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </>
        )}
        {isSignUp && (
          <>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSignUp}
              className="auth-button"
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2" onClick={() => setIsSignUp(false)} className="auth-link">
                  {"Already have an account? Log In"}
                </Link>
              </Grid>
            </Grid>
          </>
        )}
      </div>
    </Container>
  );
};

export default AuthPage;

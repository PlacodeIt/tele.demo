import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';
import { TextField, Checkbox, FormControlLabel, Typography, Container, CssBaseline, Link, Grid } from '@mui/material';
import { TDButton } from '../design/TDButton.tsx';

const AuthPage = () => {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogIn = async () => {
    console.log('Login attempt with credential:', credential);
    try {
      setIsLoading(true);
      await axios.post('http://localhost:3001/api/auth/login', { credential, password });
      navigate('/main'); 
    } catch (error) {
      alert(error.response ? error.response.data : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="auth-container">
        <Typography component="h1" variant="h5" className="auth-title">
          Welcome to tele
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="credential"
          label="Email or username"
          name="credential"
          autoComplete="credential"
          autoFocus
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
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
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
          label="Remember me next time!"
        />
        <TDButton text="Log In" onPress={handleLogIn} isLoading={isLoading} />
        <Grid container>
          <Grid item xs>
            <Link href="/forgot-password" variant="body2" className="auth-link">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/signup" variant="body2" className="auth-link">
              {"Don't have an account? Sign Up!"}
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default AuthPage;

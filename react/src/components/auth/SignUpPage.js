import React, { useState } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';
import { Container, CssBaseline, Typography, TextField, Grid, Link } from '@mui/material';
import { TDButton } from '../design/TDButton.tsx';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      await AuthService.register({ email, username, password });
      alert('Sign up successful, please check your email for the verification code');
      navigate('/main');
    } catch (error) {
      alert(error.response ? error.response.data : 'Sign up failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="auth-container">
        <Typography component="h1" variant="h5" className="auth-title">
          Sign Up
        </Typography>
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
        <TDButton text="Sign Up" onPress={handleSignUp} isLoading={isLoading} />
        <Grid container>
          <Grid item>
            <Link href="/login" variant="body2" className="auth-link">
              {"Already have an account? Log In!"}
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default SignUpPage;

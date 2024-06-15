import React, { useState } from 'react';
import AuthService from '../services/AuthService';
import './AuthPage.css';
import { Container, CssBaseline, Typography, TextField, Grid, Link } from '@mui/material';
import { TDButton } from '../design/TDButton.tsx';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async () => {
    setIsLoading(true);
    try {
      await AuthService.forgotPassword(email);
      alert('Verification code sent to your email');
    } catch (error) {
      alert('Error sending verification code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="auth-container">
        <Typography component="h1" variant="h5" className="auth-title">
          Forgot Password
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
        <TDButton text="Send Verification Code" onPress={handleForgotPassword} isLoading={isLoading} />
        <Grid container>
          <Grid item>
            <Link href="/login" variant="body2" className="auth-link">
              {"Remembered your password? Log In!"}
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default ForgotPasswordPage;

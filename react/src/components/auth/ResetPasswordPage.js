import React, { useState } from 'react';
import AuthService from '../services/AuthService';
import './AuthPage.css';
import { Container, CssBaseline, Typography, TextField, Grid, Link } from '@mui/material';
import { TDButton } from '../design/TDButton.tsx';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    setIsLoading(true);
    try {
      await AuthService.resetPassword(email, verificationCode, newPassword);
      alert('Password reset successful');
    } catch (error) {
      alert('Error resetting password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="auth-container">
        <Typography component="h1" variant="h5" className="auth-title">
          Reset Password
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
          id="verificationCode"
          label="Verification Code"
          name="verificationCode"
          autoComplete="verification-code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          className="auth-input"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="newPassword"
          label="New Password"
          type="password"
          id="newPassword"
          autoComplete="current-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="auth-input"
        />
        <TDButton text="Reset Password" onPress={handleResetPassword} isLoading={isLoading} />
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

export default ResetPasswordPage;

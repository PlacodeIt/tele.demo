import React from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';

const MainScreen = () => {
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className="main-container">
        <Typography component="h1" variant="h5">
          Welcome to the Main Screen
        </Typography>
        {}
      </div>
    </Container>
  );
};

export default MainScreen;

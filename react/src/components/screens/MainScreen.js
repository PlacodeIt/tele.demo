import React from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import { NavBar } from '../design/NavBar.tsx'
const MainScreen = () => {
  return (
    <>
      <NavBar />
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className="main-container">
          <Typography component="h1" variant="h5">
            Welcome to the Main Screen
          </Typography>
          {/* Additional content here */}
        </div>
      </Container>
    </>
  );
};

export default MainScreen;

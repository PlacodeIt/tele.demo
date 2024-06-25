import React from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import { NavBar } from '../design/NavBar.tsx'
import {channelTable}


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
          {/* more content */}
        </div>
      </Container>
    </>
  );
};

export default MainScreen;

import React from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import { NavBar } from '../design/NavBar.tsx'
import './MainScreen.css';
import SideBar from '../design/SideBar.tsx';

const MainScreen = () => {
  return (
    <>
      <NavBar />
      <SideBar />
      <Container component="main" maxWidth="md" style={{marginLeft:'250px'}}>
        <CssBaseline />
        <div className="main-container" maxWidth="md">
          <Typography component="h1" variant="h5">
            Welcome to the Main Screen
          </Typography>
          <div>
          <></>
          
        </div>
        </div>
      </Container>
    </>
  );
};

export default MainScreen;

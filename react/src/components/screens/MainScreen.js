import React from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import { NavBar } from '../design/NavBar.tsx'
import { TableChannels} from '../design/TableChannels.tsx'
import './MainScreen.css';
import SideBar from '../design/SideBar.tsx';

const MainScreen = () => {
  return (
    <>
      <NavBar />
      <SideBar />
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className="main-container" maxWidth="md">
          <Typography component="h1" variant="h5">
            Welcome to the Main Screen
          </Typography>
          <div>
          <></>
          <TableChannels />
        </div>
        </div>
      </Container>
    </>
  );
};

export default MainScreen;

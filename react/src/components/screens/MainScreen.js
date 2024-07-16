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
            "Randomness is the crucial feature of terrorist activity. If one wishes fear to spread and intensify over time, it is not desirable to kill specific people identified in some particular way with a regime, a party, or a policy. 
            Death must come by chance to individual Frenchmen, or Germans, to Irish Protestants, or Jews, simply because they are Frenchmen or Germans, Protestants or Jews, until they feel themselves fatally exposed and demand that their governments negotiate for their safety." - Michael Walzer
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

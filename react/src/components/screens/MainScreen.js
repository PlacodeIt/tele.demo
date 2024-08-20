import React from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import { NavBar } from '../design/NavBar.tsx';
import './MainScreen.css';
import SideBar from '../design/SideBar.tsx';

const MainScreen = () => {
  return (
    <>
      <NavBar />
      <SideBar />
      <Container component="main" maxWidth="md" style={{ marginLeft: '250px' }}>
        <CssBaseline />
        <div className="main-container" maxWidth="md">
          <Typography component="h1" variant="h5" className="main-container">
           Michael Walzer in his book "Just and Unjust Wars" about terrorism:
           <br />
           <br />
           "Randomness is the crucial feature of terrorist activity. If one wishes fear to spread and intensify over time, it is not desirable to kill specific people identified in some particular way with a regime, a party, or a policy. 
           <br />
            Death must come by chance to individual Frenchmen, or Germans, to Irish Protestants, or Jews, simply because they are Frenchmen or Germans, Protestants or Jews, until they feel themselves fatally exposed and demand that their governments negotiate for their safety."
            <br />
            <br />
            Our goal is to try to make randomness, less random in order to increase the sense of security.
            <br />
            <br />
            Authors: Avi Revach, Einat shealtiel, Itay Sharabi, Michael Ezra, Liron Arusi.
          </Typography>
        </div>
      </Container>
    </>
  );
};

export default MainScreen;

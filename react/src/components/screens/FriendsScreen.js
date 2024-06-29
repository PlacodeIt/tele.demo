import React from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import { NavBar } from '../design/NavBar.tsx'
import SideBar from '../design/SideBar.tsx';
import './FriendsScreen.css'
const FriendsScreen = () => {
    return(
        <>
        <NavBar />
        <SideBar />
        <Container component="friends" maxWidth="md">
        <CssBaseline />
        <div className="friends-container" maxWidth="md">
        <Typography component="h1" variant="h5">
        welcome to your SearchScreen
        </Typography>
        <div>
        <></>
        </div>
        </div>
        </Container>
        </>
    )
}

export default FriendsScreen;
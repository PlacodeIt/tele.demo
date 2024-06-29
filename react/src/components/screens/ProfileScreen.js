import React from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import { NavBar } from '../design/NavBar.tsx'
import SideBar from '../design/SideBar.tsx';
import './ProfileScreen.css'

const ProfileScreen = () => {
    return(
        <>
        <NavBar />
        <SideBar />
        <Container component="profile" maxWidth="md">
        <CssBaseline />
        <div className="profile-container" maxWidth="md">
        <Typography component="h1" variant="h5">
        welcome to your profile
        </Typography>
        <div>
        <></>
        </div>
        </div>
        </Container>
        </>
    )
}
export default ProfileScreen;
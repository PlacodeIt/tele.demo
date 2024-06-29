import React from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import { NavBar } from '../design/NavBar.tsx'
import SideBar from '../design/SideBar.tsx';
import './AccountScreen.css'

const AccountScreen = () => {
    return(
        <>
        <NavBar />
        <SideBar />
        <Container component="account" maxWidth="md">
        <CssBaseline />
        <div className="account-container" maxWidth="md">
        <Typography component="h1" variant="h5">
        welcome to your AccountScreen
        </Typography>
        <div>
        <></>
        </div>
        </div>
        </Container>
        </>
    )
}
export default AccountScreen;
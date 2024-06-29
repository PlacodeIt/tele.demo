import React from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import { NavBar } from '../design/NavBar.tsx';
import SideBar from '../design/SideBar.tsx';
import './LastSeenScreen.css';

const LastSeenScreen = () => {
    return (
        <>
            <NavBar />
            <SideBar />
            <Container component="last-seen" maxWidth="md">
                <CssBaseline />
                <div className="lastseen-container">
                    <Typography component="h1" variant="h5">
                        Last Seen
                    </Typography>
                    <div>
                        <></>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default LastSeenScreen;

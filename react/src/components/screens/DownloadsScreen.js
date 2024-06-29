import React from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import { NavBar } from '../design/NavBar.tsx';
import SideBar from '../design/SideBar.tsx';
import './DownloadsScreen.css';

const DownloadsScreen = () => {
    return (
        <>
            <NavBar />
            <SideBar />
            <Container component="downloads" maxWidth="md">
                <CssBaseline />
                <div className="downloads-container">
                    <Typography component="h1" variant="h5">
                        Downloads
                    </Typography>
                    <div>
                        <></>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default DownloadsScreen;

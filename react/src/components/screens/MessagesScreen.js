import React from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import { NavBar } from '../design/NavBar.tsx';
import SideBar from '../design/SideBar.tsx';
import './MessagesScreen.css';

const MessagesScreen = () => {
    return (
        <>
            <NavBar />
            <SideBar />
            <Container component="messages" maxWidth="md">
                <CssBaseline />
                <div className="messages-container">
                    <Typography component="h1" variant="h5">
                        Messages
                    </Typography>
                    <div>
                        <></>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default MessagesScreen;

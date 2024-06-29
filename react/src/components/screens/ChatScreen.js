import React from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import { NavBar } from '../design/NavBar.tsx'
import SideBar from '../design/SideBar.tsx';
import './ChatScreen.css'

const ChatScreen = () => {
    return(
        <>
        <NavBar />
        <SideBar />
        <Container component="chat" maxWidth="md">
        <CssBaseline />
        <div className="chat-container" maxWidth="md">
        <Typography component="h1" variant="h5">
        welcome to your chatScreen
        </Typography>
        <div>
        <></>
        </div>
        </div>
        </Container>
        </>
    )
}

export default ChatScreen;
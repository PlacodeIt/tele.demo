import React from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import { NavBar } from '../design/NavBar.tsx';
import SideBar from '../design/SideBar.tsx';
import './UsersScreen.css';

const UsersScreen = () => {
    return (
        <>
            <NavBar />
            <SideBar />
            <Container component="users" maxWidth="md">
                <CssBaseline />
                <div className="users-container">
                    <Typography component="h1" variant="h5">
                        Users
                    </Typography>
                    <div>
                        <></>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default UsersScreen;

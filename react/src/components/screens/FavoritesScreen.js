import React from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import { NavBar } from '../design/NavBar.tsx';
import SideBar from '../design/SideBar.tsx';
import './FavoritesScreen.css';

const FavoritesScreen = () => {
    return (
        <>
            <NavBar />
            <SideBar />
            <Container component="favorites" maxWidth="md">
                <CssBaseline />
                <div className="favorites-container">
                    <Typography component="h1" variant="h5">
                        Favorites
                    </Typography>
                    <div>
                        <></>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default FavoritesScreen;

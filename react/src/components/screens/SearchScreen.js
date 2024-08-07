import React from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import { NavBar } from '../design/NavBar.tsx'
import SideBar from '../design/SideBar.tsx';
import './SearchScreen.css'
const SearchScreen = () => {
    return(
        <>
        <NavBar />
        <SideBar />
        <Container component="search" maxWidth="md">
        <CssBaseline />
        <div className="search-container" maxWidth="md">
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

export default SearchScreen;
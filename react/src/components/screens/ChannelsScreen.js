import React from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import { NavBar } from '../design/NavBar.tsx';
import SideBar from '../design/SideBar.tsx';
import './ChannelsScreen.css';
import { TableChannels} from '../design/TableChannels.tsx'


const ChannelsScreen = () => {
    return (
        <>
            <NavBar />
            <SideBar />
            <Container component="channels" maxWidth="md">
                <CssBaseline />
                <div className="channels-container">
                    <Typography component="h1" variant="h5">
                         
                    </Typography>
                    <div className="Channel-screen-table" maxWidth="md">
                        <></>
                        <TableChannels />
                    </div>
                </div>
            </Container>
        </>
    );
};

export default ChannelsScreen;

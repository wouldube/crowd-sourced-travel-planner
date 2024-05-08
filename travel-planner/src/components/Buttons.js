import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../UX/curio-logo.png'
import {
    Container, Paper, Grid, Box, Card, CardHeader, CardContent, CardMedia,
    FormControl, FormGroup, FormLabel, TextField, Select, MenuItem,
    Button, ButtonGroup, IconButton, Tooltip, Rating, Divider
} from '@mui/material';

const Buttons = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState(false);

    if (!login) {
        if (localStorage.getItem("id")) {
            setLogin(true);
        }
    }

    const logout = () => {
        localStorage.removeItem("id")
        setLogin(false)
        navigate('/')
    }

    // Components

    const LoginButton = () => (
        <Button onClick={() => navigate('/login')} style={{ height: "7vh", minWidth: "80px" }}>Login</Button>
    )

    const LogoutButton = () => (
        <Button onClick={logout} style={{ height: "7vh", minWidth: "80px" }}>Logout</Button>
    )

    return (
        <Container style={{
            display: "flex", alignItems: "center", flexDirection: "column",
            marginTop: '1%'
        }}>
            <Button onClick={() => navigate('/')}
                style={{
                    background: `url(${logo}) center/cover`,
                    transform: 'scale(1.5)'
                }}>
            </Button>
            {/* <Box style={{ position: "fixed", bottom: "70%", left: "50%", transform: "translate(-50%, -50%)", zIndex: "10"}}> */}
            <ButtonGroup variant="contained" style={{
                borderRadius: "50px", justifyContent: "center", flexWrap: "wrap",
                marginTop: '5%', marginBottom: '-3%'
            }}>
                <Button onClick={() => navigate('/trips')} style={{ height: "7vh", minWidth: "80px" }}>
                    Trips
                </Button>
                <Button onClick={() => navigate('/profile')} style={{ height: "7vh", minWidth: "80px" }}>
                    Profile
                </Button>
                {login ? <LogoutButton /> : <LoginButton />}
                <Button onClick={() => navigate('/search')} style={{ height: "7vh", minWidth: "80px" }}>
                    Search
                </Button>
            </ButtonGroup>
            {/* </Box> */}
        </Container>
    )
}

export default Buttons

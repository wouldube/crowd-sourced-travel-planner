import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Grid, Box, Card, Button, ButtonGroup } from '@mui/material';

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
        <Button onClick={() => navigate('/login')}>Login</Button>
    )

    const LogoutButton = () => (
        <Button onClick={logout}>Logout</Button>
    )

    return (
        <Container>
            <Card onClick={() => navigate('/')} style={{ borderRadius: "100px", width: "20vw" }}>
                <h3>TravelPlanner</h3>
            </Card>
            <ButtonGroup variant="contained">
                    <Button onClick={() => navigate('/trips')}>
                        Trips
                    </Button>
                    <Button onClick={() => navigate('/profile')}>
                        Profile
                    </Button>
                    <Button onClick={() => navigate('/search')}>
                        Search
                    </Button>
                    {login ? <LogoutButton /> : <LoginButton />}
            </ButtonGroup>
            
        </Container>
    )
}

export default Buttons
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Grid, Box, Card, CardContent, Button, ButtonGroup } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'

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
        <Button onClick={() => navigate('/login')} style={{}}>Login</Button>
    )

    const LogoutButton = () => (
        <Button onClick={logout} style={{}}>Logout</Button>
    )

    return (
        <Container>
            <Card onClick={() => navigate('/')} style={{ borderRadius: "100px"}}>
                <h3>Travel<br />
                    Planner</h3>
            </Card>
            {/* <Box style={{ position: "fixed", bottom: "70%", left: "50%", transform: "translate(-50%, -50%)", zIndex: "5"}}> */}
                <ButtonGroup variant="contained">
                    <Button onClick={() => navigate('/trips')}>
                        Trips
                    </Button>
                    <Button onClick={() => navigate('/profile')}>
                        Profile
                    </Button>
                        {login ? <LogoutButton /> : <LoginButton />}
                    <Button onClick={() => navigate('/search')}>
                        Search
                    </Button>
                </ButtonGroup>
            {/* </Box> */}
        </Container>
    )
}

export default Buttons
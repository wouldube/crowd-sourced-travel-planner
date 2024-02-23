import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Grid, Box, Card, Button, ButtonGroup } from '@mui/material';

const Buttons = () => {
    const navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path);
    };

    return (
        <Container>
            <Card onClick={() => navigateTo('/')}>
                <h2>Travel-Planner</h2>
            </Card>

            <ButtonGroup variant="contained">
                <Button variant="contained" onClick={() => navigateTo('/trips')}>
                    Trips
                </Button>
                <Button onClick={() => navigateTo('/login')} className="Button">
                    Login
                </Button>
                <Button onClick={() => navigateTo('/register')} className="Button">
                    Register
                </Button>
                <Button variant="contained" onClick={() => navigateTo('/profile')}>
                    Profile
                </Button>
                <Button variant="contained" onClick={() => navigateTo('/create-exp')}>
                    Add Experience
                </Button>
                <Button variant="contained" onClick={() => navigateTo('/UserExperiences')}>
                    My Experiences
                </Button>
                <Button variant="contained" onClick={() => navigateTo('/favorites')}>
                    Favorites
                </Button>
                <Button variant="contained" onClick={() => navigateTo('/reviews')}>
                    Reviews
                </Button>
                <Button onClick={() => navigateTo('/search')} className="Button">
                    Search
                </Button>
            </ButtonGroup>
        </Container>
    )
}

export default Buttons;

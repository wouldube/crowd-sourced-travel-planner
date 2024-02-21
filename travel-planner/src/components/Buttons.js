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
                <Button variant="contained" onClick={() => navigateTo('/profile')}>
                    Profile
                </Button>
                <Button variant="contained" onClick={() => navigateTo('/create-exp')}>
                    Add Experience
                </Button>
                {/* Add additional buttons here */}
                <Button variant="contained" onClick={() => navigateTo('/UserExperiences')}>
                    My Experiences
                </Button>
                <Button variant="contained" onClick={() => navigateTo('/favorites')}>
                    Favorites
                </Button>
                <Button variant="contained" onClick={() => navigateTo('/ratings')}>
                    Ratings
                </Button>
                {/* ... more buttons as needed */}
            </ButtonGroup>
        </Container>
    )
}

export default Buttons;

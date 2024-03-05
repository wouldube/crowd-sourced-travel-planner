import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Grid, Box, Card, Button, ButtonGroup } from '@mui/material';

const Buttons = () => {
    const navigate = useNavigate();

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
                    </ButtonGroup>
        </Container>
    )
}

export default Buttons
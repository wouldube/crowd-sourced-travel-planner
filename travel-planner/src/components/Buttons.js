import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Grid, Box, Card, CardContent, Button, ButtonGroup } from '@mui/material';

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
        <Button onClick={() => navigate('/login')} style={{ transform: "scale(0.3)" }}>Login</Button>
    )

    const LogoutButton = () => (
        <Button onClick={logout} style={{ transform: "scale(0.3)" }}>Logout</Button>
    )

    return (
        <Box style={{ position: "fixed", top: "7%", left: "50%", transform: "translate(-50%, -50%)", zIndex: "3" }}>
            <Paper style={{borderRadius:"100px", width:"70vw", height:"15vh", transform: "scale(0.5)"}}>
            <Grid container spacing={1} direction="row">
                <Grid item xs={2}>
                    <Button onClick={() => navigate('/trips')} style={{ transform: "scale(0.5)" }}>
                        t
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    {/* {login ? <LogoutButton /> : <LoginButton />} */}
                    <Button onClick={() => navigate('/profile')} style={{ transform: "scale(0.5)" }}>
                        +
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Card onClick={() => navigate('/')} style={{ borderRadius: "100px", width: "20vw", height: "20vh", position:"relative", bottom:"5vh" }}>
                        <Container><br /><h3>Travel<br />
                            Planner</h3>
                            </Container>
                    </Card>
                </Grid>
                <Grid item xs={2}>
                    <Button onClick={() => navigate('/create-exp')} style={{ transform: "scale(0.5)" }}>
                        +
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <Button onClick={() => navigate('/search')} style={{ transform: "scale(0.5)" }}>
                        s
                    </Button>
                </Grid>
            </Grid>
            </Paper>
        </Box>
    )
}

export default Buttons
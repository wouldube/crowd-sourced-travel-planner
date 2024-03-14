import { React, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Container, Paper, Grid, Box, Card, CardHeader, CardContent, CardMedia,
    FormControl, FormGroup, FormLabel, TextField, Select, MenuItem,
    Button, ButtonGroup, IconButton, Tooltip, Rating, Divider } from '@mui/material';

const Profile = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");


    useEffect(() => {

        if (!localStorage.getItem("id")) {
            // localStorage.setItem("path", "/profile")
            navigate("/login")
        }

        const id = localStorage.getItem("id")

        fetch(`http://localhost:5000/user-info/${id}`)
            .then(response => response.json())
            .then(user => {
                setUsername(user.username);
            })

    }, []);

    return (
        <Container>
            <Paper>
                <Container>
                    <Grid container spacing={3}>
                        <Grid item position xs={12}>
                            <Button onClick={() => { navigate("/account") }}>
                                <p>{username}</p>
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Card onClick={() => { navigate("/UserExperiences") }}
                                style={{ height: "30vh",
                                    backgroundImage: `url("../components/ExperiencesMap.png")`
                                }}>
                                My Experiences
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card onClick={() => { navigate("/favorites") }}
                                style={{
                                    height: "25vh",
                                }}>
                                Favorites
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card onClick={() => { navigate("/reviews") }}
                                style={{
                                    height: "25vh",
                                }}>
                                Reviews
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
        </Container>
    )
}

export default Profile
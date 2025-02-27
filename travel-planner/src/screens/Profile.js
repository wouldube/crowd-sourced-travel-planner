import { React, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import {
    Container, Paper, Grid, Box, Card, CardHeader, CardContent, CardMedia,
    FormControl, FormGroup, FormLabel, TextField, Select, MenuItem,
    Button, ButtonGroup, IconButton, Tooltip, Rating, Divider,
    Icon
} from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RateReviewIcon from '@mui/icons-material/RateReview';

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
                        <Grid item xs={12} style={{ display: "flex", alignItems: "center" }}>
                            <Card onClick={() => { navigate("/UserExperiences") }}
                                style={{
                                    height: "30vh",
                                    backgroundImage: `url("../components/ExperiencesMap.png")`
                                }}>
                                <Grid container spacing={15}>
                                    <Grid item xs={12}>
                                        My Experiences
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AddBoxOutlinedIcon style={{ "transform": "scale(3)" }} />
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        <Grid item xs={6} style={{ display: "flex", alignItems: "center", }}>
                            <Card onClick={() => { navigate("/favorites") }}
                                style={{
                                    height: "25vh",
                                }}>
                                <Grid container spacing={15}>
                                    <Grid item xs={12}>
                                        Favorites
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FavoriteIcon style={{ "transform": "scale(3)" }} />
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        <Grid item xs={6} style={{ display: "flex", alignItems: "center", }}>
                            <Card onClick={() => { navigate("/reviews") }}
                                style={{
                                    height: "25vh",
                                }}>
                                <Grid container spacing={15}>
                                    <Grid item xs={12}>
                                        Reviews
                                    </Grid>
                                    <Grid item xs={12}>
                                        <RateReviewIcon style={{ "transform": "scale(3)" }} />
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Paper >
        </Container >
    )
}

export default Profile
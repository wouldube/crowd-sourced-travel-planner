import { React, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Links from '../components/Buttons.js';
import { Container, Paper, Grid, Box, Card, Divider, Chip, Button } from '@mui/material';


const Profile = () => {
    const [login, check] = useState(0);

    const navigate = useNavigate();
    const [username, setUsername] = useState("");


    useEffect(() => {

        if (!localStorage.getItem("id")) {
            // localStorage.setItem("path", "/profile")
            navigate("/login")
        }

        const id = localStorage.getItem("id")
        check(1)

        fetch(`http://localhost:5000/user-info/${id}`)
            .then(response => response.json())
            .then(user => {
                setUsername(user.username);
            })

    }, []);

    return (
        <Container>
            <Paper>
                {/* {login === 0 && (
                        // <div className="loginblur"></div>
                    )}
                    {login === 1 && ( */}
                {/* // <div> */}
                <Grid container justifyContent="center" spacing={1}>
                    <Grid item position xs={12}>
                        <Card onClick={() => { navigate("/account") }}>
                                My Account
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card onClick={() => { navigate("/UserExperiences") }}>
                                My Experiences
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card onClick={() => { navigate("/favorites") }}>
                                Favorites
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card onClick={() => { navigate("/reviews") }}>
                                Reviews
                        </Card>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default Profile
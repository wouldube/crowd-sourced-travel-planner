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
            {/* {login === 0 && (
                    // <div className="loginblur"></div>
                )}
                {login === 1 && ( */}
            {/* // <div> */}
            <Grid container justifyContent="center" spacing={1}>
                <Grid item position xs={3}>
                    <Card onClick={() => { navigate("/account") }}>
                            user
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card onClick={() => { navigate("/UserExperiences") }}>
                            my experiences!
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card onClick={() => { navigate("/favorites") }}>
                            favorites
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card onClick={() => { navigate("/reviews") }}>
                            reviews
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Profile
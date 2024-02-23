import { React, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Links from '../components/Buttons.js';
import { Container, Paper, Grid, Box, Card, Divider, Chip } from '@mui/material';


const Profile = () => {
    const [login, check] = useState(0);
    // const [user, userinfo] = useState(0);

    const navigate = useNavigate();
    const account = () => { navigate('/account'); };
    const UserExperiences = () => { navigate('/UserExperiences'); };
    const favorites = () => { navigate('/favorites'); };
    const ratings = () => { navigate('/ratings'); };

    const [username, setUsername] = useState("");

    // login check & user data
    // const userdata = async() => {
    //     try {
    //     const theuserinfo = await fetch("http://localhost:5000/user-info/:65b57e2b37f5c24ce79c5b6e")
    //     userinfo(theuserinfo)
    //     console.log(user)
    //     check(1)
    //     } catch(error) { console.error('Error fetching data:', error) }
    // }
    // useEffect( () => { userdata() }, []);

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
            <Link to='/account'>
                user
                </Link>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <Divider>
                {/* <Chip label="my experiences!" /> */}
            </Divider>
                            {/* <Chip label="my experiences!" /> */}

                                    <Link to='/UserExperiences'>
                            your experiences!
                        </Link>
                </Grid>
                <Grid item xs={6}>


                    {/* <Card> */}
                        <Link to='/favorites'>
                            favorites
                        </Link>
                    {/* </Card> */}
                    <Divider variant="middle" orientation="vertical" >
                </Divider>
                </Grid>
                <Grid item xs={6}>
                    <Card>
                        <Link to='/ratings'>
                            ratings
                        </Link>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Profile;

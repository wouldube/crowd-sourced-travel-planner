import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Buttons from '../components/Buttons.js';
import {Container, Paper, Grid, Box, Card, Button} from '@mui/material';


const Profile = () => {
    const [login, check] = useState(0);
    const [user, userinfo] = useState(0);
    
    const navigate = useNavigate();
    const account = () => { navigate('/account'); };
    const UserExperiences = () => { navigate('/UserExperiences'); };
    const favorites = () => { navigate('/favorites'); };
    const ratings = () => { navigate('/ratings'); };

    // login check & user data
    const userdata = async() => {
        try {
        const theuserinfo = await fetch("http://localhost:5000/user-info/:65b57e2b37f5c24ce79c5b6e")
        userinfo(theuserinfo)
        console.log(user)
        check(1)
        } catch(error) { console.error('Error fetching data:', error) }
    }
    useEffect( () => { userdata() }, []);

    return (
        <Paper>
                {/* {login === 0 && (
                    // <div className="loginblur"></div>
                )}
                {login === 1 && ( */}
                    {/* // <div> */}
            <Button onClick={account}>
                <p>user</p>
            </Button>
            <Paper>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <Card>
                        <Button onClick={UserExperiences}>
                        <p><b>your experiences!</b></p>
                        </Button>
                    </Card>
                    </Grid>
                    <Grid item xs={6}>
                    <Card>
                        <Button onClick={favorites}>
                        <p>favorites</p>
                        </Button>
                    </Card>
                    </Grid>
                    <Grid item xs={6}>
                    <Card>
                        <Button onClick={ratings}>
                        <p>ratings</p>
                        </Button>
                    </Card>
                    </Grid>
                </Grid>
            </Paper>
        </Paper>
    )
}

export default Profile;

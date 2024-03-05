import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Grid, Box, Card, Button } from '@mui/material'

const ExperienceList = ({setExpId}) => {

    const [experiences, setAllExperiences] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        fetch("http://localhost:5000/experiences")
            .then(response => response.json())
            .then(experiences => setAllExperiences(experiences))
            .catch(error => console.error('Error fetching data:', error));
    }, [])

    const goToExperience = (expId) => {
        setExpId(expId)
        //console.log(expId)
        navigate(`/experience`)
    }

    return (
        <Container>
            <strong>More Experiences to Explore...</strong>
            <Grid container spacing={3}>
                {experiences.slice(-8).map((allexp) => (
                    <Grid item xs={6}>
                    <Card onClick={() => {goToExperience(allexp._id)}}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <img src={allexp.images} style={{maxWidth: "100%" }}/>
                            </Grid>
                            <Grid item xs={16}>
                                <strong>{allexp.title}</strong>
                            </Grid>
                            <Grid item xs={12}>
                                <strong>Location: </strong>{allexp.location.coordinates[0]}, {allexp.location.coordinates[1]}
                            </Grid>
                            <Grid item xs={12}>
                                <strong>Posted By: </strong>{allexp.owner}
                            </Grid>
                            <Grid item xs={12}>
                                <strong>Rating: </strong>{allexp.reviews}
                            </Grid>
                            <Grid item xs={12}>
                                {allexp.description}
                            </Grid>
                        </Grid>
                    </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default ExperienceList;


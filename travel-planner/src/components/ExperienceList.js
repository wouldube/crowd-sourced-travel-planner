import React, { useEffect, useState } from 'react';
import { Container, Paper, Grid, Box, Card, Button } from '@mui/material'

const ExperienceList = () => {

    const [experiences, setAllExperiences] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/experiences")
            .then(response => response.json())
            .then(experiences => setAllExperiences(experiences))
            .catch(error => console.error('Error fetching data:', error));
    }, [])

    return (
        <Container>
            <strong>More Experiences to Explore...</strong>
            <Grid container spacing={3}>
                {experiences.map((allexp) => (
                    <Grid item xs={6}>
                    <Card>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <img src={allexp.image} alt=" "></img>
                            </Grid>
                            <Grid item xs={12}>
                                <strong>{allexp.title}</strong>
                            </Grid>
                            <Grid item xs={12}>
                                {allexp.location.coordinates[0]}, {allexp.location.coordinates[1]}
                            </Grid>
                            <Grid item xs={12}>
                                Posted By: {allexp.owner}
                            </Grid>
                            <Grid item xs={12}>
                                {/* {allexp.reviews} */}
                            </Grid>
                            <Grid item xs={12}>
                                <div className="ratingImage">
                                    <img src="https://media.istockphoto.com/id/1306258842/photo/5-or-five-stars-sign-symbol-on-white-background-illustration-ranking-quality-service-review.jpg?s=612x612&w=0&k=20&c=PLhPtCoPZSUM9FSg9CAmTC_7b4WoHMYdaDHas64kg6M=" alt=" " />
                                </div>
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


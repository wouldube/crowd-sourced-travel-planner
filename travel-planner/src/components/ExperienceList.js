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
        <Paper variant="experiencesGrid">
            <strong>More Experiences to Explore...</strong>
            <Grid container spacing={12}>
                    {experiences.map((allexp, index) => (
                        <Grid item xs={6}>
                            <img src={allexp.image} alt=" "></img>
                            <div className="experiences-title-list"><strong>{allexp.title}</strong></div>
                            <div className="experiences-other-listtext">Location: {allexp.location.coordinates[0]}, {allexp.location.coordinates[1]}</div>
                            <div className="experiences-title-list">Posted By: {allexp.owner}</div>
                            {/* {allexp.reviews} */}
                            <div className="ratingImage">
                                <img src="https://media.istockphoto.com/id/1306258842/photo/5-or-five-stars-sign-symbol-on-white-background-illustration-ranking-quality-service-review.jpg?s=612x612&w=0&k=20&c=PLhPtCoPZSUM9FSg9CAmTC_7b4WoHMYdaDHas64kg6M=" alt=" "></img></div>
                                <br/><div className="experiences-other-listtext">{allexp.description}</div>
                        </Grid>
                    ))};
           </Grid>
         </Paper>
        )
      }

export default ExperienceList;


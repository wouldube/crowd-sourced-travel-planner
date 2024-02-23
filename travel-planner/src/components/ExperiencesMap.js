import React, { Component, useState, useEffect } from 'react';
import { Container, Paper, Grid, Box, Card, Button } from '@mui/material';

const ExperiencesMap = () => {
  const [experiences, setExperiences] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/experiences")
      .then(response => response.json())
      .then(experiences => setExperiences(experiences))
      .catch(error => console.error('Error fetching data:', error));
  }, [])

  return (
    <Container>
        <Grid container spacing={10}>
          {experiences.map((exp, index) => (
            <Grid item sm={4} key={index}>
              <Card variant="experience">
                <h3>{exp.title}</h3>
                <p>{exp.description}</p>
                <p>{exp.location.coordinates[0]}, {exp.location.coordinates[1]}</p>
              </Card>
            </Grid>
          ))}
          <div class="Experience AnExperience">
            <h3>Hoh Rainforest Hike</h3>
            <p>Hike the Hoh Rainforest in Olympic National Park on this mesmerizing trail. The towering trees draped in lush moss
              create a magical and serene trail experience.</p>
            <p>X,Y</p>
          </div>
        </Grid>
    </Container>
  );
}

export default ExperiencesMap;

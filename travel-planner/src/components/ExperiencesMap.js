import React, { Component, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Grid, Box, Card, Button } from '@mui/material';

const ExperiencesMap = ({setExpId}) => {
  const [experiences, setExperiences] = useState([])

  const navigate = useNavigate()

  const goToExperience = (expId) => {
    setExpId(expId)
    console.log(expId)
    navigate(`/experience`)
  }

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
              <Card variant="experience" onClick={() => {goToExperience(exp._id)}}>
                <h3>{exp.title}</h3>
                <p>{exp.description}</p>
                <p>{exp.location.coordinates[0]}, {exp.location.coordinates[1]}</p>
              </Card>
            </Grid>
          ))}
          <div className="Experience AnExperience">
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

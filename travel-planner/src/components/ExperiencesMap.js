import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Grid, Box, Card, Button } from '@mui/material';

const ExperiencesMap = ({ setExpId }) => {
  const [randomizedExperiences, setRandomizedExperiences] = useState([])
  const navigate = useNavigate()

  const getExperiences = async () => {
    try {
      const data = await fetch("http://localhost:5000/experiences")
      const experiences = await data.json()

      let randoms = []
      for (let i = 0; i < 15; i++) {
        let randomnum = Math.floor(Math.random() * (experiences.length - 1))
        randoms.push(experiences[randomnum])
      }
      setRandomizedExperiences(randoms)
    } catch (error) { console.error('Error fetching data:', error) }
  }

  let mappoints = []
  for (let i = 0; i < 15; i++) {
    mappoints.push(Math.floor(Math.random() * 6) + 2)
  }

  const goToExperience = (expId) => {
    setExpId(expId)
    navigate(`/experience`)
  }

  useEffect(() => {
    getExperiences()

  }, [])


  return (
    <Container>
      <h3>Explore the Map of Experiences!</h3>
      <p>roam around & click one</p>
      {randomizedExperiences && (
        <Grid container spacing={1}>
          {randomizedExperiences.map((exp, index) => (
            <Grid item xs={mappoints[index]} key={index}>
              <Card variant="experience" onClick={() => { goToExperience(exp._id) }} style={{
                backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.3), rgba(246, 225, 161, 0.3)), url(${exp.images[0]})`
              }}>
                <Container><h3>{exp.title}</h3></Container>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}

export default ExperiencesMap
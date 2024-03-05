import React, { Component, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Grid, Box, Card, Button } from '@mui/material';

const ExperiencesMap = ({setExpId}) => {
  // const [experiences, setExperiences] = useState([])
  const [randomizedExperiences, setRandomizedExperiences] = useState([])

  const getExperiences = async () => {
    try {
      const data = await fetch("http://localhost:5000/experiences")
      const experiences = await data.json()
      // setExperiences(experiences)
      let indices = []
      for (let i = 0; i < 5; i++) {
        let randomint = Math.floor(Math.random() * (experiences.length - 1))
        indices.push(experiences[randomint])
      }
      setRandomizedExperiences(indices)
    } catch (error) { console.error('Error fetching data:', error) }
  }


  const navigate = useNavigate()

  const goToExperience = (expId) => {
    setExpId(expId)
    console.log(expId)
    navigate(`/experience`)
  }

  useEffect(() => {
    getExperiences()

  }, [])



  return (
    <Container>
      <Grid container spacing={10}>
        {randomizedExperiences.map((exp, index) => (
          <Grid item sm={4} key={index}>
            <Card variant="experience" onClick={() => {goToExperience(exp._id)}} style={{
              backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.3), rgba(246, 225, 161, 0.3)), url(${exp.images[0]})`,
              '&:hover': {
                backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.9), rgba(246, 225, 161, 0.9)), url(${exp.images[0]})`
              }
            }}>
              <h3>{exp.title}</h3>
              {/* // <img src={exp.images[0]}/> */}
              {/* <p>{exp.description}</p> */}
              {/* <p>{exp.location.coordinates[0]}, {exp.location.coordinates[1]}</p> */}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ExperiencesMap;

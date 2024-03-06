import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Grid, Box, Card, Divider, Chip, Button } from '@mui/material';

const Trip = ({ tripObject }) => {
    const [experiences, setExperiences] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const getExperiences = async () => {
            try {
                const data = await fetch(`http://localhost:5000/trip/experiences/${tripObject._id}`)
                const experiences = await data.json()
                setExperiences(experiences)
            } catch (error) { console.error('Error fetching data:', error) }
        }
        getExperiences()
    }, [])

    const deleteTrip = async () => {
        try {
            await fetch(`http://localhost:5000/delete-trip/${tripObject._id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(tripObject)
            })
        } catch (error) { console.error('Error Deleting Trip:', error) }
        navigate(`/trips`)
    }


    return (
        <Container>
                <h3>{tripObject.title}</h3>
                <Button onClick={() => { navigate(`update-trip`) }}>Edit?</Button>
                <Button onClick={() => { deleteTrip() }}>Delete!</Button>
                <Grid container sizing={3}>
                    {experiences.map((exp, index) => (
                        <Grid item key={index} xs={4}>
                            {/* <Card key={index} variant="experience" onClick={() => { goToExperience(exp._id) }}
                                style={{
                                    backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.3), rgba(246, 225, 161, 0.3)), url(${exp.images[0]})`
                                }}>
                                <Container><h3>{exp.title}</h3></Container>
                            </Card> */}
                        </Grid>
                    ))}
                </Grid>
        </Container>
    )
}

export default Trip;
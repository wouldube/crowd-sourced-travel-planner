import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Grid, Box, Card, Divider, Chip, Button } from '@mui/material';

const Trips = ({ setTripObject }) => {
    const [trips, setTrips] = useState([]);

    const getTrips = async (id) => {
        try {
            const data = await fetch(`http://localhost:5000/trips/${id}`)
            const trips = await data.json()
            setTrips(trips)
        } catch (error) { console.error('Error fetching data:', error) }
    }
    useEffect(() => {

        if (!localStorage.getItem("id")) {
            // localStorage.setItem("path", "/trips")
            navigate("/login")
        }

        const id = localStorage.getItem("id")

        getTrips(id)
    }, []);

    /* Navigation */
    const navigate = useNavigate()
    const TripClick = (trip) => {
        setTripObject(trip)
        navigate(`trip`)
    }

    return (
        <Container>
            <Paper>
                <Button onClick={() => { navigate(`create-trip`) }}>Plan A New Trip</Button>
                <Grid container spacing={3}>
                    {trips.map((trip, index) => (
                        <Grid item key={index} xs={4}>
                            <Card onClick={() => { TripClick(trip) }}>
                                <p><strong>{trip.title}</strong></p>
                                {/* <p><img src={trip.images} style={{maxWidth: "25%" }}/></p> */}
                                <p>{trip.description}</p>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Container>
    )
}

export default Trips;
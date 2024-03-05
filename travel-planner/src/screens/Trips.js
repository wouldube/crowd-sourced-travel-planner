import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Grid, Box, Card, Divider, Chip, Button } from '@mui/material';

const Trips = ({setTripObject}) => {
    /* Trips */
    const [trips, setTrips] = useState([]);

    const getTrips = async (id) => {
        try {
        const data = await fetch(`http://localhost:5000/trips/${id}`)
        const trips = await data.json()
        setTrips(trips)
        } catch(error) { console.error('Error fetching data:', error) }
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
            <Button onClick={() => {navigate(`create-trip`)}}>Plan a New One!!</Button>
            <Grid container spacing={3}>
            {trips.map((trip) => (
                <Grid item xs={4}>
                    <Card>
                    <Button variant="contained" onClick={() => {TripClick(trip)}}>{trip.title}</Button>
                    <p>{trip.description}</p>
                    </Card>
                </Grid>
            ))}
            </Grid>
        </Container>
    )
}

export default Trips;
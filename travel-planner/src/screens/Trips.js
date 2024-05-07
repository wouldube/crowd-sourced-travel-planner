import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Grid, Box, Card, CardHeader, CardContent, CardMedia,
    FormControl, FormGroup, FormLabel, TextField, Select, MenuItem,
    Button, ButtonGroup, IconButton, Tooltip, Rating, Divider } from '@mui/material';

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
                <Button onClick={() => { navigate(`create-trip`) }}>Create New Trip</Button>
                <Grid container spacing={3}>
                    {trips.map((trip, index) => (
                        <Grid item key={index} xs={4}>
                            <Card onClick={() => { TripClick(trip) }} style={{
                                backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.3), rgba(117, 207, 235, 0.7)), url(${trip.image})`}}>
                                <CardContent><h3>{trip.title}</h3>
                                    {/* <CardMedia image={trip.images[0]}></CardMedia> */}
                                    {trip.description}</CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Container>
    )
}

export default Trips;
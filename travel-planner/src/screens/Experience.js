import React, { useState, useEffect } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { Container, Paper, Grid, Box, Card, Divider, Chip, Button, FormControl, FormLabel, InputLabel, TextField, Select, option, ButtonGroup } from '@mui/material'

const Experience = (props) => {

    // TODO: make page usable when user not logged in

    const navigate = useNavigate();

    const id = localStorage.getItem("id")
    const experienceId = props.expId
    const setExperienceToUpdate = props.setExperienceToUpdate
    const setInitialExp = props.setInitialExp

    const [experience, setExperience] = useState({
        title: '',
        images: [''],
        location: {coordinates:["",""]},
        description: '',
    })
    const [trips, setTrips] = useState([])

    if (id == experience.owner) {
        const show = document.getElementById("ownerTrue")
        show.style.display = "block"
    }

    useEffect(() => {

        fetch(`http://localhost:5000/experiences/${experienceId}`)
            .then(response => response.json())
            .then(data => setExperience(data))
            .catch(error => console.error('Error fetching experience: ', error));
        
        if (id) {
            favoriteButton()
        }

    }, [])

    const favoriteButton = async () => {
        const data = await fetch(`http://localhost:5000/user-info/${id}`)
        const user = await data.json()
        const favList = user.favorites

        if (favList.indexOf(experience._id) >= 0) {
            const show = document.getElementById("removeFav")
            show.style.display = "block"

            const hide = document.getElementById("addFav")
            hide.style.display = "none"
        }
        else {
            const show = document.getElementById("addFav")
            show.style.display = "block"
            const hide = document.getElementById("removeFav")
            hide.style.display = "none"
        }
    }

    if (id) {
        favoriteButton()
    }

    // favorite an experience
    const favoriteExp = async () => {
        if (!id) {
            navigate('/')
        }

        console.log('fav')
        console.log(id)
        const data = await fetch(`http://localhost:5000/user-info/${id}`)
        const user = await data.json()
        const favList = user.favorites

        console.log(favList)

        if (favList.indexOf(experience._id) < 0) {
            favList.push(experience._id)

            const updateUser = await fetch(`http://localhost:5000/user-info/${id}`, {
                method: "PUT",
                body: JSON.stringify({"favorites": favList}),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log(updateUser)

            favoriteButton()
        }
    }

    const unfavoriteExp = async () => {
        const data = await fetch(`http://localhost:5000/user-info/${id}`)
        const user = await data.json()
        const favList = user.favorites

        const index = favList.indexOf(experience._id)
        if (index > -1) {
            favList.splice(index, 1);
        }

        const updateUser = await fetch(`http://localhost:5000/user-info/${id}`, {
            method: "PUT",
            body: JSON.stringify({"favorites": favList}),
            headers: {
                "Content-Type": "application/json",
            },
        });

        favoriteButton()
    }

    // add exp to trip
    const addToTrip = async () => {
        const data = await fetch(`http://localhost:5000/trips/${id}`)
        const trips = await data.json()
        console.log(trips)

        setTrips(trips)

        const show = document.getElementById("userTrips")
        show.style.display = "block"
    }

    const pickTrip = async (trip) => {
        const expList = trip.experiences

        if (expList.indexOf(experience._id) < 0) {
            expList.push(experience._id)

            const updateTrip = await fetch(`http://localhost:5000/update-trip/${trip._id}`, {
                method: "PUT",
                body: JSON.stringify({"experiences": expList}),
                headers: {
                    "Content-Type": "application/json",
                },
            })
        }

        const show = document.getElementById("userTrips")
        show.style.display = "none"
    }

    const createTrip = () => {
        setInitialExp(experience)
        navigate("/trips/create-trip");
    }

    // if owner update experience
    const updateExp = () => {
        setExperienceToUpdate(experience._id);
        navigate("/update-exp");
    }

    // if owner delete experience
    const deleteExp = async () => {
        const response = await fetch(`http://localhost:5000/delete-exp/${experience._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(experience)
        });

        const data = await fetch(`http://localhost:5000/user-info/${id}`)
        const user = await data.json()
        const expList = user.experiences

        const index = expList.indexOf(experience._id)
        if (index > -1) {
            expList.splice(index, 1);
        }

        const updateUser = await fetch(`http://localhost:5000/user-info/${id}`, {
            method: "PUT",
            body: JSON.stringify({"experiences": expList}),
            headers: {
                "Content-Type": "application/json",
            },
        });
        navigate("/");
    }

    return (
        <Container>
            <Paper>
            <h2>{experience.title}</h2>
            <Grid container spacing={10}>
            <Grid item xs={9}>
            <ButtonGroup>
                <div>
                <Button variant="contained" onClick={addToTrip}>Add to Trip</Button>
                <Button variant="contained" onClick={favoriteExp} id="addFav">Add to Favorites</Button>
                <Button variant="contained" style={{display: "none"}} onClick={unfavoriteExp} id="removeFav">Remove Favorite</Button>
                </div>
            </ButtonGroup>
            <div id="userTrips" style={{display: "none"}}>
                <button onClick={createTrip}>Create New Trip</button>
                {trips.map((trip, index) => (
                    <div key={index}>
                        <button onClick={() => {pickTrip(trip)}}>{trip.title}</button>
                    </div>
                ))}
            </div>
            <ButtonGroup>
            <div id="ownerTrue" style={{display: "none"}}>
                <Button variant="contained" onClick={updateExp}>Update</Button>
                <Button variant="contained" onClick={deleteExp}>Delete</Button>
            </div>
            </ButtonGroup>
            </Grid>
            <Grid item xs={4}>
            <img src={experience.images[0]} style={{ width: "350px" }}></img>
            </Grid>
            <Grid item xs={8}>
            <div style={{"textAlign": "left", "marginLeft":70}}>
                <p>Description: </p>
                <span>{experience.description}</span>
            </div>
            <div style={{"textAlign": "left", "marginLeft":70}}>
                <p>Location: </p>
                <span>{experience.location.coordinates[0]}, {experience.location.coordinates[1]}</span>
            </div>
            </Grid>
            </Grid>
            <div>
                {/* review component */}
            </div>
            </Paper>
        </Container>
    )
}

export default Experience;
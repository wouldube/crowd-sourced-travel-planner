import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Paper, Grid, Box, Card, Divider, Chip, Button, Tooltip, IconButton } from '@mui/material'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';

function UserExperiences({ setExperienceToUpdate }) {

    const id = localStorage.getItem("id")
    const [experiences, setUserExperiences] = useState([]);
    const [trips, setTrips] = useState([])
    // if (id == experience.owner) {
    //     const show = document.getElementById("ownerTrue")
    //     show.style.display = "block"
    // }

    const navigate = useNavigate();

    const onDelete = async (experience) => {
        const id = localStorage.getItem("id")
        if (id) {
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
        
        loadExperience()
        }
    };

    const onUpdate = (expId) => {
        setExperienceToUpdate(expId);
        navigate("/update-exp");
    }

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

        if (expList.indexOf(experiences._id) < 0) {
            expList.push(experiences._id)

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


    const loadExperience = () => {
        if (!localStorage.getItem("id")) {
            // localStorage.setItem("path", "/UserExperiences")
            navigate("/login")
        }

        const id = localStorage.getItem("id")

        fetch(`http://localhost:5000/my-experiences/${id}`)
            .then(response => response.json())
            .then(experiences => setUserExperiences(experiences))
            .catch(error => console.error('Error fetching data:', error));
    }

    useEffect(() => {
        loadExperience();
    }, []);

    return (
        <Container>
            <Paper>
                <h2>My Experiences</h2><strong></strong>
                <Grid>
                    <Tooltip>
                        <Button onClick={() => { navigate(`/create-exp`) }}>Create New Experience</Button>
                    </Tooltip>
                </Grid>
                <Grid container spacing={2}>
                    {experiences.map((exp) => (
                        <Grid item xs={6}>
                            <Card>
                            <Grid container spacing={1}>
                                <Grid item xs={16}>
                                    <strong>{exp.title}</strong>
                                </Grid>
                                <Grid item xs={12}>
                                    <img src={exp.images} style={{maxWidth: "100%" }}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <strong>Location: </strong>{exp.location.coordinates[0]}, {exp.location.coordinates[1]}
                                </Grid>
                                <Grid item xs={12}>
                                    {exp.rating}
                                </Grid>
                                <Grid item xs={12}>
                                    {exp.description}
                                </Grid>
                                <Grid item xs={12}>
                                    <Tooltip title="Add to Trip" followCursor>
                                        <IconButton>
                                            <AddBoxOutlinedIcon onClick={() => addToTrip(exp._id)} className="button delete-button"/>
                                        </IconButton>
                                    </Tooltip>
                                    {trips.map((trip, index) => (
                                        <div key={index}>
                                        <button onClick={() => {pickTrip(trip)}}>{trip.title}</button>
                                        </div>
                                    ))}
                                    <Tooltip title="Edit Experience" followCursor>
                                        <IconButton>
                                            <EditNoteIcon onClick={() => onUpdate(exp._id)} className="button delete-button"/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete Experience" followCursor>
                                        <IconButton>
                                            <DeleteForeverIcon onClick={() => onDelete(exp)} className="button delete-button"/>
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Card>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Container>
    );
}

export default UserExperiences;
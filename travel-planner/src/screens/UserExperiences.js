import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Paper, Grid, Box, Card, Divider, Chip, Rating, Button, Tooltip, IconButton } from '@mui/material'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';

function UserExperiences(props) {

    const id = localStorage.getItem("id")
    const [experiences, setUserExperiences] = useState([]);
    const [viewTrips, setViewTrips] = useState(false);
    const [trips, setTrips] = useState([])

    // const experienceId = props.expId
    const setExperienceToUpdate = props.setExperienceToUpdate
    const setInitialExp = props.setInitialExp

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

            // ask about this tomorrow
            const onUpdate = await fetch(`http://localhost:5000/user-info/${id}`, {
                method: "PUT",
                body: JSON.stringify({ "experiences": expList }),
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

        setTrips(trips)

        if (id) {
            setViewTrips(true);
        }
        else {
            navigate('/login')
        }
    }

    const createTrip = (experience) => {
        setInitialExp(experience)
        navigate("/trips/create-trip");
    }

    const UserTrips = (experience) => (
        <Tooltip>
            {trips.map((trip, index) => (
                <div key={index}>
                    <Button onClick={() => { pickTrip(trip, experience) }}>{trip.title}</Button>
                </div>
            ))}
            <Button onClick={createTrip}>Create New Trip</Button>
        </Tooltip>
    )
    
    const pickTrip = async (trip, experience) => {
        const expList = trip.experiences
        // check line 93

        if (expList.indexOf(experience._id) < 0) {
            expList.push(experience._id)

            const updateTrip = await fetch(`http://localhost:5000/update-trip/${trip._id}`, {
                method: "PUT",
                body: JSON.stringify({ "experiences": expList }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
        }
        setViewTrips(false);
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
                <h2>My Experiences</h2>
                <Grid>
                    <Tooltip>
                        <Button onClick={() => { navigate(`/create-exp`) }}>Create New Experience</Button>
                    </Tooltip>
                </Grid>
                <Grid container spacing={2}>
                    {experiences.map((exp, index) => (
                        <Grid item key={index} xs={6}>
                            <Card>
                                <Grid container spacing={1}>
                                    <Grid item xs={16}>
                                        <strong>{exp.title}</strong>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <img src={exp.images} style={{ maxWidth: "100%" }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <strong>Location: </strong>{exp.location.coordinates[0]}, {exp.location.coordinates[1]}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Rating id="rating" value={exp.averageRating || 0} precision={0.1}
                                            readOnly />
                                    </Grid>
                                    <Grid item xs={12}>
                                        {exp.description}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Tooltip title="Add to Trip" followCursor>
                                            <IconButton>
                                                <AddBoxOutlinedIcon onClick={addToTrip} Button />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Edit Experience" followCursor>
                                            <IconButton>
                                                <EditNoteIcon onClick={() => onUpdate(exp._id)} Button />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete Experience" followCursor>
                                            <IconButton>
                                                <DeleteForeverIcon onClick={() => onDelete(exp)} Button />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item xs={12}>
                                        { viewTrips ? <UserTrips experience={ exp }  /> : null }
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
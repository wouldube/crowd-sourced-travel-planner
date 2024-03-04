import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Paper, Grid, Box, Card, Divider, Chip, Button } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';

function UserExperiences({ setExperienceToUpdate }) {

    const [experiences, setUserExperiences] = useState([]);
    const navigate = useNavigate();

    const onDelete = (id) => {
        fetch(`http://localhost:5000/my-experiences/${id}`, {
            method: 'DELETE',
        })
            .then(() => {setUserExperiences(experiences.filter(experience => experience._id !== id));
            })
            .catch(error => console.error('Error:', error));
    };

    const onUpdate = (expId) => {

        setExperienceToUpdate(expId);
        navigate("/update-exp");

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
            <strong>My Experiences</strong>
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
                                {exp.reviews}
                            </Grid>
                            <Grid item xs={12}>
                                {exp.description}
                            </Grid>
                            <Grid item xs={12}>
                                <EditNoteIcon onClick={() => onUpdate(exp._id)}/>
                                <DeleteForeverIcon onClick={() => onDelete(exp._id)}/>
                            </Grid>
                        </Grid>
                    </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default UserExperiences;
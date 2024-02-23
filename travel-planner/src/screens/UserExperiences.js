import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Paper, Grid, Box, Card, Divider, Chip, Button } from '@mui/material'

function UserExperiences({ setExperienceToUpdate }) {

    const [experiences, setUserExperiences] = useState([]);
    const navigate = useNavigate();

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
            <strong>my experiences!</strong>
            <Grid container spacing={2}>
                {experiences.map((exp) => (
                    <Grid item xs={6}>
                        <Card>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <strong>{exp.title}</strong>
                            </Grid>
                            <Grid item xs={12}>
                                {exp.location.coordinates[0]}, {exp.location.coordinates[1]}
                            </Grid>
                            <Grid item xs={12}>
                                <div className="ratingImage">
                                    <img src="https://media.istockphoto.com/id/1306258842/photo/5-or-five-stars-sign-symbol-on-white-background-illustration-ranking-quality-service-review.jpg?s=612x612&w=0&k=20&c=PLhPtCoPZSUM9FSg9CAmTC_7b4WoHMYdaDHas64kg6M=" alt=" "></img>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                {exp.description}
                                {/* Need to work on update button */}
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={(e) => onUpdate(exp._id)}>Update</Button>
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
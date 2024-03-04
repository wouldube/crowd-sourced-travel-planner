import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Paper, Grid, Box, Card, Divider, Chip, Button } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';

function UserExperiences({ setExperienceToUpdate }) {

    const [experiences, setUserExperiences] = useState([]);
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
                                <DeleteForeverIcon onClick={() => onDelete(exp)} className="button delete-button"/>
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
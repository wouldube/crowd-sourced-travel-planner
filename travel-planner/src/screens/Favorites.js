import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Paper, Grid, Box, Card, Chip, Button } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';

function Favorites() {

    const [favorites, setFavorite] = useState([]);
    const navigate = useNavigate();

    const onDelete = (id) => {
        fetch(`http://localhost:5000/my-favorites/${id}`, {
            method: 'DELETE',
        })
            .then(() => {setFavorite(favorites.filter(favorite => favorite._id !== id));})
            .catch(error => console.error('Error:', error));
    };

    const loadFavorites = (id) => {
        fetch(`http://localhost:5000/my-favorites/${id}`)
            .then(response => response.json())
            .then(favorites => setFavorite(favorites), console.log(favorites))
            .catch(error => console.error('Error fetching data:', error));
    }

    useEffect(() => {

        if (!localStorage.getItem("id")) {
            // localStorage.setItem("path", "/favorites")
            navigate("/login")
        }

        const id = localStorage.getItem("id")

        loadFavorites(id);
        console.log(favorites)
    }, []);

    return (
        <Container>
            <strong>My Favorite Experiences</strong>
            <Grid container spacing={3}>
                {favorites.map((fav, index) => (
                    <Grid item key={index} xs={4}>
                        <Card>
                            <Grid container>
                                <Grid item xs={12}>
                                    <strong>{fav.title}</strong>
                                </Grid>
                                <Grid item xs={12}>
                                    <img src={fav.images} style={{maxWidth: "100%" }}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <strong>Location: </strong> {fav.location.coordinates[0]}, {fav.location.coordinates[1]}
                                </Grid>
                                <Grid item xs={12}>
                                <strong>Posted By: </strong>{fav.owner}
                                </Grid>
                                <Grid item xs={12}>
                                <strong>Rating: </strong> {fav.reviews}
                                </Grid>
                                <Grid item xs={12}>
                                    {fav.description}
                                </Grid>
                                <FavoriteIcon onClick={() => onDelete(fav._id)}/>
                            </Grid>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default Favorites;
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Paper, Grid, Box, Card, Chip, Button, Tooltip, IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';

function Favorites() {

    const [favorites, setFavorite] = useState([]);
    const navigate = useNavigate();


    const unfavorite = async (favorite) => {
        const id = localStorage.getItem("id")
        const data = await fetch(`http://localhost:5000/user-info/${id}`)
        const user = await data.json()
        const favList = user.favorites

        const index = favList.indexOf(favorite._id)
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
        console.log(updateUser);
        loadFavorites()
    }

    const loadFavorites = () => {
        if (!localStorage.getItem("id")) {
            navigate("/login")
        }

        const id = localStorage.getItem("id")

        fetch(`http://localhost:5000/my-favorites/${id}`)
            .then(response => response.json())
            .then(favorites => setFavorite(favorites))
            .catch(error => console.error('Error fetching data:', error));
    }

    useEffect(() => {
        loadFavorites();
    }, []);

    return (
        <Container>
            <strong>My Favorite Experiences</strong>
            <Grid container sizing={3}>
                {favorites.map((fav) => (
                    <Grid item xs={3}>
                        <Card>
                            <Grid container sizing={3}>
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
                                <Grid item xs={12}>
                                    <Tooltip title="Remove Favorite" followCursor>
                                        <IconButton>
                                            <FavoriteIcon onClick={() => unfavorite(fav)} className="button delete-button"/>
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}


export default Favorites;
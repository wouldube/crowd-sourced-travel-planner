import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Paper, Grid, Box, Card, CardHeader, CardContent, CardMedia,
    FormControl, FormGroup, FormLabel, TextField, Select, MenuItem,
    Button, ButtonGroup, IconButton, Tooltip, Rating, Divider } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Favorites() {

    const [favId, setFavId] = useState([]);
    const [favorites, setFavorite] = useState([]);
    const navigate = useNavigate();


    const unfavorite = async (favorite) => {
        const id = localStorage.getItem("id")
        const data = await fetch(`http://flip1.engr.oregonstate.edu:9278/user-info/${id}`)
        const user = await data.json()
        const favList = user.favorites

        const index = favList.indexOf(favorite._id)
        if (index > -1) {
            favList.splice(index, 1);
        }

        const updateUser = await fetch(`http://flip1.engr.oregonstate.edu:9278/user-info/${id}`, {
            method: "PUT",
            body: JSON.stringify({ "favorites": favList }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(updateUser);
        loadFavorites()
    }

    // const goToExperience = (favId) => {
    //     setFavId(favId)
    //     navigate(`/experience/`)
    // }

    const loadFavorites = () => {
        if (!localStorage.getItem("id")) {
            navigate("/login")
        }

        const id = localStorage.getItem("id")

        fetch(`http://flip1.engr.oregonstate.edu:9278/my-favorites/${id}`)
            .then(response => response.json())
            .then(favorites => setFavorite(favorites))
            .catch(error => console.error('Error fetching data:', error));
    }

    useEffect(() => {
        loadFavorites();
    }, []);

    return (
        <Container>
            <Paper>
                <strong>My Favorite Experiences</strong>
                <Grid container spacing={3}>
                    {favorites.map((fav, index) => (
                        <>
                            {(fav) && (
                                <Grid item key={index} xs={3}>

                                {/* // <Card key={fav._id} onClick={() => { goToExperience(fav._id) }}> */}
                                        <Card>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12}>
                                                    <strong>{fav.title}</strong>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <img src={fav.images} style={{ borderRadius: "50px", maxWidth: "100%" }} />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <strong>Location: </strong> {fav.location.coordinates[0]}, {fav.location.coordinates[1]}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <strong>Posted By: </strong>{fav.owner}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Rating id="rating" value={fav.averageRating} precision={0.1}
                                                        readOnly />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    {fav.description}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Tooltip title="Remove Favorite" followCursor>
                                                        <IconButton>
                                                            <FavoriteIcon onClick={() => unfavorite(fav)} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                </Grid>
                            )}
                        </>
                    ))}
                </Grid>
            </Paper>
        </Container>
    );
}


export default Favorites;
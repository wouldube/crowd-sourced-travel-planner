import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Paper, Grid, Box, Card, Chip, Button } from '@mui/material'

function Favorites() {

    const [favorites, setFavorite] = useState([]);
    const navigate = useNavigate();

    // const onDelete = async _id => {
    //     const response = await fetch(`/my-favorites/${_id}`,{method: 'DELETE'});
    //     if (response.status === 204){
    //         const newFavorite = favorites.filter(m => m._id !== _id);
    //         setFavorite(newFavorite);
    //     } else {
    //         console.error(`Unable to remove favorite, status code = ${response.status}`);
    //     }
    // };

    // const loadFavorites = async () => {
    //     const response = await fetch('/my-favorites');
    //     const data = await response.json();
    //     setFavorite(data);
    // }

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
            <strong>My Favorited Experiences</strong>
            <Grid container sizing={3}>
                {/* <div className="experienceListImage"> */}
                {favorites.map((fav) => (
                    <Grid item xs={3}>
                        <Card>
                            <Grid container sizing={3}>
                                <Grid item xs={12}>
                                    <strong>{fav.title}</strong>
                                </Grid>
                                <Grid item xs={12}>
                                    {fav.location.coordinates[0]}, {fav.location.coordinates[1]}
                                </Grid>
                                <Grid item xs={12}>
                                    {fav.description}
                                </Grid>
                            {/* {favorites.reviews} */}
                            <div className="ratingImage">
                                <img src="https://media.istockphoto.com/id/1306258842/photo/5-or-five-stars-sign-symbol-on-white-background-illustration-ranking-quality-service-review.jpg?s=612x612&w=0&k=20&c=PLhPtCoPZSUM9FSg9CAmTC_7b4WoHMYdaDHas64kg6M=" alt=" "></img>
                            </div>
                            {/* <div className="experiences-other-listtext"></div> */}
                            {/* Need to work on update button */}
                            {/* <Button onClick={(onDelete)}> Remove </Button> */}
                            {/* <Grid item xs={12}> */}
                                    {/*{fav.owner} this shows a ObjectId*/}
                                {/* </Grid> */}
                            </Grid>
</Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default Favorites;
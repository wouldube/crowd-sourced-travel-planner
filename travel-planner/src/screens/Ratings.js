import React, { useState } from "react";
import {Container, Paper, Grid, Box, Card, Button} from '@mui/material'

const Ratings = () => {
    // Example hardcoded data for testing the layout
    const hardcodedRatings = [
        { _id: 'rating1', rating: 5, description: "Beautiful place, loved it!" },
        { _id: 'rating2', rating: 4, description: "Great experience, but a bit crowded." },
        { _id: 'rating3', rating: 3, description: "Interesting, but not as expected." }
    ];

    const [ratings, setRatings] = useState(hardcodedRatings);

    // Commented out actual fetch logic for testing with hardcoded data
    /*
    useEffect(() => {
        const userId = "ACTUAL_USER_ID";
        fetch(`http://localhost:5000/my-reviews/${userId}`)
            .then(response => response.json())
            .then(data => {
                setRatings(data);
            })
            .catch(error => console.error('Error:', error));
    }, []);
    */

    const handleDelete = (reviewId) => {
        // Actual delete logic to be implemented here
        console.log("Delete review with ID:", reviewId);
        // For now, just filter out the deleted rating in the hardcoded data
        setRatings(ratings.filter(review => review._id !== reviewId));
    };

    return (
        <Paper>
            <h2>Your Ratings</h2>
            <Grid container spacing={3}>
                {ratings.map(rating => (
                    <Grid item xs={12}>
                    <Card key={rating._id}>
                        <p>Rating: {rating.rating}</p>
                        <p>Description: {rating.description}</p>
                        <button onClick={() => handleDelete(rating._id)} className="button delete-button">
                            Delete
                        </button>
                    </Card>
                    </Grid>
                ))}
                </Grid>
        </Paper>
    );
};

export default Ratings;

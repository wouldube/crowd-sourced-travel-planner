import React, { useState } from 'react';
import { Container, Paper, Grid, Box, Card, CardHeader, CardContent, CardMedia,
    FormControl, FormGroup, FormLabel, TextField, Select, MenuItem,
    Button, ButtonGroup, IconButton, Tooltip, Rating, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ReviewModal = ({ onClose, expId, title, style }) => {
    const [rating, setRating] = useState(3);
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const reviewData = {
            rating,
            description,
            owner: localStorage.getItem("id"),
            experience: expId,
        };

        fetch(`http://localhost:5000/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        })
        .then(response => response.json())
        .then(() => onClose())
        .catch(error => console.error('Error posting review:', error));
    };

    return (
        <Card style={style}>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item xs={8}>
                    <h2 style={{ overflowWrap: 'break-word' }}>{`Review ${title || "Experience"}`}</h2>
                </Grid>
                <Grid item xs={1} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={onClose}>
                        <CloseIcon />
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="center" style={{ padding: '20px' }}>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <FormControl fullWidth>
                        <Rating
                            id="rating"
                            value={rating}
                            precision={0.1}
                            onChange={(e) => setRating(e.target.value)}
                            style={{ marginBottom: '20px', marginLeft: "40px" }}
                        />
                        <TextField
                            id="description"
                            label="Description"
                            variant="outlined"
                            multiline
                            rows={4}
                            fullWidth
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            margin="normal"
                            style={{ marginBottom: '20px' }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{ marginTop: '20px' }}
                        >
                            Submit Review
                        </Button>
                    </FormControl>
                </form>
            </Grid>
        </Card>
    );
};


export default ReviewModal;
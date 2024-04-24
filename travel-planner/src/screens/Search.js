import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Grid, Box, Card, CardHeader, CardContent, CardMedia,
    FormControl, FormGroup, FormLabel, TextField, Select, MenuItem, Button, 
    ButtonGroup, Tooltip, Rating, Divider, Slider, Typography, InputLabel } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'

const Search = ({ setExpId }) => {
    const [query, setQuery] = useState('');
    const [location, setLocation] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    // Filter & Sort
    const [minRating, setMinRating] = useState(0);
    const [sortOrder, setSortOrder] = useState('');
    // Display username
    const [usernames, setUsernames] = useState([]);

    const navigate = useNavigate()

    // Username display functions
    const getUsername = async (owner) => {
        try {
            const response = await fetch(`http://localhost:5000/user-info/${owner}`)
            const userInfo = await response.json();
            return userInfo.username
        } catch (error) { console.error('Error fetching username:', error) }
    }

    let usernamesArr = [];
    const fillNameArr = async (data) => {
        try {
            for(let i = 0; i < data.length; i++) {
                usernamesArr.push(await getUsername(data[i].owner))
            }
            setUsernames(usernamesArr)
        } catch (error) { console.error('Error fetching username:', error) }
    }

    const handleSearch = (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        let coordinates = "";

        if (location != "") {
            const content = fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(location)}&format=json&apiKey=abce6a14428f49d49ef299b1016bf4b2`)
            const data = content.json()
            coordinates = [data.results[0].lon, data.results[0].lat]
        }

        fetch(`http://localhost:5000/search?query=${encodeURIComponent(query)}&coordinates=${coordinates}&rating=${minRating}&sort=${sortOrder}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setResults(data);
                fillNameArr(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }
    // Filter & Sort
    const handleRatingChange = (event, newValue) => {
        setMinRating(newValue);
    };

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    const goToExperience = (expId) => {
        setExpId(expId)
        navigate(`/experience`)
    }

    return (
        <Container style={{display: "flex", alignItems: "center", flexDirection:"column"}}>
            <Paper style={{ width: "100%" }}>
                <h2>Search Experiences</h2>
                <form onSubmit={handleSearch}>
                    <FormControl>
                        <Grid container>
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Enter search keywords"
                                />
                                <TextField
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Enter location"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? 'Searching...' : 'Search'}
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography gutterBottom>Minimum Rating</Typography>
                                <Slider
                                    value={minRating}
                                    onChange={handleRatingChange}
                                    aria-labelledby="minimum-rating-slider"
                                    valueLabelDisplay="auto"
                                    step={1}
                                    marks
                                    min={0}
                                    max={5}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Sort By Rating</InputLabel>
                                    <Select
                                        value={sortOrder.includes('rating') ? sortOrder : ''}
                                        onChange={handleSortChange}
                                        displayEmpty
                                    >
                                        <MenuItem value="averageRating_asc">Rating: Low to High</MenuItem>
                                        <MenuItem value="averageRating_desc">Rating: High to Low</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Sort By Title</InputLabel>
                                    <Select
                                        value={sortOrder.includes('title') ? sortOrder : ''}
                                        onChange={handleSortChange}
                                        displayEmpty
                                    >
                                        <MenuItem value="title_asc">Title: A to Z</MenuItem>
                                        <MenuItem value="title_desc">Title: Z to A</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                        </Grid>
                    </FormControl>
                </form>

            </Paper>
            <Paper style={{ width: "100%" }}>
                {error && <p className="error">{error}</p>}
                <Grid container justifyContent="center" spacing={3}>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (results.length > 0 ? (
                        results.map((result, index) => (
                            <Grid item key={index} xs={4}>
                                <Card key={result._id} onClick={() => { goToExperience(result._id) }}>
                                    <h3>{result.title}</h3>
                                    <img src={result.images} style={{ borderRadius: "50px", maxWidth: "100%" }}/>
                                    <p><strong>Posted By </strong> <>{usernames[index]}</></p>
                                    <Rating id="rating" value={result.averageRating || 0} precision={0.1}
                                        readOnly />
                                    <p>{result.description}</p>
                                </Card>
                                <br />
                            </Grid>
                        ))
                    ) : (
                        <Grid itemxs={12}>
                            <p>No results found</p>
                        </Grid>
                    )
                    )}
                </Grid>
            </Paper>
        </Container>
    )
}

export default Search;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Grid, Box, Card, CardHeader, CardContent, CardMedia,
    FormControl, FormGroup, FormLabel, TextField, Select, MenuItem, Button, 
    ButtonGroup, Tooltip, Rating, Divider, Slider, Typography, InputLabel } from '@mui/material';
import Lottie from 'react-lottie'
import searchIcon from "../UX/search-icon.json"
import SearchMap from '../components/SearchMap';

const Search = ({ setExpId }) => {
    const [query, setQuery] = useState('');
    const [location, setLocation] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isHover, setIsHover] = useState(0);
    // Filter & Sort
    const [minRating, setMinRating] = useState(0);
    const [sortOrder, setSortOrder] = useState('');
    // Map
    const [displayMode, setDisplayMode] = useState('list');
    const [lastSearch, setLastSearch] = useState({ query: '', location: '', minRating: 0, resultsCount: 0 });


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

    const handleSearch = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        let coordinates = "";

        if (location) {
            const content = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(location)}&format=json&apiKey=abce6a14428f49d49ef299b1016bf4b2`);
            const data = await content.json();
            if (data.results && data.results.length > 0) {
                coordinates = [data.results[0].lon, data.results[0].lat];
            } else {
                setError("No location found. Please enter a more specific location.");
                setIsLoading(false);
                return;
            }
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
                setLastSearch({
                    query: query,
                    location: location,
                    minRating: minRating,
                    resultsCount: data.length
                });
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

    // Summary of results
    const searchSummary = lastSearch.query || lastSearch.location || lastSearch.minRating > 0
        ? `Searching for: "${lastSearch.query}", at location "${lastSearch.location}", minimum rating: ${lastSearch.minRating}, found entries: ${lastSearch.resultsCount}`
        : '';

    return (
        <Container style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
            <Paper style={{ width: "100%" }}>
                <h2>Search Experiences</h2>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button style={{width: "250px", height: "50px"}} onClick={() => setDisplayMode('list')}>List View</Button>
                    <Button style={{width: "250px", height: "50px"}} onClick={() => setDisplayMode('map')}>Map View</Button>
                </ButtonGroup>
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
                                <Button type="submit" disabled={isLoading}
                                    onMouseEnter={() => setIsHover(1)}
                                    onMouseLeave={() => setIsHover(0)}>
                                    {isLoading ?
                                        'Searching...'
                                        :
                                        <> {
                                            isHover ?
                                                <Lottie options={{
                                                    loop: true, autoplay: true,
                                                    animationData: searchIcon
                                                }}
                                                    height={'90%'}
                                                    width={'90%'}
                                                />
                                                :
                                                "Search"
                                        }
                                        </>
                                    }
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
            {/* {searchSummary && (
                <Typography style={{ marginTop: 20 }}>
                    {searchSummary}
                </Typography>
            )} */}
            {displayMode === 'list' && (
            <Paper style={{ width: "100%" }}>
                {isLoading ? (
                    <Typography>Loading...</Typography>
                ) : results.length > 0 ? (
                    <Grid container spacing={3}>
                        {results.map((result, index) => (
                            <Grid item key={result._id} xs={12} sm={6} md={4}>
                                <Card >
                                    <CardMedia
                                        component="img"
                                        height="160"
                                        image={result.images[0]}
                                        alt={result.title}
                                        onClick={() => goToExperience(result._id)} style={{ cursor: 'pointer' }}
                                    />
                                    <CardContent>
                                        <h3>{result.title}</h3>
                                        <p><strong>Posted By </strong> <>{usernames[index]}</></p>
                                        <Rating id="rating" value={result.averageRating || 0} precision={0.1}
                                            readOnly 
                                            />
                                        <p>{result.description}</p>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography>No results found. Try adjusting your search criteria.</Typography>
                )}
                {error && <Typography color="error">{error}</Typography>}
            </Paper>
        )}

        {displayMode === 'map' && (
            <div style={{ height: '500px', width: '100%' }}>
                <SearchMap experiences={results} setExpId={setExpId} />
            </div>
        )}
        </Container>
    )
}

export default Search;

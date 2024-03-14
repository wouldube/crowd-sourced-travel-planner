import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Grid, Box, Card, CardHeader, CardContent, CardMedia,
    FormControl, FormGroup, FormLabel, TextField, Select, MenuItem,
    Button, ButtonGroup, IconButton, Tooltip, Rating, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'

const Search = ({ setExpId }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate()

    const handleSearch = (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        fetch(`http://flip1.engr.oregonstate.edu:9278/search?query=${encodeURIComponent(query)}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setResults(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const goToExperience = (expId) => {
        setExpId(expId)
        console.log(expId)
        navigate(`/experience`)
    }

    return (
        <Container>
            <Paper style={{ width: "80vw" }}>
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
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? 'Searching...' : 'Search'}
                                </Button>
                            </Grid>
                        </Grid>
                    </FormControl>
                </form>

            </Paper>
            <Paper style={{ width: "80vw" }}>
                {error && <p className="error">{error}</p>}
                <Grid container justifyContent="center" spacing={3}>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (results.length > 0 ? (
                        results.map((result, index) => (
                            <Grid item key={index} xs={4}>
                                <Card key={result._id} onClick={() => { goToExperience(result._id) }}>
                                    <h3>{result.title}</h3>
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

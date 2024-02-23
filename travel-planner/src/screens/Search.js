import React, { useState } from 'react';
import { Container, Paper, Grid, Box, Card, Divider, Chip, Button, FormControl, FormLabel, InputLabel, TextField } from '@mui/material'

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        fetch(`http://localhost:5000/search?query=${encodeURIComponent(query)}`)
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

    return (
        <Container>
            <h2>Search Experiences</h2>
            <form onSubmit={handleSearch}>
                <FormControl>
                    <TextField
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Enter search keywords"
                        className="search-input"
                    />
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Searching...' : 'Search'}
                        <br />
                    </Button>
                    <br />
                </FormControl>
            </form>
            {error && <p className="error">{error}</p>}
            {isLoading ? (
                <p>Loading...</p>
            ) : results.length > 0 ? (
                results.map((result) => (
                    <>
                        <Card key={result._id}>
                            <h3>{result.title}</h3>
                            <p>{result.description}</p>
                        </Card>
                        <br />
                    </>
                ))
            ) : (
                <p>No results found.</p>
            )}
        </Container>
    )
}

export default Search;

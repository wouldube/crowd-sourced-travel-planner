import React, { useState } from 'react';
import '../design.css';

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
            });
    };

    return (
        <div className="search-container">
            <h2>Search Experiences</h2>
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter search keywords"
                    className="search-input"
                />
                <button type="submit" disabled={isLoading} className="search-button">
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </form>
            {error && <p className="error">{error}</p>}
            <div className="search-results">

                {isLoading ? (
                    <p>Loading...</p>
                ) : results.length > 0 ? (
                    results.map((result) => (
                        <div key={result._id} className="search-item">
                            <h3 className="search-item-title">{result.title}</h3>
                            <p className="search-item-description">{result.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    );
};

export default Search;

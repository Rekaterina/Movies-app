import React from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import './SearchForm.css';

export default function SearchForm() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = React.useState(searchParams.get('query') || '');

    const navigate = useNavigate();

    const updateQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSearch = () => {
        searchParams.set('query', query);
        setSearchParams(searchParams);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="search-container">
            <button className="add-movie-btn" onClick={() => navigate('/new')}>
                + Add Movie
            </button>
            <div className="search-input-label">Find your movie</div>
            <div>
                <input
                    className="search-input"
                    value={query}
                    onChange={updateQuery}
                    onKeyDown={handleKeyDown}
                    placeholder="What do you want to watch?"
                />
                <button className="btn-search" onClick={handleSearch}>
                    Search
                </button>
            </div>
            <Outlet />
        </div>
    );
}

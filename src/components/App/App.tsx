import React from 'react';
import './App.css';
import SearchForm from '../SearchForm/SearchForm';
import GenreSelect from '../GenreSelect/GenreSelect';
import MovieDetails from '../MovieDetails/MovieDetails';
import SortControl, { SortOption } from '../SortControl/SortControl';
import { Genre, Movie } from '../../models';
import MovieTile from '../MovieTile/MovieTile';
import { movies } from '../../testData';

interface AppState {
    query: string;
    counter: number;
    selectedGenre: Genre;
    selectedSorting: SortOption;
    selectedMovieId: number | null;
    movies: Movie[];
}

export default class App extends React.Component<{}, AppState> {
    genre = Object.values(Genre);

    constructor(props: {}) {
        super(props);
        this.state = {
            query: 'cartoon',
            counter: 2,
            selectedGenre: Genre.All,
            selectedSorting: SortOption.ReleaseDate,
            movies,
            selectedMovieId: null,
        };
    }

    onSearch = (query: string) => {
        this.setState({ query });
        console.log('Search movies with ' + query);
    };

    onSelectGenre = (selectedGenre: Genre) => {
        this.setState({ selectedGenre });
        console.log('Selected genre is ' + selectedGenre);
    };

    onSelectSorting = (selectedSorting: SortOption) => {
        this.setState({ selectedSorting });
        console.log('Selected sorting is ' + selectedSorting);
    };

    onSelectMovie = (selectedMovieId: number) => {
        this.setState({ selectedMovieId });
        console.log('Selected movie id is ' + selectedMovieId);
    };

    getSelectedMovieById = (movieId: number): Movie | undefined => {
        return this.state.movies.find(({ id }) => id === movieId);
    };

    render() {
        return (
            <div className="app-wrapper">
                {this.state.selectedMovieId ? (
                    <MovieDetails movie={this.getSelectedMovieById(this.state.selectedMovieId)} />
                ) : (
                    <div className="search-container">
                        <SearchForm initialQuery={this.state.query} onSearch={this.onSearch} />
                    </div>
                )}
                <div className="content">
                    <div className="control-panel">
                        <GenreSelect
                            genres={this.genre}
                            selectedGenre={this.state.selectedGenre}
                            onSelect={this.onSelectGenre}
                        />
                        <SortControl selectedSorting={this.state.selectedSorting} onSelect={this.onSelectSorting} />
                    </div>
                    <div className="movie-list">
                        {this.state.movies.map(movie => (
                            <MovieTile movie={movie} key={movie.id} onSelect={this.onSelectMovie} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Genre, Movie, SortOption } from '../../models';
import { movies } from '../../testData';
import SortControl from '../SortControl/SortControl';
import MovieDetails from '../MovieDetails/MovieDetails';
import SearchForm from '../SearchForm/SearchForm';
import GenreSelect from '../GenreSelect/GenreSelect';
import MovieTile from '../MovieTile/MovieTile';
import { getSortedAndFilteredMovies } from '../../helpers';
import './MovieListPage.css';

function MovieListPage() {
    const genres = Object.values(Genre);

    const [query, setQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState(Genre.All);
    const [selectedSorting, setSelectedSorting] = useState(SortOption.ReleaseDate);
    const [movieList, setMovies] = useState(getSortedAndFilteredMovies(movies));
    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axios
            .get('http://localhost:4000/movies', {
                params: {
                    sortBy: selectedSorting.toLowerCase(),
                    filter: selectedGenre === Genre.All ? '' : selectedGenre.toLowerCase(),
                    search: query.toLowerCase(),
                },
                cancelToken: source.token,
            })
            .then((response: { data: { data: Movie[] } }) => {
                setMovies(response.data.data);
            })
            .catch((error: any) => {
                if (axios.isCancel(error)) {
                    console.log('Request canceled', error.message);
                } else {
                    console.log(error);
                }
            });

        return () => {
            source.cancel('Cancelling in cleanup');
        };
    }, [query, selectedGenre, selectedSorting]);

    const onSearch = (query: string) => {
        setQuery(query);
    };

    const onSelectGenre = (genre: Genre) => {
        setSelectedGenre(genre);
        // const filteredMovies = getSortedAndFilteredMovies(movies, selectedSorting, genre);
        // setMovies(filteredMovies);
    };

    const onSelectSorting = (sortingOption: SortOption) => {
        setSelectedSorting(sortingOption);
        // const sortedMovies = getSortedAndFilteredMovies(movies, sortingOption, selectedGenre);
        // setMovies(sortedMovies);
    };

    const onSelectMovie = (movieId: number) => {
        setSelectedMovieId(movieId);
        console.log('Selected movie id is ' + movieId);
    };

    const getSelectedMovieById = (movieId: number) => {
        return movieList.find(({ id }) => id === movieId) || movieList[0];
    };

    const onBackToSearch = () => {
        setSelectedMovieId(null);
    };

    return (
        <>
            {selectedMovieId ? (
                <div className="movie-detail-container">
                    <div className="back" onClick={onBackToSearch}>
                        &#8592;
                    </div>
                    <MovieDetails movie={getSelectedMovieById(selectedMovieId)} />
                </div>
            ) : (
                <div className="search-container">
                    <SearchForm initialQuery={query} onSearch={onSearch} />
                </div>
            )}
            <div className="content">
                <div className="control-panel">
                    <GenreSelect genres={genres} selectedGenre={selectedGenre} onSelect={onSelectGenre} />
                    <SortControl selectedSorting={selectedSorting} onSelect={onSelectSorting} />
                </div>
                <div className="movie-list">
                    {movieList.map(movie => (
                        <MovieTile movie={movie} key={movie.id} onSelect={onSelectMovie} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default MovieListPage;

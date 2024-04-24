import { useEffect, useState } from 'react';
import axios from 'axios';
import { Genre, Movie, SortOption } from '../../models';
import { movies } from '../../testData';
import SortControl from '../SortControl/SortControl';
import GenreSelect from '../GenreSelect/GenreSelect';
import MovieTile from '../MovieTile/MovieTile';
import { getSortedAndFilteredMovies } from '../../helpers';
import './MovieListPage.css';
import { SORT_OPTION_TO_MOVIE_FIELD_MAP } from '../../constants';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';

function MovieListPage() {
    const navigate = useNavigate();
    const genres = Object.values(Genre);

    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
    const selectedGenre = (searchParams.get('genre') as Genre) || Genre.All;
    const selectedSorting = (searchParams.get('sortBy') as SortOption) || SortOption.ReleaseDate;

    const [movieList, setMovies] = useState(getSortedAndFilteredMovies(movies));

    useEffect(() => {
        const source = axios.CancelToken.source();

        axios
            .get('http://localhost:4000/movies', {
                params: {
                    search: query.toLowerCase() || undefined,
                    searchBy: 'title',
                    filter: selectedGenre === Genre.All ? undefined : selectedGenre.toLowerCase(),
                    sortBy: SORT_OPTION_TO_MOVIE_FIELD_MAP[selectedSorting],
                    sortOrder: 'asc',
                    limit: 12,
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

    const onSelectGenre = (genre: Genre) => {
        if (genre === Genre.All) {
            searchParams.delete('genre');
        } else {
            searchParams.set('genre', genre);
        }
        navigate('?' + searchParams.toString());
    };

    const onSelectSorting = (sortingOption: SortOption) => {
        searchParams.set('sortBy', sortingOption);
        navigate('?' + searchParams.toString());
    };

    const onSelectMovie = (movieId: number) => {
        navigate(`/${movieId}?${searchParams.toString()}`);
    };

    return (
        <>
            <Outlet />
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

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Genre, Movie, SortOption } from '../../models';
import SortControl from '../SortControl/SortControl';
import GenreSelect from '../GenreSelect/GenreSelect';
import MovieTile from '../MovieTile/MovieTile';
import { API_PATH, SORT_OPTION_TO_MOVIE_FIELD_MAP } from '../../constants';
import { useRouter } from 'next/router';
import styles from './MovieListPage.module.css';

export function MovieListPage({ initialMovies }: { initialMovies: Movie[] }) {
    const router = useRouter();
    const genres = Object.values(Genre);

    const query = router.query.query || '';
    const selectedGenre = (router.query.genre as Genre) || Genre.All;
    const selectedSorting = (router.query.sortBy as SortOption) || SortOption.ReleaseDate;

    const [movieList, setMovies] = useState(initialMovies);

    const handleNavigate = (url: string) => {
        router.push(url);
    };

    useEffect(() => {
        const source = axios.CancelToken.source();

        axios
            .get(API_PATH, {
                params: {
                    search: (query as string).toLowerCase() || undefined,
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
            const { genre: _, ...newQuery } = router.query;
            const params = Object.fromEntries(Object.entries(newQuery).map(([k, v]) => [k, String(v)]));
            handleNavigate('?' + new URLSearchParams(params).toString());
        } else {
            const newQuery = { ...router.query, genre };
            const params = Object.fromEntries(Object.entries(newQuery).map(([k, v]) => [k, String(v)]));
            handleNavigate('?' + new URLSearchParams(params).toString());
        }
    };

    const onSelectSorting = (sortingOption: SortOption) => {
        const newQuery = { ...router.query, sortBy: sortingOption };
        handleNavigate('/?' + new URLSearchParams(newQuery).toString());
    };

    const onSelectMovie = (movieId: number) => {
        const newQuery = { ...router.query, id: String(movieId) };
        handleNavigate('/?' + new URLSearchParams(newQuery).toString());
    };

    return (
        <div className={styles.content}>
            <div className={styles['control-panel']}>
                <GenreSelect genres={genres} selectedGenre={selectedGenre} onSelect={onSelectGenre} />
                <SortControl selectedSorting={selectedSorting} onSelect={onSelectSorting} />
            </div>
            <div className={styles['movie-list']}>
                {movieList.map((movie: Movie) => (
                    <MovieTile movie={movie} key={movie.id} onSelect={onSelectMovie} />
                ))}
            </div>
        </div>
    );
}

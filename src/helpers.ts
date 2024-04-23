import { Genre, Movie, SortOption } from './models';

export function getSortedAndFilteredMovies(movies: Movie[], sortOption = SortOption.ReleaseDate, genre = Genre.All) {
    let sortedAndFilteredMovies = [...movies];

    if (genre !== Genre.All) {
        sortedAndFilteredMovies = sortedAndFilteredMovies.filter(movie => movie.genres.includes(genre));
    }
    switch (sortOption) {
        case SortOption.Title:
            return sortedAndFilteredMovies.sort((movieA, movieB) => movieA.title.localeCompare(movieB.title));

        case SortOption.ReleaseDate:
        default:
            return sortedAndFilteredMovies.sort((movieA, movieB) => {
                if (movieA.release_date && movieB.release_date) {
                    return new Date(movieB.release_date).getTime() - new Date(movieA.release_date).getTime();
                }
                return 0;
            });
    }
}

import { capitalizeFirstLetter, getSortedAndFilteredMovies } from './helpers';
import { Genre, Movie, SortOption } from './models';

describe('getSortedAndFilteredMovies', () => {
    it('should filter by genre and sort by title', () => {
        const movies = [
            { title: 'La La Land', release_date: '2016-12-29', genres: [Genre.Comedy] },
            { title: 'Interstellar', release_date: '2014-11-05', genres: [Genre.Adventure] },
            { title: 'The Shining', release_date: '1980-05-23', genres: [Genre.Horror] },
        ] as Movie[];
        const sortedAndFilteredMovies = getSortedAndFilteredMovies(movies, SortOption.Title, Genre.Comedy);
        expect(sortedAndFilteredMovies).toEqual([
            { title: 'La La Land', release_date: '2016-12-29', genres: [Genre.Comedy] },
        ]);
    });

    it('should filter by genre and sort by release_date', () => {
        const movies = [
            { title: 'La La Land', release_date: '2016-12-29', genres: [Genre.Comedy] },
            { title: 'Interstellar', release_date: '2014-11-05', genres: [Genre.Adventure] },
            { title: 'The Shining', release_date: '1980-05-23', genres: [Genre.Horror] },
        ] as Movie[];
        const sortedAndFilteredMovies = getSortedAndFilteredMovies(movies, SortOption.ReleaseDate, Genre.Horror);
        expect(sortedAndFilteredMovies).toEqual([
            { title: 'The Shining', release_date: '1980-05-23', genres: [Genre.Horror] },
        ]);
    });
});

describe('capitalizeFirstLetter', () => {
    test('should capitalize the first letter and make the rest of the word lowercase', () => {
        expect(capitalizeFirstLetter('hello')).toBe('Hello');
        expect(capitalizeFirstLetter('WORLD')).toBe('World');
        expect(capitalizeFirstLetter('JaVaScRiPt')).toBe('Javascript');
    });
});

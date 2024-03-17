import { Genre, Movie } from '../../models';
import MovieDetails, { MovieDetailsProps } from './MovieDetails';
import { render, cleanup, screen } from '@testing-library/react';

afterEach(cleanup);

const mockedMovie: Movie = {
    id: 1,
    title: 'Test movie',
    vote_average: 8,
    runtime: 122,
    poster_path: 'test.jpg',
    overview: 'Test overview',
    release_date: '2016-12-29',
    genres: [Genre.Crime, Genre.Comedy],
};

const mockedProps: MovieDetailsProps = {
    movie: mockedMovie,
};

describe('MovieDetails', () => {
    it('renders movie title', () => {
        render(<MovieDetails {...mockedProps} />);
        expect(screen.getByText('Test movie')).toBeTruthy();
    });

    it('renders movie rating', () => {
        render(<MovieDetails {...mockedProps} />);
        expect(screen.getByText('8')).toBeTruthy();
    });

    it('renders movie genres', () => {
        render(<MovieDetails {...mockedProps} />);
        expect(screen.getByText('Crime, Comedy')).toBeTruthy();
    });

    it('renders movie overview', () => {
        render(<MovieDetails {...mockedProps} />);
        expect(screen.getByText('Test overview')).toBeTruthy();
    });

    it('renders movie duration', () => {
        render(<MovieDetails {...mockedProps} />);
        expect(screen.getByText('2h 2min')).toBeTruthy();
    });

    it('renders movie year', () => {
        render(<MovieDetails {...mockedProps} />);
        expect(screen.getByText('2016')).toBeTruthy();
    });

    it('renders "No movie details" when there is no movie', () => {
        const noMovieProps: MovieDetailsProps = {
            movie: undefined,
        };

        render(<MovieDetails {...noMovieProps} />);
        expect(screen.getByText('No Movie Details')).toBeTruthy();
    });
});

import { Genre, Movie } from '../../models';
import MovieDetails from './MovieDetails';
import { render, cleanup, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

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

describe('MovieDetails', () => {
    it('renders movie title', () => {
        render(
            <Router>
                <MovieDetails movie={mockedMovie} />
            </Router>,
        );
        expect(screen.getByText('Test movie')).toBeInTheDocument();
    });

    it('renders movie rating', () => {
        render(
            <Router>
                <MovieDetails movie={mockedMovie} />
            </Router>,
        );
        expect(screen.getByText('8')).toBeInTheDocument();
    });

    it('renders movie genres', () => {
        render(
            <Router>
                <MovieDetails movie={mockedMovie} />
            </Router>,
        );
        expect(screen.getByText('crime, comedy')).toBeInTheDocument();
    });

    it('renders movie overview', () => {
        render(
            <Router>
                <MovieDetails movie={mockedMovie} />
            </Router>,
        );
        expect(screen.getByText('Test overview')).toBeInTheDocument();
    });

    it('renders movie duration', () => {
        render(
            <Router>
                <MovieDetails movie={mockedMovie} />
            </Router>,
        );
        expect(screen.getByText('2h 2min')).toBeInTheDocument();
    });

    it('renders movie year', () => {
        render(
            <Router>
                <MovieDetails movie={mockedMovie} />
            </Router>,
        );
        expect(screen.getByText('2016')).toBeInTheDocument();
    });

    it('renders "No movie details" when there is no movie', () => {
        render(
            <Router>
                <MovieDetails movie={undefined} />
            </Router>,
        );
        expect(screen.getByText('No Movie Details')).toBeInTheDocument();
    });
});

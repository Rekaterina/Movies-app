import { Genre, Movie } from '../../models';
import MovieTile, { MovieTileProps } from './MovieTile';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';

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

const mockedOnSelect = jest.fn();

const mockedProps: MovieTileProps = {
    movie: mockedMovie,
    onSelect: mockedOnSelect,
};

describe('MovieTile', () => {
    it('renders movie title', () => {
        render(<MovieTile {...mockedProps} />);
        expect(screen.getByText('Test movie')).toBeTruthy();
    });

    it('renders movie genres', () => {
        render(<MovieTile {...mockedProps} />);
        expect(screen.getByText('Crime, Comedy')).toBeTruthy();
    });

    it('renders movie year', () => {
        render(<MovieTile {...mockedProps} />);
        expect(screen.getByText('2016')).toBeTruthy();
    });

    it('calls onSelect prop when clicked', () => {
        render(<MovieTile {...mockedProps} />);
        const movieTile = screen.getByText('Test movie');

        fireEvent.click(movieTile);
        expect(mockedOnSelect).toHaveBeenCalled();
    });
});

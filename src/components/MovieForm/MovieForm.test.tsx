import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MovieForm from './MovieForm';
import { Movie } from '../../models';
import { MemoryRouter } from 'react-router-dom';

const movieData: Movie = {
    id: 1,
    title: 'Movie Test',
    poster_path: 'https://example.com',
    vote_average: 7.8,
    release_date: '2021-01-01',
    genres: [],
    runtime: 120,
    overview: 'Test movie',
};

describe('MovieForm', () => {
    const onSubmitMock = jest.fn();
    let movie = movieData;

    beforeEach(() => {
        onSubmitMock.mockReset();

        movie = movieData;
    });

    it('populates form fields if initialMovie is provided', () => {
        render(
            <MemoryRouter>
                <MovieForm initialMovie={movie} onSubmit={onSubmitMock} />
            </MemoryRouter>,
        );

        expect((screen.getByLabelText('Title:') as HTMLInputElement).value).toBe(movie.title);
        expect((screen.getByLabelText('Movie url:') as HTMLInputElement).value).toBe(movie.poster_path);
        expect((screen.getByLabelText('Rating:') as HTMLInputElement).value).toBe(movie.vote_average?.toString());
        expect((screen.getByLabelText('Release date:') as HTMLInputElement).value).toBe(movie.release_date);
        expect((screen.getByLabelText('Runtime:') as HTMLInputElement).value).toBe(movie.runtime.toString());
        expect((screen.getByLabelText('Overview:') as HTMLTextAreaElement).value).toBe(movie.overview);
    });
});

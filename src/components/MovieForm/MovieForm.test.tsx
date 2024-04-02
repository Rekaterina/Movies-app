import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MovieForm from './MovieForm';
import { Movie } from '../../models';

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

    it('submits form correctly', async () => {
        render(<MovieForm onSubmit={onSubmitMock} />);

        fireEvent.change(screen.getByLabelText('Title:'), { target: { value: movie.title } });
        fireEvent.change(screen.getByLabelText('Movie url:'), { target: { value: movie.poster_path } });
        fireEvent.change(screen.getByLabelText('Rating:'), { target: { value: movie.vote_average?.toString() } });
        fireEvent.change(screen.getByLabelText('Release date:'), { target: { value: movie.release_date } });
        fireEvent.change(screen.getByLabelText('Runtime:'), { target: { value: movie.runtime.toString() } });
        fireEvent.change(screen.getByLabelText('Overview:'), { target: { value: movie.overview } });

        fireEvent.click(screen.getByText('Submit'));

        expect(onSubmitMock).toHaveBeenCalledWith({
            genres: movie.genres,
            overview: movie.overview,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            runtime: movie.runtime.toString(),
            title: movie.title,
            vote_average: movie.vote_average?.toString(),
        });
    });

    it('populates form fields if initialMovie is provided', () => {
        render(<MovieForm initialMovie={movie} onSubmit={onSubmitMock} />);

        expect((screen.getByLabelText('Title:') as HTMLInputElement).value).toBe(movie.title);
        expect((screen.getByLabelText('Movie url:') as HTMLInputElement).value).toBe(movie.poster_path);
        expect((screen.getByLabelText('Rating:') as HTMLInputElement).value).toBe(movie.vote_average?.toString());
        expect((screen.getByLabelText('Release date:') as HTMLInputElement).value).toBe(movie.release_date);
        expect((screen.getByLabelText('Runtime:') as HTMLInputElement).value).toBe(movie.runtime.toString());
        expect((screen.getByLabelText('Overview:') as HTMLTextAreaElement).value).toBe(movie.overview);
    });
});

import { fireEvent, render, screen } from '@testing-library/react';
import GenreSelect from './GenreSelect';
import { Genre } from '../../models';

const genres = [Genre.All, Genre.Documentary, Genre.Comedy, Genre.Horror, Genre.Crime];

test('component renders all genres passed in props', () => {
    render(<GenreSelect genres={genres} selectedGenre={Genre.All} onSelect={jest.fn()} />);

    genres.forEach(genre => {
        expect(screen.getByText(genre)).toBeInTheDocument();
    });
});

test('component highlights a selected genre passed in props', () => {
    render(<GenreSelect genres={genres} selectedGenre={Genre.All} onSelect={jest.fn()} />);

    const button = screen.getByRole('button', { name: Genre.All });
    expect(button).toHaveStyle({ color: 'blue' });
});

test('after a click event on a genre button component calls "onChange" callback and passes correct genre in arguments', () => {
    const mockOnSelect = jest.fn();
    render(<GenreSelect genres={genres} selectedGenre={Genre.All} onSelect={mockOnSelect} />);

    fireEvent.click(screen.getByRole('button', { name: Genre.All }));

    expect(mockOnSelect).toHaveBeenCalledWith(Genre.All);
});

import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from './SearchForm';

test('component renders an input with the value equal to initial value passed in props', () => {
    render(<SearchForm initialQuery="test" onSearch={jest.fn()} />);
    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
});

test('after typing to the input and a "click" event on the Submit button, the "onChange" prop is called with proper value', () => {
    const mockOnSearch = jest.fn();
    render(<SearchForm initialQuery="" onSearch={mockOnSearch} />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('test');
});

test('after typing to the input and pressing Enter key, the "onChange" prop is called with proper value', () => {
    const mockOnSearch = jest.fn();
    render(<SearchForm initialQuery="" onSearch={mockOnSearch} />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter', code: 'Enter' });

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('test');
});

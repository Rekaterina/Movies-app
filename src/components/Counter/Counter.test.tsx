import { render, fireEvent, screen } from '@testing-library/react';
import Counter from './Counter';

test('component renders initial value provided in props', () => {
    render(<Counter initialValue={2} />);
    expect(screen.getByText('2')).toBeInTheDocument();
});

test('a click event on "decrement" button decrements the displayed value', () => {
    render(<Counter initialValue={2} />);
    fireEvent.click(screen.getByText('-'));
    expect(screen.getByText('1')).toBeInTheDocument();
});

test('a click event on "increment" button increments the displayed value', () => {
    render(<Counter initialValue={2} />);
    fireEvent.click(screen.getByText('+'));
    expect(screen.getByText('3')).toBeInTheDocument();
});

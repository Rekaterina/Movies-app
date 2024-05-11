import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from './SearchForm';
import { MemoryRouter } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

// Mock useSearchParams
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useSearchParams: jest.fn().mockReturnValue([new URLSearchParams(), jest.fn()]),
}));

// Utility to render component with router and initial entries
function renderWithRouter(ui: any, { route = '/' } = {}) {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: MemoryRouter });
}

test('component renders an input with the value from search parameters', () => {
    const setSearchParams = jest.fn();
    (useSearchParams as jest.MockedFunction<typeof useSearchParams>).mockImplementation(() => [
        new URLSearchParams('query=test'),
        setSearchParams,
    ]);

    renderWithRouter(<SearchForm />);
    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
});

test('typing in the input and clicking the Search button updates the URL parameters', () => {
    const setSearchParams = jest.fn();

    (useSearchParams as jest.MockedFunction<typeof useSearchParams>).mockImplementation(() => [
        new URLSearchParams(),
        setSearchParams,
    ]);

    renderWithRouter(<SearchForm />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    const expected = new URLSearchParams();
    expected.set('query', 'test');

    expect(setSearchParams).toHaveBeenCalledWith(expected);
});

test('typing in the input and pressing Enter updates the URL parameters', () => {
    const setSearchParams = jest.fn();

    (useSearchParams as jest.MockedFunction<typeof useSearchParams>).mockImplementation(() => [
        new URLSearchParams(),
        setSearchParams,
    ]);

    renderWithRouter(<SearchForm />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter', code: 'Enter' });

    const expected = new URLSearchParams();
    expected.set('query', 'test');

    expect(setSearchParams).toHaveBeenCalledWith(expected);
});

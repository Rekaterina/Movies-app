import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SortControl from './SortControl';
import { SortOption } from '../../models';

test('component renders the sorting option equal to initial value passed in props', () => {
    render(<SortControl selectedSorting={SortOption.Title} onSelect={jest.fn()} />);
    expect(screen.getByDisplayValue(SortOption.Title)).toBeInTheDocument();
});

test('when selected option is changed the "onChange" prop is called with proper value', async () => {
    const mockOnSearch = jest.fn();
    render(<SortControl selectedSorting={SortOption.Title} onSelect={mockOnSearch} />);

    userEvent.selectOptions(screen.getByRole('combobox'), [SortOption.ReleaseDate]);

    await waitFor(() => expect(mockOnSearch).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockOnSearch).toHaveBeenCalledWith(SortOption.ReleaseDate));
});

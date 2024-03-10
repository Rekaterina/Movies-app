import type { Meta, StoryObj } from '@storybook/react';
import SortControl, { SortOption } from './SortControl';
import { action } from '@storybook/addon-actions';

const meta = {
    title: 'Components/Sort Control',
    component: SortControl,
    tags: ['autodocs'],
    args: {
        onSelect: action(SortOption.Title),
    },
} satisfies Meta<typeof SortControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Title: Story = {
    args: {
        selectedSorting: SortOption.Title,
    },
};

export const ReleaseDate: Story = {
    args: {
        selectedSorting: SortOption.ReleaseDate,
    },
};

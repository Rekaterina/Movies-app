import type { Meta, StoryObj } from '@storybook/react';
import SortControl from './SortControl';
import { action } from '@storybook/addon-actions';
import { SortOption } from '../../models';

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

import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import GenreSelect from './GenreSelect';
import { Genre } from '../../models';

const meta = {
    title: 'Components/Genre Select',
    component: GenreSelect,
    tags: ['autodocs'],
    args: {
        genres: [Genre.All, Genre.Documentary, Genre.Comedy, Genre.Horror, Genre.Crime],
        onSelect: action(Genre.All),
    },
} satisfies Meta<typeof GenreSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {
    args: {
        selectedGenre: Genre.All,
    },
};

export const Documentary: Story = {
    args: {
        selectedGenre: Genre.Documentary,
    },
};

export const Comedy: Story = {
    args: {
        selectedGenre: Genre.Comedy,
    },
};

export const Horror: Story = {
    args: {
        selectedGenre: Genre.Horror,
    },
};

export const Crime: Story = {
    args: {
        selectedGenre: Genre.Crime,
    },
};

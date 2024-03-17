import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import MovieTile from './MovieTile';
import { Genre, Movie } from '../../models';

const meta = {
    title: 'Components/Movie Tile',
    component: MovieTile,
    tags: ['autodocs'],
    args: {
        movie: {
            title: 'La La Land',
            release_date: '2016-12-29',
            poster_path: 'https://i.ibb.co/NYrgvTz/la-la-land.jpg',
            genres: [Genre.Comedy, Genre.Crime],
            id: 313369,
        } as Movie,
        onSelect: action('313369'),
    },
} satisfies Meta<typeof MovieTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

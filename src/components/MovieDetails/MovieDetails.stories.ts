import type { Meta, StoryObj } from '@storybook/react';

import MovieDetails from './MovieDetails';
import { Genre } from '../../models';

const meta = {
    title: 'Components/Movie Details',
    component: MovieDetails,
    tags: ['autodocs'],
    args: {
        movie: {
            title: 'La La Land',
            vote_average: 7.9,
            release_date: '2016-12-29',
            poster_path: 'https://i.ibb.co/NYrgvTz/la-la-land.jpg',
            overview:
                'Mia, an aspiring actress, serves lattes to movie stars in between auditions and Sebastian, a jazz musician, scrapes by playing cocktail party gigs in dingy bars, but as success mounts they are faced with decisions that begin to fray the fragile fabric of their love affair, and the dreams they worked so hard to maintain in each other threaten to rip them apart.',
            runtime: 128,
            genres: [Genre.Comedy, Genre.Crime],
            id: 313369,
        },
    },
} satisfies Meta<typeof MovieDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

import { Genre, Movie } from './models';

export const movies: Movie[] = [
    {
        id: 1,
        title: 'La La Land',
        vote_average: 7.9,
        release_date: '2016-12-29',
        poster_path: 'https://i.ibb.co/NYrgvTz/la-la-land.jpg',
        overview:
            'Mia, an aspiring actress, serves lattes to movie stars in between auditions and Sebastian, a jazz musician, scrapes by playing cocktail party gigs in dingy bars, but as success mounts they are faced with decisions that begin to fray the fragile fabric of their love affair, and the dreams they worked so hard to maintain in each other threaten to rip them apart.',
        runtime: 128,
        genres: [Genre.Comedy, Genre.Adventure],
    },
    {
        id: 2,
        title: 'Interstellar',
        vote_average: 8.6,
        release_date: '2014-11-05',
        poster_path: 'https://i.ibb.co/wMFKfcy/Interstellar.jpg',
        overview:
            'Interstellar chronicles the adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.',
        runtime: 169,
        genres: [Genre.Adventure, Genre.Mystery],
    },
    {
        id: 3,
        title: 'The Shining',
        vote_average: 8.4,
        release_date: '1980-05-23',
        poster_path: 'https://i.ibb.co/C7VHRPB/shining.jpg',
        overview:
            'Jack Torrance accepts a caretaker job at the Overlook Hotel, where he, along with his wife Wendy and their son Danny, must live isolated from the rest of the world for the winter. But they aren’t prepared for the madness that lurks within.',
        runtime: 146,
        genres: [Genre.Horror, Genre.Mystery],
    },
    {
        id: 4,
        title: 'Pulp Fiction',
        vote_average: 8.9,
        release_date: '1994-09-10',
        poster_path: 'https://i.ibb.co/QHyBtCX/pulp-fiction.jpg',
        overview:
            "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.",
        runtime: 154,
        genres: [Genre.Crime, Genre.Comedy],
    },
    {
        id: 5,
        title: 'The Cove',
        vote_average: 8.4,
        release_date: '2009-07-31',
        poster_path: 'https://i.ibb.co/mFWkGh1/cove.jpg',
        overview:
            'The Cove tells the amazing true story of how an elite team of individuals, films makers and free divers embarked on a covert mission to penetrate the hidden cove in Japan, shining light on a dark and deadly secret. The shocking discoveries were only the tip of the iceberg.',
        runtime: 92,
        genres: [Genre.Documentary, Genre.Crime],
    },
    {
        id: 6,
        title: 'Journey to the Center of the Earth',
        vote_average: 5.8,
        release_date: '2008-07-11',
        poster_path: 'https://i.ibb.co/pfM41st/journey-to-the-center-of-the-earth.jpg',
        overview:
            'On a quest to find out what happened to his missing brother, a scientist, his nephew and their mountain guide discover a fantastic and dangerous lost world in the center of the earth.',
        runtime: 93,
        genres: [Genre.Adventure, Genre.Comedy],
    },
];

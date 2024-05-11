import React from 'react';
import axios from 'axios';
import styles from './HomePage.module.css';
import { MovieListPage } from '../src/components/MovieListPage/MovieListPage';
import SearchForm from '../src/components/SearchForm/SearchForm';
import { API_PATH, SORT_OPTION_TO_MOVIE_FIELD_MAP } from '../src/constants';
import { Genre, Movie, SortOption } from '../src/models';
import { GetServerSidePropsContext } from 'next';

export default function HomePage({ initialMovies }: { initialMovies: Movie[] }) {
    return (
        <div className={styles['app-wrapper']}>
            <SearchForm />
            <MovieListPage initialMovies={initialMovies} />
        </div>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { query, genre, sortBy } = context.query;
    const response = await axios.get(API_PATH, {
        params: {
            search: query || ''.toLowerCase(),
            searchBy: 'title',
            filter: genre === Genre.All ? undefined : genre || ''.toLowerCase(),
            sortBy: SORT_OPTION_TO_MOVIE_FIELD_MAP[sortBy as SortOption],
            sortOrder: 'asc',
            limit: 12,
        },
    });

    return {
        props: {
            initialMovies: response.data.data,
        },
    };
}

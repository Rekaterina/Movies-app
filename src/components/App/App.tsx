import React from 'react';
import Counter from '../Counter/Counter';
import './App.css';
import SearchForm from '../SearchForm/SearchForm';
import GenreSelect, { Genre } from '../GenreSelect/GenreSelect';

interface AppState {
    query: string;
    counter: number;
    selectedGenre: Genre;
}

export default class App extends React.Component<{}, AppState> {
    genre = Object.values(Genre);

    constructor(props: {}) {
        super(props);
        this.state = { query: 'cartoon', counter: 2, selectedGenre: Genre.All };
    }

    onSearch = (query: string) => {
        this.setState({ query });
        console.log('Search movies with ' + query);
    };

    onSelectGenre = (selectedGenre: Genre) => {
        this.setState({ selectedGenre });
        console.log('Selected genre is ' + selectedGenre);
    };

    render() {
        return (
            <div className="app-wrapper">
                <Counter initialValue={this.state.counter} />
                <SearchForm initialQuery={this.state.query} onSearch={this.onSearch} />
                <GenreSelect
                    genres={this.genre}
                    selectedGenre={this.state.selectedGenre}
                    onSelect={this.onSelectGenre}
                />
            </div>
        );
    }
}

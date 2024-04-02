import React from 'react';
import './App.css';
import SearchForm from '../SearchForm/SearchForm';
import GenreSelect from '../GenreSelect/GenreSelect';
import MovieDetails from '../MovieDetails/MovieDetails';
import SortControl, { SortOption } from '../SortControl/SortControl';
import { Genre, ModalType, Movie } from '../../models';
import MovieTile from '../MovieTile/MovieTile';
import { movies } from '../../testData';
import Dialog from '../Dialog/Dialog';
import MovieForm from '../MovieForm/MovieForm';
import { DIALOG_TITLE_MAP } from '../../constants';

interface AppState {
    query: string;
    counter: number;
    selectedGenre: Genre;
    selectedSorting: SortOption;
    selectedMovieId: number | null;
    movies: Movie[];
    showModal: boolean;
    modalType: ModalType | string;
}

export default class App extends React.Component<{}, AppState> {
    genre = Object.values(Genre);

    constructor(props: {}) {
        super(props);
        this.state = {
            query: 'cartoon',
            counter: 2,
            selectedGenre: Genre.All,
            selectedSorting: SortOption.ReleaseDate,
            movies,
            selectedMovieId: null,
            showModal: true,

            // change modalType to see use cases
            modalType: ModalType.Edit,
        };
    }

    onSearch = (query: string) => {
        this.setState({ query });
        console.log('Search movies with ' + query);
    };

    onSelectGenre = (selectedGenre: Genre) => {
        this.setState({ selectedGenre });
        console.log('Selected genre is ' + selectedGenre);
    };

    onSelectSorting = (selectedSorting: SortOption) => {
        this.setState({ selectedSorting });
        console.log('Selected sorting is ' + selectedSorting);
    };

    onSelectMovie = (selectedMovieId: number) => {
        this.setState({ selectedMovieId });
        console.log('Selected movie id is ' + selectedMovieId);
    };

    onFormSubmit = (movie: Movie) => {
        console.log('Submitted movie id is ' + movie.title);
    };

    onCloseDialog = () => {
        this.setState({ showModal: false });
    };

    getSelectedMovieById = (movieId: number): Movie | undefined => {
        return this.state.movies.find(({ id }) => id === movieId);
    };

    onDeleteMovie = () => {
        console.log('Movie with id' + this.state.selectedMovieId + 'was deleted');
    };

    renderModal() {
        if (!this.state.showModal) return null;
        let dialogContent = null;
        let dialogTitle = '';

        switch (this.state.modalType) {
            case ModalType.Add:
                dialogContent = <MovieForm onSubmit={this.onFormSubmit} />;
                dialogTitle = DIALOG_TITLE_MAP[ModalType.Add];
                break;

            case ModalType.Edit:
                dialogContent = <MovieForm initialMovie={movies[0]} onSubmit={this.onFormSubmit} />;
                dialogTitle = DIALOG_TITLE_MAP[ModalType.Edit];
                break;

            case ModalType.Delete:
                dialogContent = (
                    <div className="delete-dialog">
                        <div className="delete-movie-text">Are you sure you want to delete this movie?</div>
                        <button className="delete-movie-btn" onClick={this.onDeleteMovie}>
                            Confirm
                        </button>
                    </div>
                );
                dialogTitle = DIALOG_TITLE_MAP[ModalType.Delete];
                break;

            default:
                dialogTitle = 'Not Supported';
                break;
        }

        return (
            <div className="modal-container">
                <Dialog title={dialogTitle} children={dialogContent} onCloseClick={this.onCloseDialog} />
            </div>
        );
    }

    render() {
        return (
            <div className={this.state.showModal ? 'app-wrapper blur' : 'app-wrapper'}>
                {this.state.selectedMovieId ? (
                    <MovieDetails movie={this.getSelectedMovieById(this.state.selectedMovieId)} />
                ) : (
                    <div className="search-container">
                        <SearchForm initialQuery={this.state.query} onSearch={this.onSearch} />
                    </div>
                )}
                <div className="content">
                    <div className="control-panel">
                        <GenreSelect
                            genres={this.genre}
                            selectedGenre={this.state.selectedGenre}
                            onSelect={this.onSelectGenre}
                        />
                        <SortControl selectedSorting={this.state.selectedSorting} onSelect={this.onSelectSorting} />
                    </div>
                    <div className="movie-list">
                        {this.state.movies.map(movie => (
                            <MovieTile movie={movie} key={movie.id} onSelect={this.onSelectMovie} />
                        ))}
                    </div>
                </div>
                {this.renderModal()}
            </div>
        );
    }
}

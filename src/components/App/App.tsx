import React from 'react';
import './App.css';
import { ModalType, Movie } from '../../models';
import { movies } from '../../testData';
import Dialog from '../Dialog/Dialog';
import MovieForm from '../MovieForm/MovieForm';
import { DIALOG_TITLE_MAP } from '../../constants';
import MovieListPage from '../MovieListPage/MovieListPage';

interface AppState {
    movies: Movie[];
    showModal: boolean;
    modalType: ModalType | string;
}

export default class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            movies,
            showModal: true,

            // change modalType to see use cases
            modalType: ModalType.Edit,
        };
    }

    onFormSubmit = (movie: Movie) => {
        console.log('Submitted movie id is ' + movie.title);
    };

    onCloseDialog = () => {
        this.setState({ showModal: false });
    };

    onDeleteMovie = () => {
        console.log('Movie was deleted');
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
                <MovieListPage />
                {this.renderModal()}
            </div>
        );
    }
}

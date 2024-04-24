import { useState } from 'react';
import './App.css';
import { ModalType, Movie } from '../../models';
import { movies } from '../../testData';
import Dialog from '../Dialog/Dialog';
import MovieForm from '../MovieForm/MovieForm';
import { DIALOG_TITLE_MAP } from '../../constants';
import MovieListPage from '../MovieListPage/MovieListPage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm';
import MovieDetailsWrapper from '../MovieDetails/MovieDetailsWrapper';

export default function App() {
    const [showModal, setShowModal] = useState(true);
    const [modalType /**setModalType*/] = useState(ModalType.Edit); // change modalType to see use cases

    const onFormSubmit = (movie: Movie) => {
        console.log('Submitted movie id is ' + movie.title);
    };

    const onCloseDialog = () => {
        setShowModal(false);
    };

    const onDeleteMovie = () => {
        console.log('Movie was deleted');
    };

    const renderModal = () => {
        if (!showModal) return null;
        let dialogContent = null;
        let dialogTitle = '';

        switch (modalType) {
            case ModalType.Add:
                dialogContent = <MovieForm onSubmit={onFormSubmit} />;
                dialogTitle = DIALOG_TITLE_MAP[ModalType.Add];
                break;

            case ModalType.Edit:
                dialogContent = <MovieForm initialMovie={movies[0]} onSubmit={onFormSubmit} />;
                dialogTitle = DIALOG_TITLE_MAP[ModalType.Edit];
                break;

            case ModalType.Delete:
                dialogContent = (
                    <div className="delete-dialog">
                        <div className="delete-movie-text">Are you sure you want to delete this movie?</div>
                        <button className="delete-movie-btn" onClick={onDeleteMovie}>
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
                <Dialog title={dialogTitle} children={dialogContent} onCloseClick={onCloseDialog} />
            </div>
        );
    };

    return (
        <div className={showModal ? 'app-wrapper blur' : 'app-wrapper'}>
            <Router>
                <Routes>
                    <Route path="/" element={<MovieListPage />}>
                        <Route index element={<SearchForm />} />
                        <Route path=":movieId" element={<MovieDetailsWrapper />} />
                    </Route>
                </Routes>
            </Router>
            {renderModal()}
        </div>
    );
}

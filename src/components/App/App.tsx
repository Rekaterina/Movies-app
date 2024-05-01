import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieListPage from '../MovieListPage/MovieListPage';
import SearchForm from '../SearchForm/SearchForm';
import MovieDetailsWrapper from '../MovieDetails/MovieDetailsWrapper';
import AddMovieForm from '../AddMovieForm/AddMovieForm';
import EditMovieForm from '../EditMovieForm/EditMovieForm';

export default function App() {
    const [shownModal, setIsShownModal] = useState(false);

    return (
        <div className={shownModal ? 'app-wrapper blur' : 'app-wrapper'}>
            <Router>
                <Routes>
                    <Route path="/" element={<MovieListPage />}>
                        <Route path="/" element={<SearchForm />}>
                            <Route path="new" element={<AddMovieForm setIsShownModal={setIsShownModal} />} />
                            <Route path=":movieId/edit" element={<EditMovieForm setIsShownModal={setIsShownModal} />} />
                        </Route>
                        <Route path=":movieId" element={<MovieDetailsWrapper />} />
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

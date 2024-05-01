import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditMovieForm.css';
import { API_PATH, DIALOG_TITLE_MAP } from '../../constants';
import Dialog from '../Dialog/Dialog';
import { ModalType, Movie } from '../../models';
import MovieForm from '../MovieForm/MovieForm';
import axios from 'axios';

interface EditMovieFormProps {
    setIsShownModal: Dispatch<SetStateAction<boolean>>;
}

const EditMovieForm: React.FC<EditMovieFormProps> = ({ setIsShownModal }) => {
    const navigate = useNavigate();
    const { movieId } = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        setIsShownModal(true);
        const source = axios.CancelToken.source();
        axios
            .get(`${API_PATH}/${movieId}`, {
                cancelToken: source.token,
            })
            .then(response => {
                setMovie(response.data);
            })
            .catch(error => console.error('Failed to fetch movie', error));

        return () => {
            setIsShownModal(false);
            source.cancel('Component unmounted');
        };
    }, [setIsShownModal, movieId]);

    const onFormSubmit = (value: Omit<Movie, 'id'>) => {
        if (movie) {
            const editedMovie = { id: movie.id, ...value };
            axios
                .put(API_PATH, editedMovie)
                .then(response => navigate(`/${response.data.id}`))
                .catch(error => console.error('Error:', error));
        }
    };

    return (
        <div className="modal-container">
            <Dialog
                title={DIALOG_TITLE_MAP[ModalType.Edit]}
                children={movie && <MovieForm onSubmit={onFormSubmit} initialMovie={movie} />}
                onCloseClick={() => navigate('/')}
            />
        </div>
    );
};

export default EditMovieForm;

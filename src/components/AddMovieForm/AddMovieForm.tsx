import React, { useEffect, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddMovieForm.css';
import { API_PATH, DIALOG_TITLE_MAP } from '../../constants';
import Dialog from '../Dialog/Dialog';
import { ModalType, Movie } from '../../models';
import MovieForm from '../MovieForm/MovieForm';
import axios from 'axios';

interface AddMovieFormProps {
    setIsShownModal: Dispatch<SetStateAction<boolean>>;
}

const AddMovieForm: React.FC<AddMovieFormProps> = ({ setIsShownModal }) => {
    const navigate = useNavigate();

    useEffect(() => {
        setIsShownModal(true);
        return () => setIsShownModal(false);
    }, [setIsShownModal]);

    const onFormSubmit = (value: Omit<Movie, 'id'>) => {
        axios
            .post(API_PATH, value)
            .then(response => navigate(`/${response.data.id}`))
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className="modal-container">
            <Dialog
                title={DIALOG_TITLE_MAP[ModalType.Add]}
                children={<MovieForm onSubmit={onFormSubmit} />}
                onCloseClick={() => navigate('/')}
            />
        </div>
    );
};

export default AddMovieForm;

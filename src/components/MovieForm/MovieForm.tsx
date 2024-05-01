import React from 'react';
import { Field, Form, Formik } from 'formik';
import Select from 'react-select';
import * as Yup from 'yup';
import { Genre, Movie } from '../../models';
import { useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../helpers';
import './MovieForm.css';

const MovieFormSchema = Yup.object().shape({
    title: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    release_date: Yup.date().required('Required'),
    poster_path: Yup.string().url('Invalid URL').required('Required'),
    vote_average: Yup.number()
        .min(0, 'Rating must be between 0 and 10')
        .max(10, 'Rating must be between 0 and 10')
        .required('Required'),
    genres: Yup.array().min(1, 'At least one genre is required').required('Required'),
    runtime: Yup.number().min(1, 'Must be a positive number').required('Required'),
    overview: Yup.string().required('Required'),
});

const genreOptions = Object.values(Genre).reduce(
    (options, genre) => {
        if (genre !== Genre.All) {
            const capitalizedGenre = capitalizeFirstLetter(genre) as Genre;
            return [...options, { value: capitalizedGenre, label: capitalizedGenre }];
        }
        return options;
    },
    [] as Array<{ value: Genre; label: Genre }>,
);

interface MovieFormProps {
    initialMovie?: Movie;
    onSubmit: (values: Omit<Movie, 'id'>) => void;
}

const MovieForm: React.FC<MovieFormProps> = ({ initialMovie, onSubmit }) => {
    const navigate = useNavigate();

    return (
        <Formik
            initialValues={{
                title: initialMovie?.title || '',
                release_date: initialMovie?.release_date || '',
                poster_path: initialMovie?.poster_path || '',
                vote_average: initialMovie?.vote_average || 0,
                genres: initialMovie?.genres || [],
                runtime: initialMovie?.runtime || 0,
                overview: initialMovie?.overview || '',
            }}
            validationSchema={MovieFormSchema}
            onSubmit={(values, { setSubmitting }) => {
                onSubmit(values);
                setSubmitting(false);
            }}
        >
            {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                <Form>
                    <div className="form-container">
                        <label className="wide">
                            Title:
                            <Field type="text" name="title" />
                            <span>{errors.title && touched.title && errors.title}</span>
                        </label>
                        <label className="narrow">
                            Release date:
                            <Field type="date" name="release_date" />
                            <span>{errors.release_date && touched.release_date && errors.release_date}</span>
                        </label>
                        <label className="wide">
                            Movie url:
                            <Field type="text" name="poster_path" />
                            <span>{errors.poster_path && touched.poster_path && errors.poster_path}</span>
                        </label>
                        <label className="narrow">
                            Rating:
                            <Field type="number" min="0" max="10" step="0.1" name="vote_average" />
                            <span>{errors.vote_average && touched.vote_average && errors.vote_average}</span>
                        </label>
                        <label className="wide">
                            Genre:
                            <Select
                                isMulti
                                name="genres"
                                options={genreOptions}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                value={values.genres?.map(genre => ({ value: genre, label: genre }))}
                                onChange={option =>
                                    setFieldValue(
                                        'genres',
                                        option?.map(item => item.value),
                                    )
                                }
                            />
                            <span>{errors.genres && touched.genres && errors.genres}</span>
                        </label>
                        <label className="narrow">
                            Runtime:
                            <Field type="number" name="runtime" />
                            <span>{errors.runtime && touched.runtime && errors.runtime}</span>
                        </label>
                        <label>
                            Overview:
                            <Field as="textarea" name="overview" />
                            <span>{errors.overview && touched.overview && errors.overview}</span>
                        </label>
                        <div className="btn-container">
                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                            <button type="reset" onClick={() => navigate('/')}>
                                Reset
                            </button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default MovieForm;

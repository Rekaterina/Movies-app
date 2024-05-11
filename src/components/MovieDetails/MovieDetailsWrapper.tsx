import { useParams } from 'react-router-dom';
import axios from 'axios';
import MovieDetails from '../MovieDetails/MovieDetails';
import { useEffect, useState } from 'react';
import { API_PATH } from '../../constants';

export default function MovieDetailsWrapper() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        axios
            .get(`${API_PATH}/${movieId}`, {
                cancelToken: source.token,
            })
            .then(response => {
                setMovie(response.data);
            })
            .catch(error => console.error('Failed to fetch movie', error));
    }, [movieId]);

    return movie ? <MovieDetails movie={movie} /> : <p>Loading...</p>;
}

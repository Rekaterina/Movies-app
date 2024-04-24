import { useNavigate, useSearchParams } from 'react-router-dom';
import './MovieDetails.css';
import { Movie } from '../../models';

interface MovieDetailsProps {
    movie: Movie | undefined;
}

function MovieDetails({ movie }: MovieDetailsProps) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const getMovieDuration = (mins: number) => {
        let hours = Math.floor(mins / 60);
        let minutes = mins % 60;
        return `${hours}h ${minutes}min`;
    };

    const onBackToSearch = () => {
        navigate('/?' + searchParams.toString());
    };

    return (
        <div className="movie-detail-container">
            <div className="back" onClick={onBackToSearch}>
                &#8592;
            </div>
            <div className="movie-details">
                {movie ? (
                    <>
                        <img className="image" src={movie.poster_path} alt={movie.title} />
                        <div className="details">
                            <div className="title-container">
                                <span className="title">{movie.title}</span>
                                <span className="rating">{movie.vote_average}</span>
                            </div>
                            <div className="genres">{movie.genres.join(', ')}</div>
                            <div className="additional-info">
                                <span>{movie.release_date?.split('-')[0]}</span>
                                <span>{getMovieDuration(movie.runtime)}</span>
                            </div>
                            <div className="overview">{movie.overview}</div>
                        </div>
                    </>
                ) : (
                    <div className="empty-details">No Movie Details</div>
                )}
            </div>
        </div>
    );
}

export default MovieDetails;

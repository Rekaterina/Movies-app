import { Component } from 'react';
import './MovieDetails.css';
import { Movie } from '../../models';

export interface MovieDetailsProps {
    movie: Movie | undefined;
}

export default class MovieDetails extends Component<MovieDetailsProps> {
    getMovieDuration(mins: number) {
        let hours = Math.floor(mins / 60);
        let minutes = mins % 60;
        return `${hours}h ${minutes}min`;
    }

    render() {
        const { movie } = this.props;

        return (
            <div className="movie-details">
                {movie != null ? (
                    <>
                        <img className="image" src={movie.poster_path} alt={movie.title}></img>
                        <div className="details">
                            <div className="title-container">
                                <span className="title">{movie.title}</span>
                                <span className="rating">{movie.vote_average}</span>
                            </div>
                            <div className="genres">{movie.genres.join(', ')}</div>
                            <div className="additional-info">
                                <span>{movie.release_date?.split('-')[0]}</span>
                                <span>{this.getMovieDuration(movie.runtime)}</span>
                            </div>
                            <div className="overview">{movie.overview}</div>
                        </div>
                    </>
                ) : (
                    <div className="empty-details">No Movie Details</div>
                )}
            </div>
        );
    }
}

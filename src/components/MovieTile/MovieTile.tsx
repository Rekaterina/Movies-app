import { Component } from 'react';
import { Movie } from '../../models';
import './MovieTile.css';

export interface MovieTileProps {
    movie: Movie;
    onSelect: (id: number) => void;
}

export default class MovieTile extends Component<MovieTileProps> {
    render() {
        const { id, title, poster_path, genres, release_date } = this.props.movie;
        return (
            <div className="movie-tile" onClick={() => this.props.onSelect(id)}>
                <img className="image" src={poster_path} alt={title}></img>
                <div className="details">
                    <div className="title-container">
                        <span className="title">{title}</span>
                        <span className="year">{release_date?.split('-')[0]}</span>
                    </div>
                    <div className="genres">{genres.join(', ')}</div>
                </div>
            </div>
        );
    }
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../../models';
import './MovieTile.css';

export interface MovieTileProps {
    movie: Movie;
    onSelect: (id: number) => void;
}

const MovieTile: React.FC<MovieTileProps> = ({ movie, onSelect }) => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsMenuVisible(prevIsMenuVisible => !prevIsMenuVisible);
    };

    const editMovie = (event: React.MouseEvent) => {
        event.stopPropagation();
        navigate(`/${id}/edit`);
    };

    const deleteMovie = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    const { id, title, poster_path, genres, release_date } = movie;

    return (
        <div className="movie-tile" onClick={() => onSelect(id)}>
            <div className="item-menu" onClick={toggleMenu}>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
            {isMenuVisible && (
                <div className="menu-dropdown">
                    <button type="button" className="menu-close-button" onClick={toggleMenu}>
                        <span>&times;</span>
                    </button>
                    <div className="menu-option" onClick={editMovie}>
                        Edit
                    </div>
                    <div className="menu-option" onClick={deleteMovie}>
                        Delete
                    </div>
                </div>
            )}
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
};

export default MovieTile;

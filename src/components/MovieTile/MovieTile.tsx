import { useState } from 'react';
import { Movie } from '../../models';
import styles from './MovieTile.module.css';
import { useRouter } from 'next/router';

export interface MovieTileProps {
    movie: Movie;
    onSelect: (id: number) => void;
}

const MovieTile: React.FC<MovieTileProps> = ({ movie, onSelect }) => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const router = useRouter();

    const handleNavigate = (url: string) => {
        router.push(url);
    };

    const toggleMenu = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsMenuVisible(prevIsMenuVisible => !prevIsMenuVisible);
    };

    const editMovie = (event: React.MouseEvent) => {
        event.stopPropagation();
        handleNavigate(`/${id}/edit`);
    };

    const deleteMovie = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    const { id, title, poster_path, genres, release_date } = movie;

    return (
        <div className={styles['movie-tile']} onClick={() => onSelect(id)}>
            <div className={styles['item-menu']} onClick={toggleMenu}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
            </div>
            {isMenuVisible && (
                <div className={styles['menu-dropdown']}>
                    <button type="button" className={styles['menu-close-button']} onClick={toggleMenu}>
                        <span className={styles['close-icon']}>&times;</span>
                    </button>
                    <div className={styles['menu-option']} onClick={editMovie}>
                        Edit
                    </div>
                    <div className={styles['menu-option']} onClick={deleteMovie}>
                        Delete
                    </div>
                </div>
            )}
            <img className={styles.image} src={poster_path} alt={title}></img>
            <div className={styles.details}>
                <div className={styles['title-container']}>
                    <span className={styles.title}>{title}</span>
                    <span className={styles.year}>{release_date?.split('-')[0]}</span>
                </div>
                <div className={styles.genres}>{genres.join(', ')}</div>
            </div>
        </div>
    );
};

export default MovieTile;

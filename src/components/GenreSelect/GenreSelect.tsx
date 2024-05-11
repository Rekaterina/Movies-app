import { Component } from 'react';
import styles from './GenreSelect.module.css';
import { Genre } from '../../models';

export interface GenreSelectProps {
    genres: Genre[];
    selectedGenre: Genre;
    onSelect: (genre: Genre) => void;
}

export default class GenreSelect extends Component<GenreSelectProps> {
    render() {
        return (
            <div className={`${styles['genre-container']}`}>
                {this.props.genres.map(genre => (
                    <form action="/" method="get" key={genre}>
                        <input type="hidden" name="genre" value={genre} />
                        <button
                            type="submit"
                            className={`${styles.genre} ${genre === this.props.selectedGenre ? styles.active : ''}`}
                        >
                            {genre}
                        </button>
                    </form>
                ))}
            </div>
        );
    }
}

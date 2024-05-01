import { Component } from 'react';
import './GenreSelect.css';
import { Genre } from '../../models';

export interface GenreSelectProps {
    genres: Genre[];
    selectedGenre: Genre;
    onSelect: (genre: Genre) => void;
}

export default class GenreSelect extends Component<GenreSelectProps> {
    render() {
        return (
            <div>
                {this.props.genres.map(genre => (
                    <button
                        className={`genre ${genre === this.props.selectedGenre ? 'active' : ''}`}
                        key={genre}
                        onClick={() => this.props.onSelect(genre)}
                    >
                        {genre}
                    </button>
                ))}
            </div>
        );
    }
}

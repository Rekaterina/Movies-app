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
            <div className="genre">
                {this.props.genres.map(genre => (
                    <button
                        key={genre}
                        style={genre === this.props.selectedGenre ? { color: 'blue' } : {}}
                        onClick={() => this.props.onSelect(genre)}
                    >
                        {genre}
                    </button>
                ))}
            </div>
        );
    }
}

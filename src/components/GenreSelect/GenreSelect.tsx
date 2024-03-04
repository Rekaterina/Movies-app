import { Component } from 'react';
import './GenreSelect.css';

export enum Genre {
    All = 'All',
    Documentary = 'Documentary',
    Comedy = 'Comedy',
    Horror = 'Horror',
    Crime = 'Crime',
}

interface GenreSelectorProps {
    genres: Genre[];
    selectedGenre: Genre;
    onSelect: (genre: Genre) => void;
}

export default class GenreSelector extends Component<GenreSelectorProps> {
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

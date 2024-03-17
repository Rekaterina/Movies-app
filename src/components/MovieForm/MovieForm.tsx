import React from 'react';
import Select, { OnChangeValue } from 'react-select';
import { Genre, Movie } from '../../models';
import './MovieForm.css';

interface MovieFormProps {
    initialMovie?: Movie;
    onSubmit: (movie: Movie) => void;
}

interface MultiSelectOption {
    label: string;
    value: Genre;
}

class MovieForm extends React.Component<MovieFormProps, { selectedGenres: MultiSelectOption[] }> {
    constructor(props: MovieFormProps) {
        super(props);
        this.state = {
            selectedGenres:
                this.props.initialMovie?.genres.map((genre: Genre) => ({ value: genre, label: genre })) || [],
        };
    }

    handleGenresChange = (selectedGenres: OnChangeValue<MultiSelectOption, true>) => {
        this.setState({
            selectedGenres: selectedGenres ? (Array.isArray(selectedGenres) ? selectedGenres : [selectedGenres]) : [],
        });
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formValues = Object.fromEntries(new FormData(event.currentTarget)) as Partial<Movie>;
        formValues.genres = this.state.selectedGenres.map((option: MultiSelectOption) => option.value);
        this.props.onSubmit?.(formValues as Movie);
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form-container">
                <label className="wide">
                    <span>Title:</span>
                    <input type="text" name="title" placeholder="Title" defaultValue={this.props.initialMovie?.title} />
                </label>
                <label className="narrow">
                    <span>Release date:</span>
                    <input
                        type="date"
                        name="release_date"
                        placeholder="Select Date"
                        defaultValue={this.props.initialMovie?.release_date}
                    />
                </label>
                <label className="wide">
                    <span>Movie url:</span>
                    <input
                        type="text"
                        name="poster_path"
                        placeholder="https://"
                        defaultValue={this.props.initialMovie?.poster_path}
                    />
                </label>
                <label className="narrow">
                    <span>Rating:</span>
                    <input
                        type="text"
                        name="vote_average"
                        placeholder="7.8"
                        defaultValue={this.props.initialMovie?.vote_average}
                    />
                </label>
                <label className="wide">
                    <span>Genre:</span>
                    <Select
                        isMulti
                        name="genres"
                        options={Object.values(Genre).map((genre: Genre) => ({ value: genre, label: genre }))}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        value={this.state.selectedGenres}
                        onChange={this.handleGenresChange}
                    />
                </label>

                <label className="narrow">
                    <span>Runtime:</span>
                    <input
                        type="text"
                        name="runtime"
                        placeholder="Minutes"
                        defaultValue={this.props.initialMovie?.runtime}
                    />
                </label>

                <label>
                    <span>Overview:</span>
                    <textarea
                        name="overview"
                        placeholder="Movie description"
                        defaultValue={this.props.initialMovie?.overview}
                    />
                </label>
                <div className="btn-container">
                    <button type="submit">Submit</button>
                    <button type="reset">Reset</button>
                </div>
            </form>
        );
    }
}

export default MovieForm;

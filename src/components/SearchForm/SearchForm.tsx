import React from 'react';
import './SearchForm.css';

export interface SearchFormProps {
    initialQuery: string;
    onSearch: (query: string) => void;
}

interface SearchFormState {
    query: string;
}

export default class SearchForm extends React.Component<SearchFormProps, SearchFormState> {
    constructor(props: SearchFormProps) {
        super(props);
        this.state = {
            query: this.props.initialQuery || '',
        };
    }

    updateQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ query: event.target.value });
    };

    handleSearch = () => {
        this.props.onSearch(this.state.query);
    };

    handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            this.handleSearch();
        }
    };

    render() {
        return (
            <div className="search-form">
                <input
                    className="search-input"
                    value={this.state.query}
                    onChange={this.updateQuery}
                    onKeyDown={this.handleKeyDown}
                    placeholder="What do you want to watch?"
                />
                <button className="btn-search" onClick={this.handleSearch}>
                    Search
                </button>
            </div>
        );
    }
}

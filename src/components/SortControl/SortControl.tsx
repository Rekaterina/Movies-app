import { ChangeEvent, Component } from 'react';
import './SortControl.css';
import { SortOption } from '../../models';

interface SortControlState {
    sorting: SortOption;
}

export interface SortControlProps {
    selectedSorting: SortOption;
    onSelect: (option: SortOption) => void;
}

export default class SortControl extends Component<SortControlProps, SortControlState> {
    constructor(props: SortControlProps) {
        super(props);
        this.state = {
            sorting: this.props.selectedSorting,
        };
    }

    updateSelectedSorting = (event: ChangeEvent<HTMLSelectElement>) => {
        this.setState({ sorting: event.target.value as SortOption });
        this.props.onSelect(event.target.value as SortOption);
    };

    render() {
        return (
            <div className="sort-control">
                <label htmlFor="sort" className="label">
                    Sort by:
                </label>
                <select id="sort" value={this.state.sorting} onChange={this.updateSelectedSorting}>
                    <option value={SortOption.ReleaseDate}>{SortOption.ReleaseDate}</option>
                    <option value={SortOption.Title}>{SortOption.Title}</option>
                </select>
            </div>
        );
    }
}

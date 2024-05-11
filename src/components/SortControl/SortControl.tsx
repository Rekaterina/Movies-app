import { ChangeEvent, Component } from 'react';
import styles from './SortControl.module.css';
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
            <form action="/" method="get" className={styles['sort-control']}>
                <label htmlFor="sortBy" className={styles['sort-control-label']}>
                    Sort by
                </label>
                <select
                    className={styles['sort-control-select']}
                    id="sortBy"
                    name="sortBy"
                    value={this.state.sorting}
                    onChange={this.updateSelectedSorting}
                >
                    <option className={styles['sort-control-option']} value={SortOption.ReleaseDate}>
                        {SortOption.ReleaseDate}
                    </option>
                    <option className={styles['sort-control-option']} value={SortOption.Title}>
                        {SortOption.Title}
                    </option>
                </select>
                <input type="submit" value="Sort" />
            </form>
        );
    }
}

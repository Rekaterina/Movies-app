import React from 'react';
import styles from './SearchForm.module.css';
import { useRouter } from 'next/router';

export default function SearchForm() {
    const router = useRouter();
    const [query, setQuery] = React.useState(router.query.query || '');

    const updateQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        if (query) {
            router.push(`/?query=${query}`);
        }
    };

    return (
        <div className={styles['search-container']}>
            <div className={styles['search-input-label']}>Find your movie</div>
            <form method="get" onSubmit={handleSearch}>
                <input
                    className={styles['search-input']}
                    value={query}
                    onChange={updateQuery}
                    placeholder="What do you want to watch?"
                    name="query"
                />
                <button className={styles['btn-search']} type="submit">
                    Search
                </button>
            </form>
        </div>
    );
}

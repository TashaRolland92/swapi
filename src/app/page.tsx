'use client';

import styles from './page.module.css';
import {
    isTransportCategory, 
    sortResults, 
    type SwapiItem, 
    type TransportItemData,
    type SortOption
} from './utils/swapi';
import { useEffect, useState } from 'react';

type CategoryState = {
    searchTerm: string;
    sort: SortOption;
    results: SwapiItem[];
};

type TransportProps = {
    item: TransportItemData;
};

const TransportItem = ({ item }: TransportProps) => (
    <ul className={styles.transport_item}>
        <li><span className={styles.bold}>Name:</span> {item.name}</li>
        <li><span className={styles.bold}>Model:</span> {item.model}</li>
        <li><span className={styles.bold}>Manufacturer:</span> {item.manufacturer}</li>
        <li><span className={styles.bold}>Cost:</span> {item.cost_in_credits}</li>
        <li><span className={styles.bold}>Length:</span> {item.length}</li>
        <li><span className={styles.bold}>Crew:</span> {item.crew}</li>
        <li><span className={styles.bold}>Passengers:</span> {item.passengers}</li>
        <li><span className={styles.bold}>Cargo capacity:</span> {item.cargo_capacity}</li>
    </ul>
);

// SWAPI paginates results, so this helper function fetches every page
// to match the acceptance criteria of showing the full list of data.
const fetchAllResults = async (
    category: string,
    searchTerm: string
) => {
    let allResults: SwapiItem[] = [];
    let nextUrl = `https://swapi.dev/api/${category}/?search=${searchTerm}`;

    while (nextUrl) {
        const response = await fetch(nextUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch Star Wars data');
        }

        const data = await response.json();

        allResults = [...allResults, ...data.results];
        nextUrl = data.next;
    }

    return allResults;
};

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState<string>('people');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedSort, setSelectedSort] = useState<SortOption>('name');

    const [activeCategory, setActiveCategory] = useState<string>('people');
    const [activeSearch, setActiveSearch] = useState<string>('');
    const [activeSort, setActiveSort] = useState<SortOption>('name');

    const [recentCategory, setRecentCategory] = useState<string | null>(null);
    const [results, setResults] = useState<SwapiItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Stores search term, sort option, and results per category - so users can switch categories without losing previous state.
    const [savedCategoryState, setSavedCategoryState] = useState<Record<string, CategoryState>>({});
    const [hasSearched, setHasSearched] = useState<boolean>(false);

    const handleSearch = async () => {
        setHasSearched(true);
        setLoading(true);
        setError(null);

        try {
            setActiveCategory(selectedCategory);
            setActiveSearch(searchTerm);
            setActiveSort(selectedSort);
            setRecentCategory(selectedCategory);

            const allResults = await fetchAllResults(
                selectedCategory,
                searchTerm
            );

            const sortedResults = sortResults(allResults, selectedSort);

            setSavedCategoryState((prevState) => ({
                ...prevState,
                [selectedCategory]: {
                    searchTerm,
                    sort: selectedSort,
                    results: sortedResults,
                },
            }));

            setResults(sortedResults);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const savedState = savedCategoryState[selectedCategory];

        if (savedState) {
            // Load previous state 
            setSearchTerm(savedState.searchTerm);
            setSelectedSort(savedState.sort);
            setResults(savedState.results);
            // Update active states
            setActiveCategory(selectedCategory);
            setActiveSearch(savedState.searchTerm);
            setActiveSort(savedState.sort);
        } else {
            // No previous state for this category yet - reset form controls only
            setSearchTerm('');
            setSelectedSort('name');
        }
    }, [selectedCategory, savedCategoryState]);

    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Star Wars Search</h1>
                    <p className={styles.description}>Search Star Wars data by category.</p>
                </header>

                <section className={styles.controls} aria-label="Search controls">
                    <div className={styles.fieldGroup}>
                        <label className={styles.label} htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            className={styles.select}
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="people">People</option>
                            <option value="planets">Planets</option>
                            <option value="films">Films</option>
                            <option value="species">Species</option>
                            <option value="starships">Starships</option>
                            <option value="vehicles">Vehicles</option>
                        </select>
                    </div>

                    <div className={styles.fieldGroup}>
                        <label className={styles.label} htmlFor="search">Search</label>
                        <input
                            id="search"
                            name="search"
                            type="text"
                            placeholder="Search by name or title"
                            className={styles.input}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className={styles.fieldGroup}>
                        <label className={styles.label} htmlFor="sort">Sort by</label>
                        <select
                            id="sort"
                            name="sort"
                            className={styles.select}
                            value={selectedSort}
                            onChange={(e) => setSelectedSort(e.target.value)}
                        >
                            <option value="name">Name / Title (A-Z)</option>
                            <option value="name-desc">Name / Title (Z-A)</option>
                        </select>
                    </div>

                    <div className={styles.fieldGroup}>
                        <button
                            className={styles.button} // can reuse input style for simplicity - change later
                            type="button"
                            onClick={handleSearch}
                            disabled={loading}
                        >
                            {loading ? 'Searching...' : 'Search'}
                        </button>
                    </div>
                </section>

                <section className={styles.search_summary} aria-label="Search summary" aria-live="polite">
                    <p>Most recently searched category:{' '} {recentCategory ? recentCategory : 'None'}</p>

                    {!loading && !error && results.length > 0 && (
                        <p>
                            Showing {results.length} result{results.length === 1 ? '' : 's'} for:{' '}
                            <span className={styles.italic}>{activeCategory}</span>
                            {activeSearch ? (
                                <>
                                    {' '}matching <span className={styles.italic}>{activeSearch}</span>
                                </>
                            ) : (
                                ' (all items)'
                            )}
                            {' '}sorted by:{' '}
                            <span className={styles.italic}>
                                {activeSort === 'name' ? 'A-Z' : 'Z-A'}
                            </span>
                        </p>
                    )}
                </section>

                <section className={styles.results} aria-live="polite">
                    <h2 className={styles.results_heading}>Results</h2>
                    {loading ? (
                        <div className={styles.loading_state} role="status" aria-live="polite">
                            <div className={styles.spinner} aria-hidden="true"></div>
                            <p className={styles.placeholder}>Loading search results...</p>
                        </div>
                    ) : error ? (
                        <p className={styles.error} role="alert">Error: {error}</p>
                    ) : results.length === 0 ? (
                        <p className={styles.result_placeholder}>
                            {hasSearched ? 'No results found for your search.' : 'Results will appear here.'}
                        </p>
                    ) : (
                        <ul className={styles.result_list}>
                            {results.map((item) => (
                                <li key={item.url} className={styles.result_item}>
                                    {isTransportCategory(activeCategory) ? (
                                        <TransportItem item={item as TransportItemData} />
                                    ) : (
                                        item.name || item.title
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </main>
    );
}

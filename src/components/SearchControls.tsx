import controls from './Controls.module.scss';
import form from './Form.module.scss';
import button from './Buttons.module.scss';

import { type CategoryOption, type SortOption } from '../app/utils/swapi';

type SearchControlsProps = {
    selectedCategory: CategoryOption;
    searchTerm: string;
    selectedSort: SortOption;
    loading: boolean;

    setSelectedCategory: (value: CategoryOption) => void;
    setSearchTerm: (value: string) => void;
    setSelectedSort: (value: SortOption) => void;
    handleSearch: () => void;    
};

export default function SearchControls({
	selectedCategory,
	searchTerm,
	selectedSort,
	loading,
	setSelectedCategory,
	setSearchTerm,
	setSelectedSort,
	handleSearch,
}: SearchControlsProps){
    return(
        <section className={controls.controls} aria-label="Search controls">
            <div className={form.fieldGroup}>
                <label className={form.label} htmlFor="category">Category</label>
                <select
                    id="category"
                    name="category"
                    className={form.select}
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as CategoryOption)}
                >
                    <option value="people">People</option>
                    <option value="planets">Planets</option>
                    <option value="films">Films</option>
                    <option value="species">Species</option>
                    <option value="starships">Starships</option>
                    <option value="vehicles">Vehicles</option>
                </select>
            </div>

            <div className={form.fieldGroup}>
                <label className={form.label} htmlFor="search">Search</label>
                <input
                    id="search"
                    name="search"
                    type="text"
                    placeholder="Search by name or title"
                    className={form.input}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className={form.fieldGroup}>
                <label className={form.label} htmlFor="sort">Sort by</label>
                <select
                    id="sort"
                    name="sort"
                    className={form.select}
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value as SortOption)}
                >
                    <option value="name">Name / Title (A-Z)</option>
                    <option value="name-desc">Name / Title (Z-A)</option>
                </select>
            </div>

            <div className={form.fieldGroup}>
                <button
                    className={button.button} // can reuse input style for simplicity - change later
                    type="button"
                    onClick={handleSearch}
                    disabled={loading}
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>
        </section>
    );
}

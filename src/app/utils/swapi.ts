export type SwapiItem = {
	url: string;
	name?: string;
	title?: string;
};

export type SortOption = 'name' | 'name-desc';

export type CategoryOption =
	| 'people'
	| 'planets'
	| 'films'
	| 'species'
	| 'starships'
	| 'vehicles';

export type TransportItemData = SwapiItem & {
	name: string;
	model: string;
	manufacturer: string;
	cost_in_credits: string;
	length: string;
	crew: string;
	passengers: string;
	cargo_capacity: string;
};

export const sortResults = (
	results: SwapiItem[],
	sort: SortOption
): SwapiItem[] => {
	return [...results].sort((a, b) => {
		const aValue = a.name || a.title || '';
		const bValue = b.name || b.title || '';

		if (sort === 'name') {
			return aValue.localeCompare(bValue);
		}

		return bValue.localeCompare(aValue);
	});
};

export const isTransportCategory = (category: string): boolean => {
	return category === 'vehicles' || category === 'starships';
};

export const isTransportItem = (item: SwapiItem): item is TransportItemData => {
	return (
		typeof item.name === 'string' &&
		typeof (item as Partial<TransportItemData>).model === 'string' &&
		typeof (item as Partial<TransportItemData>).manufacturer === 'string' &&
		typeof (item as Partial<TransportItemData>).cost_in_credits === 'string' &&
		typeof (item as Partial<TransportItemData>).length === 'string' &&
		typeof (item as Partial<TransportItemData>).crew === 'string' &&
		typeof (item as Partial<TransportItemData>).passengers === 'string' &&
		typeof (item as Partial<TransportItemData>).cargo_capacity === 'string'
	);
};

// SWAPI paginates results, so this helper function fetches every page
// to match the acceptance criteria of showing the full list of data.
export const fetchAllResults = async (
	category: CategoryOption,
	searchTerm: string
): Promise<SwapiItem[]> => {
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

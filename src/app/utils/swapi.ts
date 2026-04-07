export type SwapiItem = {
	url: string;
	name?: string;
	title?: string;
};

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
	sort: string
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

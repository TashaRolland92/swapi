import { describe, expect, it } from 'vitest';
import { isTransportCategory, sortResults, type SwapiItem } from './swapi';

describe('sortResults', () => {
	it('sorts results A-Z by name or title', () => {
		const results: SwapiItem[] = [
			{ url: '2', name: 'Luke Skywalker' },
			{ url: '1', name: 'Anakin Skywalker' },
			{ url: '3', title: 'A New Hope' },
		];

		const sorted = sortResults(results, 'name');

		expect(sorted.map((item) => item.name || item.title)).toEqual([
			'A New Hope',
			'Anakin Skywalker',
			'Luke Skywalker',
		]);
	});

	it('sorts results Z-A by name or title', () => {
		const results: SwapiItem[] = [
			{ url: '2', name: 'Luke Skywalker' },
			{ url: '1', name: 'Anakin Skywalker' },
			{ url: '3', title: 'A New Hope' },
		];

		const sorted = sortResults(results, 'name-desc');

		expect(sorted.map((item) => item.name || item.title)).toEqual([
			'Luke Skywalker',
			'Anakin Skywalker',
			'A New Hope',
		]);
	});
});

describe('isTransportCategory', () => {
	it('returns true for vehicles and starships', () => {
		expect(isTransportCategory('vehicles')).toBe(true);
		expect(isTransportCategory('starships')).toBe(true);
	});

	it('returns false for non-transport categories', () => {
		expect(isTransportCategory('people')).toBe(false);
		expect(isTransportCategory('planets')).toBe(false);
		expect(isTransportCategory('films')).toBe(false);
	});
});

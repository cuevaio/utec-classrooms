import { getData } from '../get-data';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	let day_start = new Date(`${params.date}T14:00:00.000Z`);

	return getData(day_start);
}

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	let start_date = new Date('2023-09-27');

	let dates = new Array(20).fill(0).map((_, i) => {
		let date = new Date(start_date);
		date.setDate(date.getDate() + i);
		return {
			date: date.toISOString().split('T')[0]
		};
	});

	return dates;
}

export const prerender = true;

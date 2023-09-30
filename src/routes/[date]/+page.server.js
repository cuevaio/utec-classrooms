import { getData } from '../get-data';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	let day_start = new Date(`${params.date}T14:00:00.000Z`);

	let free = await getData(day_start);

	return {
		free
	};
}

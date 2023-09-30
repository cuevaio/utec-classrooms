import { getData } from '../get-data';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	let classroom_name = params.classroom;
	let day_start = new Date(`${params.date}T11:00:00.000Z`);
	let day_end = new Date(`${params.date}T11:00:00.000Z`);
	day_end.setDate(day_end.getDate() + 1);

	return getData(classroom_name, day_start, day_end);
}

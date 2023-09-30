import { getData } from './get-data';
import { classrooms } from '$lib/classrooms';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	let classroom_name = params.classroom;
	let day_start = new Date(`${params.date}T11:00:00.000Z`);
	let day_end = new Date(`${params.date}T11:00:00.000Z`);
	day_end.setDate(day_end.getDate() + 1);

	return getData(classroom_name, day_start, day_end);
}

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	let start_date = new Date('2023-09-27');

	/** @typedef {{ date: string, classroom: string }} ClassroomDate */

	/** @type {ClassroomDate[]} */
	let classroom_date_combinations = [];

	for (let classroom of classrooms) {
		let dates = new Array(20).fill(0).map((_, i) => {
			let date = new Date(start_date);
			date.setDate(date.getDate() + i);
			return {
				date: date.toISOString().split('T')[0],
				classroom: classroom.name
			};
		});

		classroom_date_combinations = classroom_date_combinations.concat(dates);
	}

	return classroom_date_combinations;
}

export const prerender = true;

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
	/** @typedef {{ date: string, classroom: string }} ClassroomDate */

	/** @type {ClassroomDate[]} */
	let classroom_date_combinations = [];

	for (let classroom of classrooms) {
		new Array(7).fill(0).map((_, i) => {
			let yesterday = new Date();
			yesterday.setDate(yesterday.getDate() - i);

			let tomorrow = new Date();
			tomorrow.setDate(tomorrow.getDate() + i);
			classroom_date_combinations.push({
				date: yesterday.toISOString().split('T')[0],
				classroom: classroom.name
			});
			classroom_date_combinations.push({
				date: tomorrow.toISOString().split('T')[0],
				classroom: classroom.name
			});
		});

		classroom_date_combinations.push({
			date: new Date().toISOString().split('T')[0],
			classroom: classroom.name
		});
	}

	return classroom_date_combinations;
}

export const prerender = 'auto';

import { BYPASS_TOKEN } from '$env/static/private';

export const config = {
	isr: {
		// Expiration time (in seconds) before the cached asset will be re-generated by invoking the Serverless Function.
		// Setting the value to `false` means it will never expire.
		expiration: 36000,

		// Random token that can be provided in the URL to bypass the cached version of the asset, by requesting the asset
		// with a __prerender_bypass=<token> cookie.
		//
		// Making a `GET` or `HEAD` request with `x-prerender-revalidate: <token>` will force the asset to be re-validated.
		bypassToken: BYPASS_TOKEN
	}
};

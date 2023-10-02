import { getData } from '../get-data';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	let day_start = new Date(`${params.date}T14:00:00.000Z`);

	return getData(day_start);
}

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	/** @type {{date:string}[]} */
	let dates = [
		{
			date: new Date().toISOString().split('T')[0]
		}
	];

	new Array(10).fill(0).forEach((_, i) => {
		let tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + i);

		dates.push({
			date: tomorrow.toISOString().split('T')[0]
		});
	});

	console.log(dates);
	return dates;
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

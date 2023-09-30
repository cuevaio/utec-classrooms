import { getData } from './get-data';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	let options = { timeZone: 'America/Lima' };

	let now = new Date();
	let limaDateTime = now.toLocaleDateString('en-US', options);

	let [today_month, today_day, today_year] = limaDateTime.split('/');
	today_month = today_month.padStart(2, '0');
	today_day = today_day.padStart(2, '0');

	let day_start = new Date(`${today_year}-${today_month}-${today_day}T14:00:00.000Z`);

	return getData(day_start);
}

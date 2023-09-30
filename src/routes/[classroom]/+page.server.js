import { getData } from './get-data';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	let options = { timeZone: 'America/Lima' };

	let now = new Date();
	let limaDateTime = now.toLocaleDateString('en-US', options);

	let [today_month, today_day, today_year] = limaDateTime.split('/');
	today_month = today_month.padStart(2, '0');
	today_day = today_day.padStart(2, '0');

	let tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	let [tomorrow_month, tomorrow_day, tomorrow_year] = tomorrow
		.toLocaleDateString('en-US', options)
		.split('/');
	tomorrow_month = tomorrow_month.padStart(2, '0');
	tomorrow_day = tomorrow_day.padStart(2, '0');

	let today_iso = new Date(`${today_year}-${today_month}-${today_day}T11:00:00.000Z`);
	let tomorrow_iso = new Date(`${tomorrow_year}-${tomorrow_month}-${tomorrow_day}T11:00:00.000Z`);

	return getData(params.classroom, today_iso, tomorrow_iso);
}

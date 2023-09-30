import { getXataClient } from '$lib/xata';
import { error } from '@sveltejs/kit';
let xata = getXataClient();

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	let classroom_name = params.classroom;
	let now_datetime_string = '2023-09-28T20:39:13.156Z';

	let today_5am = new Date(now_datetime_string);
	today_5am.setHours(10, 0, 0, 0);

	let tomorrow_5am = new Date(now_datetime_string);
	tomorrow_5am.setDate(tomorrow_5am.getDate() + 1);
	tomorrow_5am.setHours(10, 0, 0, 0);

	console.log('today_5am', today_5am);
	console.log('tomorrow_5am', tomorrow_5am);

	let classroom = await xata.db.classroom
		.filter({
			name: classroom_name
		})
		.getFirst();

	if (!classroom) {
		error(404, 'Classroom not found');
	}

	let events = await xata.db.event
		.select(['*', 'classroom.*', 'course.*', 'host.*'])
		.filter({
			$all: [
				{
					start: {
						$ge: today_5am
					}
				},
				{
					start: {
						$lt: tomorrow_5am
					}
				},
				{
					classroom: {
						name: classroom_name
					}
				}
			]
		})
		.getPaginated();

	// sort events by start time

	events.records.sort((a, b) => {
		if (!!a.start && !!b.start) {
			return a.start.getTime() - b.start.getTime();
		}
		return 0;
	});

	return {
		events: events.records,
		classroom
	};
}

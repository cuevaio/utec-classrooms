import { getXataClient } from '$lib/xata';
import { error } from '@sveltejs/kit';
let xata = getXataClient();

/**
 *
 * @param {string} classroom_name
 * @param {Date} day_start
 * @param {Date} day_end
 */

export async function getData(classroom_name, day_start, day_end) {
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
						$ge: day_start
					}
				},
				{
					end: {
						$le: day_end
					}
				},
				{
					classroom: classroom?.id ?? ''
				}
			]
		})
		.getPaginated();

	events.records.sort((a, b) => {
		if (!!a.start && !!b.start) {
			return a.start.getTime() - b.start.getTime();
		}
		return 0;
	});

	let yesterday = new Date(day_start);
	yesterday.setDate(yesterday.getDate() - 1);

	return {
		events: events.records,
		classroom,
    today: day_start.toISOString().split('T')[0],
		tomorrow: day_end.toISOString().split('T')[0],
		yesterday: yesterday.toISOString().split('T')[0]
	};
}

import { getXataClient } from '$lib/xata';

let xata = getXataClient();

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	let now_datetime_string = '2023-09-28T20:39:13.156Z';

	let desired_start = new Date(now_datetime_string);
	desired_start.setMinutes(0, 0, 0);

	let desired_end = new Date(now_datetime_string);
	desired_end.setMinutes(0, 0, 0);
	desired_end.setHours(desired_end.getHours() + 1);

	let intercepting_events = await xata.db.event
		.select(['*', 'classroom.*', 'course.*', 'host.*'])
		.filter({
			$any: [
				{
					$all: [
						{
							start: {
								$le: desired_start
							}
						},
						{
							end: {
								$ge: desired_end
							}
						}
					]
				},
				{
					$all: [
						{
							start: {
								$le: desired_start
							}
						},
						{
							end: {
								$gt: desired_start
							}
						}
					]
				},
				{
					$all: [
						{
							start: {
								$lt: desired_end
							}
						},
						{
							end: {
								$ge: desired_end
							}
						}
					]
				}
			]
		})
		.getPaginated({
			pagination: {
				size: 100
			}
		});

	/** @type {import("$lib/xata/types").ClassroomRecord[]} */
	let bussy_classrooms = [];

	intercepting_events.records.forEach((event) => {
		if (!!event.classroom) {
			if (!bussy_classrooms.find((c) => c.id === event.classroom?.id)) {
				bussy_classrooms.push(event.classroom);
			}
		}
	});

	// sort by name
	bussy_classrooms.sort((a, b) => {
		if (!a.name) {
			return -1;
		}
		if (!b.name) {
			return 1;
		}

		if (a.name < b.name) {
			return -1;
		} else if (a.name > b.name) {
			return 1;
		} else {
			return 0;
		}
	});

	let free_classrooms_page = await xata.db.classroom
		.filter({
			id: {
				$none: bussy_classrooms.map((c) => c?.id)
			}
		})
		.getPaginated({
			pagination: {
				size: 100
			}
		});

	let free_classrooms = free_classrooms_page.records;

	// sort by name

	free_classrooms.sort((a, b) => {
		if (!a.name) {
			return -1;
		}
		if (!b.name) {
			return 1;
		}

		if (a.name < b.name) {
			return -1;
		} else if (a.name > b.name) {
			return 1;
		} else {
			return 0;
		}
	});
	return {
		classrooms: {
			free: free_classrooms,
			bussy: bussy_classrooms
		}
	};
}

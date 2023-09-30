import { getXataClient } from '$lib/xata';
import { classrooms } from '$lib/classrooms';

let xata = getXataClient();

/**
 * @param {Date} day_start
 */
export async function getData(day_start) {
	let free = await Promise.all(
		new Array(10).fill(0).map(async (_, i) => {
			let desired_start = new Date(day_start);
			desired_start.setHours(desired_start.getHours() + i);

			let desired_end = new Date(day_start);
			desired_end.setHours(desired_end.getHours() + i + 1);

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
				if (!a.name || !b.name) {
					return 0;
				}

				if (a.name < b.name) {
					return -1;
				}
				return 1;
			});

			/** @type {Set<string>} */
			let free_classrooms_set = new Set();

			classrooms.forEach((classroom) => {
				if (!bussy_classrooms.find((c) => c.name === classroom.name)) {
					free_classrooms_set.add(classroom.name);
				}
			});

			let free_classrooms = Array.from(free_classrooms_set);

			free_classrooms.sort((a, b) => {
				if (a < b) {
					return -1;
				}
				return 1;
			});

			return {
				start: desired_start,
				end: desired_end,
				classrooms: free_classrooms
			};
		})
	);

	return free;
}

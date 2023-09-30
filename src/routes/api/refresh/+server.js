import { getXataClient } from '$lib/xata';
import { parseDatetime } from '$lib/utils/parse-datetime';

let xata = getXataClient();

/**
 * @typedef {Object} RawEvent
 * @property {string} title - The title of the event.
 * @property {string} start - The start date and time of the event.
 * @property {string} end - The end date and time of the event.
 */

/**
 * @typedef {Object} Course
 * @property {string} code - The code of the course.
 * @property {string} name - The name of the course.
 */

/**
 * @typedef {Object} Host
 * @property {string} name - The name of the host.
 */

/**
 * @typedef {Object} Event
 * @property {Date} start - The start date and time of the event.
 * @property {Date} end - The end date and time of the event.
 * @property {string} classroom - The classroom id of the event.
 * @property {string | undefined} name - The name of the event.
 * @property {string | undefined} course - The course id of the event.
 * @property {string | undefined} host - The host id of the event.
 */

/** @type {import('./$types').RequestHandler} */
export async function POST({ url }) {
	try {
		let classroom_name = url.searchParams.get('classroom_name') ?? 'A101';
		let utec_token =
			url.searchParams.get('utec_token') ??
			'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2OTYwNDM2NDMsInN1YiI6ImFudGhvbnkuY3VldmFAdXRlYy5lZHUucGUiLCJhdWRpZW5jZSI6InVuZGV0ZXJtaW5lZCIsImNyZWF0ZWQiOjE2OTYwMjkyNDMyNjh9.VoPK1YwXxxgnDLcds4cYNntNpNmLg0kW9uPosUFvXaABqSgmLu-QDUOjX_I3xX4dYleN9FScyjuuNMnVKTjz9A';

		let classroom = await xata.db.classroom.filter({ name: classroom_name }).getFirstOrThrow();

		if (!classroom.code) {
			throw new Error(`Classroom ${classroom_name} xata record has no code.`);
		}

		let today = new Date();

		let todayMinus2 = new Date();
		todayMinus2.setDate(todayMinus2.getDate() - 2);

		let todayPlus7 = new Date();
		todayPlus7.setDate(todayPlus7.getDate() + 7);

		let todayPlus9 = new Date();
		todayPlus9.setDate(todayPlus9.getDate() + 9);

		let queryparams = new URLSearchParams({
			codaula: String(classroom.code),
			fechainicial: today.toLocaleDateString('es-PE'),
			fechafinal: todayPlus7.toLocaleDateString('es-PE')
		});

		let response = await fetch(
			`https://api.utec.edu.pe/reserva-api/calendarioaula/eventos?${queryparams.toString()}`,
			{
				method: 'GET',
				headers: {
					'X-Auth-Token': utec_token
				}
			}
		);
		let data = await response.json();

		/** @type {RawEvent[]} */
		const raw_events = data.content;

		let existing_courses_page = await xata.db.course.getPaginated({
			pagination: {
				size: 200
			}
		});
		let existing_courses = existing_courses_page.records;

		let existing_hosts_page = await xata.db.host.getPaginated({
			pagination: {
				size: 200
			}
		});
		let existing_hosts = existing_hosts_page.records;

		let existing_events_page = await xata.db.event
			.filter({
				$all: [
					{
						'classroom.id': classroom.id
					},
					{
						start: {
							$gt: todayMinus2
						}
					},
					{
						end: {
							$lt: todayPlus9
						}
					}
				]
			})
			.getPaginated({
				pagination: {
					size: 200
				}
			});
		let existing_events = existing_events_page.records;

		/** @type {Map<string, Course>} */
		const coursesMap = new Map();

		/** @type {Map<string, Host>} */
		const hostsMap = new Map();

		/** @type {Event[]} */
		const events = [];

		raw_events.forEach(({ title, start, end }) => {
			let event_start = parseDatetime(start);
			let event_end = parseDatetime(end);
			let classroom_id = classroom.id;

			/** @type {string | undefined} */
			let event_host = undefined;

			/** @type {string | undefined} */
			let event_course = undefined;

			/** @type {string | undefined} */
			let event_name = undefined;

			if (title.includes('-') || title.includes(':')) {
				/** @type {string | undefined} */
				let host = undefined;

				/** @type {string | undefined} */
				let course = undefined;

				if (title.includes('Docente\t')) {
					host = title.split('Docente\t')[1];
					let parts = title.split('-');
					let course_code = parts[0];
					if (!existing_courses.find((c) => c.code === course_code)) {
						let name = parts[1].trim();
						coursesMap.set(course_code, { code: course_code, name });
					}
					course = course_code;
				} else if (title.startsWith(':')) {
					let parts = title.split('-');
					if (parts.length > 1) {
						host = parts[parts.length - 1].trim();
						event_name = parts.slice(0, -1).join(' ').replace(':', '').trim();
					} else {
						event_name = title.replace(':', '').trim();
					}
				}

				if (host && !existing_hosts.find((h) => h.name === host)) {
					hostsMap.set(host, { name: host });
				}

				event_host = host;
				event_course = course;
			} else {
				event_name = title;
			}

			let existing_event = existing_events.find(
				(e) =>
					e.start?.toISOString() === event_start.toISOString() &&
					e.end?.toISOString() === event_end.toISOString()
			);

			if (!existing_event) {
				events.push({
					start: event_start,
					end: event_end,
					classroom: classroom_id,
					name: event_name,
					course: event_course,
					host: event_host
				});
			}
		});

		let courses = [...coursesMap.values()];
		let hosts = [...hostsMap.values()];

		let created_courses = await xata.db.course.create(courses);
		let created_hosts = await xata.db.host.create(hosts);

		let xata_courses = [...created_courses, ...existing_courses];
		let xata_hosts = [...created_hosts, ...existing_hosts];

		events.forEach((event) => {
			if (event.course) {
				let xata_course = xata_courses.find((c) => c.code === event.course);
				if (xata_course) {
					event.course = xata_course.id;
				}
			}
			if (event.host) {
				let xata_host = xata_hosts.find((h) => h.name === event.host);
				if (xata_host) {
					event.host = xata_host.id;
				}
			}
		});

		let created_events = await xata.db.event.create(events);

		return new Response(
			JSON.stringify({
				created: created_events.length
			}),
			{
				status: 200
			}
		);
	} catch (e) {
		console.log(e);
		return new Response(JSON.stringify(e));
	}
}

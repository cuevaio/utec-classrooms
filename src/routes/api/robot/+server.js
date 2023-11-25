import { classrooms } from '$lib/classrooms';
import { UTEC_TOKEN } from '$env/static/private';

import { dev } from '$app/environment';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	try {
		let utec_token = url.searchParams.get('utec_token') ?? UTEC_TOKEN;
		let sessionId = url.searchParams.get('sessionId') ?? '123';

		if (!utec_token || !sessionId) {
			return new Response(
				JSON.stringify({
					error: 'Missing utec_token or sessionId'
				}),
				{
					status: 401
				}
			);
		}

		let created = 0;
		let deleted = 0;

		// array of classroom names that failed to refresh
		/** @type {string[]} */
		let errors = [];

		await Promise.all(
			classrooms.map(async (classroom) => {
				let queryparams = new URLSearchParams({
					classroom_name: classroom.name,
					utec_token,
					sessionId
				});

				let base_url = 'http://localhost:5173';
				if (!dev) {
					base_url = `https://utec-classrooms.vercel.app`;
				}

				let response = await fetch(`${base_url}/api/refresh/?${queryparams.toString()}`, {
					method: 'GET'
				});

				if (response.ok) {
					let json = await response.json();
					created += json.created;
					deleted += json.deleted;

					console.log(
						`Refreshed ${classroom.name}. ${json.created} created, ${json.deleted} deleted.`
					);
				} else {
					errors.push(classroom.name);
					console.log(`Error with classroom ${classroom.name}`);
				}
			})
		);

		return new Response(
			JSON.stringify({
				created,
				deleted,
				errors
			}),
			{
				status: 200
			}
		);
	} catch (e) {
		console.log(e);
		return new Response(JSON.stringify(e), {
			status: 500
		});
	}
}

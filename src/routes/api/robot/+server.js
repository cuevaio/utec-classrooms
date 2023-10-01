import { classrooms } from '$lib/classrooms';
import { UTEC_TOKEN } from '$env/static/private';

import { dev } from '$app/environment';

/** @type {import('./$types').RequestHandler} */
export async function POST({ url }) {
	try {
		let utec_token = url.searchParams.get('utec_token') ?? UTEC_TOKEN;

		await Promise.all(
			classrooms.map(async (classroom) => {
				try {
					let queryparams = new URLSearchParams({
						classroom_name: classroom.name,
						utec_token
					});

					let base_url = 'http://localhost:5173';
					if (!dev) {
						base_url = `https://utec-classrooms.vercel.app`;
					}

					await fetch(`${base_url}/api/refresh?${queryparams.toString()}`, {
						method: 'POST'
					});
				} catch (e) {
					console.log(e);
				}
			})
		);
		return new Response(
			JSON.stringify({
				created: 'hi mom!'
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

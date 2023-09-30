import { classrooms } from '$lib/classrooms';
import { UTEC_TOKEN } from '$env/static/private';

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
					await fetch(`http://localhost:5173/api/refresh?${queryparams.toString()}`, {
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

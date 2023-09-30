import { classrooms } from '$lib/classrooms';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	try {
		await Promise.all(
			classrooms.map(async (classroom) => {
				try {
					let queryparams = new URLSearchParams({
						classroom_name: classroom.name
					});
					let response = await fetch(
						`https://utec-classrooms.vercel.app/api/refresh?${queryparams.toString()}`,
						{
							method: 'POST'
						}
					);
					let data = await response.json();

					console.log(data);
				} catch (e) {
					console.log(e);
				}
			})
		);
		return new Response(
			JSON.stringify({
				created: 'hi'
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

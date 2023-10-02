<script>
	import { selected_classroom } from '$lib/stores/selected-classroom';
	import { goto } from '$app/navigation';
	import Layout from '$lib/components/Layout.svelte';
	import DayNavigation from '$lib/components/DayNavigation.svelte';

	/** @type {import('./$types').PageServerData} */
	export let data;

	/** @param {string} classroom*/
	function clickHandler(classroom) {
		if ($selected_classroom === classroom) {
			goto(`/${data.today}/${classroom}`);
			return;
		} else {
			selected_classroom.set(classroom);
		}
	}
</script>

<svelte:head>
	<title>Aulas libres en UTEC | {data.today}</title>
	<meta name="description" content={`Aulas libres en UTEC el ${data.today}.`} />
</svelte:head>

{#if !data.error}
	<Layout>
		<svelte:fragment slot="navbar">
			<a href="/">Salones libres en UTEC</a>
			<a class="" href="https://x.com/cuevantn">by cuevantn</a>
		</svelte:fragment>

		<h1 class="text-2xl font-bold text-center capitalize">
			{new Date(`${data.today}T14:00:00.000Z`).toLocaleDateString('es-PE', {
				weekday: 'long'
			})}
			{data.today}
		</h1>

		<div class="grid grid-cols-1 gap-6 my-8">
			{#each data.free as { classrooms, start }}
				<div
					class="hour-container flex flex-wrap gap-2 col-span-3 border-t pt-4 relative pb-6 -mb-6 px-2"
				>
					<div class="absolute -top-3 bg-white text-gray-700 rounded-full border text-sm h-6 w-16">
						<div class="w-full h-full flex items-center justify-center">
							{start.toLocaleTimeString('es-PE', {
								hour: '2-digit',
								minute: '2-digit'
							})}
						</div>
					</div>

					{#each classrooms as c}
						<button
							on:click={() => clickHandler(c)}
							data-active={$selected_classroom === c}
							class="classroom-button rounded-lg border bg-gray-200 px-2 h-8 flex items-center justify-center"
						>
							{c}
						</button>
					{/each}
				</div>
			{/each}
		</div>

		<svelte:fragment slot="footer">
			<DayNavigation yesterday={data.yesterday} today={data.today} tomorrow={data.tomorrow} />
		</svelte:fragment>
	</Layout>
{/if}

<style lang="postcss">
	.hour-container:has(> [data-active='true']) {
		background-color: theme('colors.gray.100');
	}

	.hour-container {
		transition: background-color 0.3s ease-in-out;
	}

	.hour-container:has(> [data-active='true']) [data-active='false'] {
		background-color: theme('colors.white');
	}
	.hour-container:has(> [data-active='true']) [data-active='true'] {
		background-color: theme('colors.red.700');
		color: theme('colors.white');
	}

	[data-active] {
		transition-property: background-color, color;
		transition-duration: 0.3s;
		transition-timing-function: ease-in-out;
	}
</style>

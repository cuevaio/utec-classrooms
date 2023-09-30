<script>
	import { goto } from '$app/navigation';

	/** @type {import('./$types').PageServerData} */
	export let data;

	let active = 'A703';

	/** @param {string} classroom*/
	function clickHandler(classroom) {
		if (active === classroom) {
			goto(`/${data.today}/${classroom}`);
			return;
		} else {
			active = classroom;
		}
	}
</script>

<svelte:head>
	<title>Aulas libres en UTEC | {data.today}</title>
	<meta name="description" content={`Aulas libres en UTEC el ${data.today}.`} />
</svelte:head>

<div class="flex flex-wrap justify-between items-center sm:h-24 mb-4">
	<h2 class="text-lg">Salones libres en UTEC</h2>
	<a class="" href="https://x.com/cuevantn">by cuevantn</a>
</div>

<h1 class="text-2xl font-bold text-center">
	{new Date(`${data.today}T14:00:00.000Z`)
		.toLocaleDateString('es-PE', {
			weekday: 'long'
		})
		.toLocaleUpperCase()}
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
					data-active={active === c}
					class="classroom-button rounded-lg border bg-gray-200 px-2 h-8 flex items-center justify-center"
				>
					{c}
				</button>
			{/each}
		</div>
	{/each}
</div>

<div class="flex h-24 items-center space-x-4">
	<button class="border w-32 h-8 rounded-lg" on:click={() => goto(`/${data.yesterday}`)}
		>-1 día</button
	>
	<button class="border w-32 h-8 rounded-lg" on:click={() => goto(`/${data.tomorrow}`)}
		>+1 día</button
	>
</div>

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

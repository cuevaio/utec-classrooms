<script>
	import { goto } from '$app/navigation';

	/** @type {import('./$types').PageServerData} */
	export let data;

	/** @type {number[]}*/
	let hours_to_hide = [];

	$: {
		hours_to_hide = [];
		data.events.forEach((e) => {
			if (!!e.end && !!e.start) {
				// @ts-ignore
				let long = Math.abs(e.end - e.start) / 36e5;

				if (long > 1) {
					for (let i = 1; i < long; i++) {
						hours_to_hide = [
							...hours_to_hide,
							Number(
								new Date(e.start.getTime() + i * 36e5).toLocaleTimeString('es-PE', {
									hour: '2-digit',
									hour12: false
								})
							)
						];
					}
				}
			}
		});
	}

	$: console.log(hours_to_hide);
</script>

<svelte:head>
	<title>{data.classroom?.name} | {data.today}</title>
	<meta
		name="description"
		content={`El horario del aula ${data.classroom?.name} el ${data.today}.`}
	/>
</svelte:head>

<div class="flex flex-wrap justify-between items-center sm:h-24 mb-4">
	<a href={`/${data.today}`} class="text-lg"
		>{new Date(`${data.today}T14:00:00.000Z`)
			.toLocaleDateString('es-PE', {
				weekday: 'long'
			})
			.toLocaleUpperCase()}
		{data.today}</a
	>
	<a class="" href="https://x.com/cuevantn">by cuevantn</a>
</div>

<h1 class="text-2xl font-bold text-center">{data.classroom?.name}</h1>

<div
	style="grid-template-rows: repeat(15, minmax(0, 1fr));"
	class="relative grid grow gap-2 min-h-[800px] my-8"
>
	{#each data.events as event}
		{@const start =
			Number(
				event.start
					?.toLocaleTimeString('es-PE', {
						hour: '2-digit',
						minute: '2-digit'
					})
					.split(':')[0]
			) - 6}
		{@const end =
			Number(
				event.end
					?.toLocaleTimeString('es-PE', {
						hour: '2-digit',
						minute: '2-digit'
					})
					.split(':')[0]
			) - 6}
		<div
			style={`grid-row-start: ${start}; grid-row-end: ${end};`}
			class="rounded-lg flex bg-gray-200 items-center justify-center mx-2 mt-1.5"
		>
			<p style="text-wrap: balance;" class="z-5 w-2/3 text-center">
				{event.name || event.course?.name}
			</p>
		</div>
	{/each}
	<div
		style="grid-template-rows: repeat(15, minmax(0, 1fr));"
		class="absolute top-0 bottom-0 right-0 left-0 grid gap-2 -z-5"
	>
		{#each new Array(15).fill(0) as _, i}
			<div class="relative data-[hide=true]:opacity-0" data-hide={hours_to_hide.includes(i + 7)}>
				<div
					class="ml-2 absolute -top-3 border h-6 w-16 rounded-full text-gray-700 bg-white flex items-center justify-center text-sm z-10"
				>
					{String(i + 7).padStart(2, '0')}:00
				</div>
				<div class="absolute right-0 left-0 h-px bg-gray-200 z-0" />
			</div>
		{/each}
	</div>
</div>

<div class="flex h-24 items-center space-x-4">
	<button
		class="border w-32 h-8 rounded-lg"
		on:click={() => goto(`/${data.yesterday}/${data.classroom?.name}`)}>-1 día</button
	>
	<button
		class="border w-32 h-8 rounded-lg"
		on:click={() => goto(`/${data.tomorrow}/${data.classroom?.name}`)}>+1 día</button
	>
</div>

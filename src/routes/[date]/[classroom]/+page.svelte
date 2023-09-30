<script>
	import { goto } from '$app/navigation';

	/** @type {import('./$types').PageServerData} */
	export let data;
</script>

<svelte:head>
	<title>{data.classroom?.name} | {data.today}</title>
	<meta
		name="description"
		content={`El horario del aula ${data.classroom?.name} el ${data.today}.`}
	/>
</svelte:head>

<div class="flex flex-wrap justify-between items-center sm:h-32 mb-4">
	<h1 class="text-2xl font-bold">{data.classroom?.name}</h1>
	<a class="" href={`/${data.today}`}>{data.today}</a>
</div>

<ul>
	{#each data.events as event}
		<li>
			{event.name || event.course?.name} || {event.start?.toLocaleTimeString()} ||
			{event.end?.toLocaleTimeString()}
		</li>
	{/each}
</ul>

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

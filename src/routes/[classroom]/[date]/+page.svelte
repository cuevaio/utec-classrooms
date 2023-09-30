<script>
	import { goto } from '$app/navigation';

	/** @type {import('./$types').PageServerData} */
	export let data;
</script>

<h1>{data.classroom?.name}</h1>

<ul>
	{#each data.events as event}
		<li>
			{event.name || event.course?.name} || {event.start?.toLocaleTimeString()} ||
			{event.end?.toLocaleTimeString()}
		</li>
	{/each}
</ul>

<button on:click={() => goto(`/${data.classroom?.name}/${data.yesterday}`)}>Yesterday</button>
<button on:click={() => goto(`/${data.classroom?.name}/${data.tomorrow}`)}>Tomorrow</button>

<script>
	/** @type {import('./$types').PageServerData} */
	export let data;
</script>

<h1>{data.classroom?.name}</h1>

<ul>
	{#each data.events as event}
		<li>
			{event.name || event.course?.name} || {event.start?.toLocaleString()} ||
			{event.end?.toLocaleString()}
		</li>
	{/each}
</ul>

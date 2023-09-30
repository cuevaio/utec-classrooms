<script>
	/** @type {import('./$types').PageServerData} */
	export let data;
</script>

<h1>Holi</h1>
<p>Construyendo una app para la comunidad de utec</p>

<h2>Classrooms</h2>

<h3>Bussy</h3>
<ul>
	{#each data.classrooms.bussy as bc}
		<li>{bc.name}</li>
	{/each}
</ul>

<h3>Free</h3>
<ul>
	{#each data.classrooms.free as fc}
		<li>{fc.name}</li>
	{/each}
</ul>

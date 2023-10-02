<script>
	/** @type {string}*/
	export let yesterday;

	/** @type {string}*/
	export let today;

	/** @type {string}*/
	export let tomorrow;

	/** @type {string | undefined | null}*/
	export let classroom = undefined;

	let date_lima = new Date();
	date_lima.setHours(date_lima.getHours() - 5);
	let actual_today = date_lima.toISOString().split('T')[0];

	import { goto } from '$app/navigation';
</script>

<button
	on:click={() => goto(`/${yesterday}/${classroom || ''}`)}
	class="border w-32 h-8 rounded-lg flex items-center justify-center"
	>{actual_today === today ? 'ayer' : '-1 día'}</button
>

<button
	class="border w-32 h-8 rounded-lg flex items-center justify-center"
	on:click={() => goto(`/${tomorrow}/${classroom || ''}`)}
	>{actual_today === today ? 'mañana' : '+1 día'}</button
>

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

	// @ts-ignore
	$: diffTimeNext = Math.abs(new Date(tomorrow) - new Date());
	$: diffDaysNext = Math.ceil(diffTimeNext / (1000 * 60 * 60 * 24));

	// @ts-ignore
	$: diffTimePrev = Math.abs(new Date() - new Date(yesterday));
	$: diffDaysPrev = Math.ceil(diffTimePrev / (1000 * 60 * 60 * 24));
</script>

{#if diffDaysPrev < 15}
	<a
		class="border w-32 h-8 rounded-lg flex items-center justify-center"
		href={`/${yesterday}/${classroom || ''}`}>{actual_today === today ? 'ayer' : '-1 día'}</a
	>
{:else}
	<div class="w-32 h-8" />
{/if}

{#if diffDaysNext < 15}
	<a
		class="border w-32 h-8 rounded-lg flex items-center justify-center"
		href={`/${tomorrow}/${classroom || ''}`}>{actual_today === today ? 'mañana' : '+1 día'}</a
	>
{:else}
	<div class="w-32 h-8" />
{/if}

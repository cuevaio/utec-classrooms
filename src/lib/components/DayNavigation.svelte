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
</script>

<a
	class="border w-32 h-8 rounded-lg flex items-center justify-center"
	href={`/${yesterday}/${classroom || ''}`}>{actual_today === today ? 'ayer' : '-1 día'}</a
>
<a
	class="border w-32 h-8 rounded-lg flex items-center justify-center"
	href={`/${tomorrow}/${classroom || ''}`}>{actual_today === today ? 'mañana' : '+1 día'}</a
>

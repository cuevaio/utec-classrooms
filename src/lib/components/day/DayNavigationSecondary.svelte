<script>
	import { ChevronsRight, ChevronsLeft } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/stores';

	$: today = $page.params.date || new Date().toISOString().split('T')[0];

	$: today_date = new Date(today + 'T14:00:00.000Z');

	$: yesterday_date = new Date(today_date.getTime() - 7 * 24 * 60 * 60 * 1000);
	$: yesterday = yesterday_date.toISOString().split('T')[0];

	$: tomorrow_date = new Date(today_date.getTime() + 7 * 24 * 60 * 60 * 1000);
	$: tomorrow = tomorrow_date.toISOString().split('T')[0];

	// (weeks since 2023-08-14) + 1
	$: week_number =
		Math.floor(
			(today_date.getTime() - new Date('2023-08-14T14:00:00.000Z').getTime()) /
				(7 * 24 * 60 * 60 * 1000)
		) + 1;

	$: classroom = $page.params.classroom;

	import { goto } from '$app/navigation';
</script>

<div class="flex justify-between items-center sticky bottom-0 z-[9999] bg-background p-2">
	<Button
		variant="outline"
		size="icon"
		on:click={() => goto(`/${yesterday}/${classroom || ''}`)}
		data-day={yesterday}
	>
		<ChevronsLeft className="h-4 w-4" />
	</Button>

	<h1 class="font-bold">Semana {week_number}</h1>

	<Button
		variant="outline"
		size="icon"
		on:click={() => goto(`/${tomorrow}/${classroom || ''}`)}
		data-day={tomorrow}
	>
		<ChevronsRight className="h-4 w-4" />
	</Button>
</div>

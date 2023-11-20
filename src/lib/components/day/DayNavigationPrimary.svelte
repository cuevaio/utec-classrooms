<script>
	import { page } from '$app/stores';
	import { ListMinus } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';

	import { buttonVariants } from '$lib/components/ui/button';

	$: today =
		$page.params.date ||
		new Date(new Date().getTime() - 5 * 60 * 60 * 1000).toISOString().split('T')[0];

	$: today_date = new Date(today + 'T14:00:00.000Z');

	$: today_month = today_date
		.toLocaleDateString('es-PE', {
			month: 'short'
		})
		.replace('.', '')
		.toLocaleUpperCase();

	$: today_day = today_date.toLocaleDateString('es-PE', {
		day: '2-digit'
	});

	$: classroom = $page.params.classroom;

	import { goto } from '$app/navigation';
	import { cn } from '$lib/utils';

	$: first_day_of_week = new Date(today_date.getTime() - today_date.getDay() * 24 * 60 * 60 * 1000);
</script>

<div class="p-2 sticky top-0 z-[9999] bg-background">
	<div class="flex justify-between items-center mb-4">
		<div class="flex space-x-1 items-center">
			<a href="/" class={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'rounded-full')}>
				<ListMinus class="w-4 h-4" />
			</a>
			<a href="/" class="font-bold text-lg">UTEC Classrooms</a>
		</div>
		<a href={`/${today}`}>
			<h1>
				<span class="font-bold mr-1 text-lg">{today_month}</span><span class="font-black text-xl"
					>{today_day}</span
				>
			</h1>
		</a>
	</div>

	<div class="flex justify-between">
		{#each ['D', 'L', 'M', 'X', 'J', 'V', 'S'] as week_day, index}
			{@const the_date = new Date(first_day_of_week.getTime() + index * 24 * 60 * 60 * 1000)
				.toISOString()
				.split('T')[0]}
			<Button
				variant={the_date === today ? 'default' : 'outline'}
				size="icon"
				data-day={the_date}
				on:click={() => goto(`/${the_date}/${classroom || ''}`)}>{week_day}</Button
			>
		{/each}
	</div>
</div>

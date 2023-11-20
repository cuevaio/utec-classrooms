<script>
	import { buttonVariants } from '$lib/components/ui/button';

	const sponsors = [
		'Sebastian R',
		'Josue T',
		'Joaquin S',
		'Ricardo R',
		'Cielo P',
		'Gianpierre S',
		'Francisco P',
		'Farid R'
	];
</script>

<div class="max-w-[700px] px-8 mx-auto h-[100dvh] overflow-auto [scrollbar-gutter:stable]">
	<h1 class="font-bold text-4xl my-2">Sponsors</h1>
	<p class="my-2">Gente que permite que todos podamos encontrar salones libres en UTEC ❤️</p>
	<ul class="list list-disc list-inside my-2">
		{#each sponsors as sponsor}
			<li>
				{sponsor}
			</li>
		{/each}
	</ul>
	<div class="flex justify-center w-full my-8">
		<a
			href="/"
			class={buttonVariants({
				variant: 'default'
			})}>Encontrar salones</a
		>
	</div>
</div>

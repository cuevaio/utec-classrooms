<script>
	import DayNavigationPrimary from '$lib/components/day/DayNavigationPrimary.svelte';
	import DayNavigationSecondary from '$lib/components/day/DayNavigationSecondary.svelte';
</script>

<div class="max-w-[700px] px-8 mx-auto h-[100dvh] overflow-auto [scrollbar-gutter:stable]">
	<DayNavigationPrimary />
	<slot />
	<DayNavigationSecondary />

	<div class="my-12 space-y-12">
		<div class="text-center">¿Te gusta la app? ¡Cuéntale a tus amigos!</div>

		<div class="space-y-4 text-center">
			<p>
				Tu <a href="/sponsors" class="font-mono hover:underline font-semibold">contribución</a> por Yape / Plin nos ayuda a
				mantener esta aplicación gratuita ❤️
			</p>
			<div
				class="w-64 h-64 mx-auto flex items-center justify-center overflow-hidden rounded-lg border"
			>
				<img src="/yape-qr.png" alt="QR de Yape" class="w-72 h-72 object-cover" />
			</div>
		</div>

		<div class="text-center">
			<a href="https://forms.gle/XdhREytEyYCucM187" class="font-mono hover:underline"
				>Danos feedback 🙏</a
			>
		</div>

		<div class="flex flex-col space-y-1 text-center">
			<p>
				Creado por <a href="https://www.cuevantn.com/" class="font-mono hover:underline"
					>Anthony Cueva</a
				>
			</p>
			<a href="https://x.com/cuevantn" class="font-mono hover:underline">@cuevantn (x)</a>
		</div>

		<div class="flex flex-col space-y-1 text-center">
			<a href="https://github.com/cuevantn/utec-classrooms/" class="font-mono hover:underline"
				>Source code (Github)</a
			>
		</div>
	</div>
</div>

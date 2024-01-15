<script>
	import DayNavigationPrimary from '$lib/components/day/DayNavigationPrimary.svelte';
	import DayNavigationSecondary from '$lib/components/day/DayNavigationSecondary.svelte';
	import TheFirstClone from './TheFirstClone.svelte';
	import TypographyLink from '$lib/components/TypographyLink.svelte';
</script>

<div class="max-w-[700px] px-8 mx-auto h-[100dvh] overflow-auto [scrollbar-gutter:stable]">
	<DayNavigationPrimary />
	<slot />
	<DayNavigationSecondary />

	<div class="my-12 space-y-12">
		<div class="text-center">¿Te gusta la app? ¡Cuéntale a tus amigos!</div>

		<div class="space-y-4 text-center">
			<p>
				Tu <TypographyLink href="/sponsors">contribución</TypographyLink> por Yape / Plin nos ayuda a
				mantener esta aplicación gratuita ❤️
			</p>
			<div
				class="w-64 h-64 mx-auto flex items-center justify-center overflow-hidden rounded-lg border"
			>
				<img src="/yape-qr.png" alt="QR de Yape" class="w-72 h-72 object-cover" />
			</div>
		</div>

		<div class="text-center">
			<TypographyLink href="https://forms.gle/XdhREytEyYCucM187">Danos feedback 🙏</TypographyLink>
		</div>

		<div class="flex flex-col space-y-1 text-center">
			<p>
				Creado por <TypographyLink href="https://www.cuevantn.com/">Anthony Cueva</TypographyLink>
			</p>
			<TypographyLink href="https://x.com/cuevantn">@cuevantn (x)</TypographyLink>
		</div>

		<div class="flex flex-col space-y-1 text-center">
			<TypographyLink href="https://github.com/cuevantn/utec-classrooms/">
				Source code (Github)
			</TypographyLink>
		</div>
	</div>
</div>

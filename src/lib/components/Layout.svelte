<div
	class="max-w-[700px] px-8 mx-auto font-mono h-[100dvh] overflow-auto [scrollbar-gutter:stable]"
>
	<div class="sticky top-0 z-[9999] bg-white">
		<nav class="h-20 flex justify-between items-center">
			<slot name="navbar" />
		</nav>
	</div>

	<slot />

	<div class="sticky bottom-0 z-[9999] bg-white">
		<nav class="h-20 flex justify-between items-center">
			<slot name="footer" />
		</nav>
	</div>
	<div class="my-4 text-center">¿Te gusta la app? ¡Cuéntale a tus amigos!</div>

	<div class="my-12 space-y-4 text-center">
		<p>
			¿Deseas apoyar este proyecto? Tu contribución nos ayuda a mantener esta aplicación gratuita
			para toda la comunidad universitaria.
		</p>
		<div
			class="w-64 h-64 mx-auto flex items-center justify-center overflow-hidden rounded-lg border"
		>
			<img src="/yape-qr.png" alt="QR de Yape" class="w-72 h-72 object-cover" />
		</div>
		<p>Yape / Plin</p>
	</div>

	<div class="my-12 flex flex-col space-y-1 text-center">
		<a href="https://www.cuevantn.com/">Creado por Anthony Cueva</a>
		<a href="https://x.com/cuevantn">@cuevantn (x)</a>
		<a href="https://github.com/cuevantn/utec-classrooms/">Source code</a>
	</div>
</div>

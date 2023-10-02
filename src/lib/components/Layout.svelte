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
</div>

<script>
	import '../app.postcss';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<div
	class="max-w-[700px] px-8 mx-auto font-mono h-[100dvh] py-4 overflow-auto [scrollbar-gutter:stable]"
>
	<slot />
</div>

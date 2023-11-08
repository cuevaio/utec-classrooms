<script>
	import '../app.postcss';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });

	let token = `{"token":"f7ab2547703a4221bd9cdfc778804960"}`;
</script>

<svelte:head>
	<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon={token}>
	</script>
</svelte:head>

<slot />

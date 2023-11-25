<script>
	export let href = '';
</script>

<a
	{href}
	class="font-mono underline hover:text-muted-foreground"
	target="blank"
	rel="noopener noreferrer"
>
	<slot />
</a>

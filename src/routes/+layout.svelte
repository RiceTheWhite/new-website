<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link href='https://fonts.googleapis.com/css?family=JetBrains Mono' rel='stylesheet'>
</svelte:head>

<div class="m-auto max-w-[900px]">
	<nav class="flex justify-between">
		<div class="flex flex-row space-x-4">
			<a href="/">about</a>
		</div>
		<div class="flex flex-row space-x-4">
			<a href="/blog">blog</a>
			<a href="/contact">contact</a>
			<a href="/credits">credits</a>
		</div>
	</nav>

	<hr>

	{@render children?.()}

	<p>footer</p>
</div>

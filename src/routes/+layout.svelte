<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link href='https://fonts.googleapis.com/css?family=JetBrains Mono' rel='stylesheet'>
	<link rel="stylesheet" href="/shared.css" />
</svelte:head>

<div class="m-auto max-w-[900px]">
	<p>header</p>

	{@render children?.()}

	<p>footer</p>
</div>

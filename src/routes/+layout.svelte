<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link href='https://fonts.googleapis.com/css?family=JetBrains Mono' rel='stylesheet'>

	<meta property="og:title" content="ray's site" />
	<meta property="og:description" content="did unc make an embed?!??!?" />
	<meta property="og:image" content="https://vitrescent.vercel.app/_app/immutable/assets/final_fantasy_recolor_dark.CIlg1u1L.png" />
	<meta property="og:url" content="https://vitrescent.vercel.app" />
	<meta property="og:type" content="website" />

	<!-- Twitter thing test -->
	<meta name="twitter:card" content="summary_large_image" />
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

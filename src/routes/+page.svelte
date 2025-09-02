<script lang="ts">
	import { onMount, tick } from "svelte";
    import { typewriter, select } from "$lib/components/transitions";

	const names = ["ray4rc", "rice", "vitrescent"];
	let index = 0;
	let name = names[index];

	onMount(() => {
		const interval = setInterval(async () => {
            name = ""
            await new Promise(resolve => setTimeout(resolve, 200))
			index = (index + 1) % names.length;
			name = names[index];
		}, 2000);

		return () => clearInterval(interval);
	});
</script>



<div>
	<h1>hey, it's&nbsp;</h1>
    <div class="flex">
        {#key name}
            <h1 in:typewriter={{speed: 2}} out:select={{duration: 150}}>
                {name}
            </h1>
        {/key}
        <h1>!</h1>
    </div>
</div>

<h4>about me</h4>
<ul>
	<li>i am 15 years old</li>
	<li>i see myself as a good-natured and calm person</li>
	<li>...</li>
</ul>

<h4>alias</h4>
<p>you probably know me by these following names:</p>
<ul>
	<li>ray/rayarc - ray+arc - a ray(cast) that arcs (and/or orbits) around a object</li>
	<li>rice/rais - rice</li>
	<li>vitrescent - to be capable of/susceptible to turning into glass</li>
</ul>

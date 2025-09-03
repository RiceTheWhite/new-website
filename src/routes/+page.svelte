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
	<li>i am a 15-year-old vietnamese. i go by he/him</li>
	<li>i see myself as a good-natured and calm person</li>
	<li>...</li>
</ul>

<h4>alias</h4>
<p>you probably know me by the following names, you might want to know how i came up with them:</p>
<ul>
	<li>ray/rayarc - ray+arc - a ray(cast) that arcs (and/or orbits) around a object</li>
	<li>rice/rais - rice</li>
	<li>vitrescent - to be capable of/susceptible to turning into glass. this just sounded cool</li>
</ul>

<h4>know more about me!</h4>
<p>i have multiple interests!</p>
<ul>
	<li>i play <a href="/guitar">guitar</a></li>
	<li>i do <a href="/programming">programming</a></li>
	<li>i also do <a href="/editing">video editing</a></li>
	<li>there's probably more but i can't remember...</li>
</ul>

<h4>socials</h4>
<ul>
	<li>discord - <a href="https://discord.com/users/401649298598658048">@v1trescent</a></li>
	<li>github - <a href="https://github.com/RiceTheWhite/">@RiceTheWhite</a></li>
</ul>
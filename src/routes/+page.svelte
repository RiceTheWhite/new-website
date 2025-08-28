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

<h2>h2</h2>

<script lang="ts">
    import { onMount } from 'svelte'

    let canvas: HTMLCanvasElement
    let ctx: CanvasRenderingContext2D


    onMount(() => {
        ctx = canvas.getContext('2d')!

        renderloop()
    })

    function renderloop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = 'black'

        ctx.beginPath()
        ctx.rect(0, 0, canvas.width, canvas.height)
        ctx.fill()
        
        ctx.fillStyle = 'red'

        ctx.beginPath()
        ctx.arc(100, 100, 10, 0, 2 * Math.PI)
        ctx.fill()

        requestAnimationFrame(renderloop)
    }
</script>

<canvas bind:this={canvas} width="1000" height="1000"></canvas>
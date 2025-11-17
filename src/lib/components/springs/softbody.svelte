<script lang="ts">
    import { onMount } from 'svelte'
	import { Point } from './point';
	import { Spring } from './spring';
	import type { spring } from 'svelte/motion';
	import { Vec2D } from './vec2d';

    const gravity: [number, number] = [0, 0.5]

    let canvas: HTMLCanvasElement
    let ctx: CanvasRenderingContext2D

    let width: number
    let height: number
    
    let points: Point[] = []
    let springs: Spring[] = []


    onMount(() => {
        const p1 = new Point(30, 30)
        const p2 = new Point(300, 100)
        const p3 = new Point(200, 30)
        const p4 = new Point(300, 200)

        // p1.applyForce(new Vec2D(100, 0))
        points.push(p1, p2, p3, p4)
        springs.push(new Spring([p1, p2]), new Spring([p2, p3]), new Spring([p3, p4]), new Spring([p4, p1]), new Spring([p1, p3]), new Spring([p2, p4]))

        ctx = canvas.getContext('2d')!
        width = canvas.width
        height = canvas.height
        
        loop()
    })

    function loop() {
        // ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = 'black'
        ctx.beginPath()
        ctx.rect(0, 0, canvas.width, canvas.height)
        ctx.fill()

        springs.forEach(spring => {
            spring.step()
            spring.render(ctx)
        });

        points.forEach(point => {
            point.acceleration.addSelf(gravity)

            point.step()
            point.clampPosition(width, height)
            point.render(ctx)
        });

        requestAnimationFrame(loop)
    }
</script>

<canvas bind:this={canvas} width="1000" height="1000"></canvas>
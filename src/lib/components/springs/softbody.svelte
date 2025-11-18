<script lang="ts">
    import { onMount } from 'svelte'
	import { Point } from './point';
	import { Spring } from './spring';    
	import { Mouse } from '../vitrescent/mouselib';
	import { Vec2D } from './vec2d';

    const gravity: [number, number] = [0, 0.2]

    let canvas: HTMLCanvasElement
    let ctx: CanvasRenderingContext2D

    let width: number
    let height: number
    
    let points: Point[] = []
    let springs: Spring[] = []

    let mouse: Mouse
    let heldPoints: Point[] = []

    onMount(() => {
        mouse = new Mouse(canvas)

        const p1 = new Point(30, 30)
        const p2 = new Point(300, 30)
        const p3 = new Point(300, 300)
        const p4 = new Point(30, 300)


        points.push(p1, p2, p3, p4)

        points.forEach(p => {
            p.applyForce(new Vec2D(50, 0))
        });
        

        springs.push(new Spring([p1, p2]), new Spring([p2, p3]), new Spring([p3, p4]), new Spring([p4, p1]), new Spring([p1, p3], Math.SQRT2*200), new Spring([p2, p4], Math.SQRT2*200))

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
        });

        points.forEach(point => {
            point.acceleration.addSelf(gravity)

            point.step()
            point.clampPosition(width, height)
            point.render(ctx)
        });

        springs.forEach(spring => {
            spring.render(ctx)
        });

        
        if (mouse.isDown) {
            if (mouse.changedState) {
                points.forEach(p => {
                    if (p.position.subtracted(mouse.position).length > p.radius + 20) { return }
                    heldPoints.push(p)
                });
            }
            heldPoints.forEach(p => {
                p.applyForce(mouse.position.subtracted(p.position).multiplied(0.1))
            });
        } else {
            heldPoints = []
        }

        requestAnimationFrame(loop)
    }
</script>

<canvas 
    bind:this={canvas} 
    width="1000" 
    height="1000"
></canvas>
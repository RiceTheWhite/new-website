<script lang="ts">
    import { onMount } from 'svelte'
	import { PointMass } from './point-mass';
	import { Spring } from './spring';    
	import { Mouse } from '../mouselib';
	import { Vec2D } from './vec2d';
	import { Shape } from './shape';
	import { Point } from './point';

    const gravity: [number, number] = [0, 0.2]

    let canvas: HTMLCanvasElement
    let ctx: CanvasRenderingContext2D

    let width: number
    let height: number
    
    let s1: Shape<PointMass>
    let springs: Spring[] = []

    let mouse: Mouse
    let heldPoints: PointMass[] = []
    let mousePoint: Point

    onMount(() => {
        mouse = new Mouse(canvas)
        mousePoint = new Point(0, 0)

        const p1 = new PointMass(30, 30)
        const p2 = new PointMass(300, 30)
        const p3 = new PointMass(300, 300)
        const p4 = new PointMass(30, 300)

        s1 = new Shape([p1, p2, p3, p4])

        s1.vertices.forEach(p => {
            p.applyForce(new Vec2D(50, 0))
        });
        

        springs.push(new Spring([p1, p2]), new Spring([p2, p3]), new Spring([p3, p4]), new Spring([p4, p1]), new Spring([p1, p3], Math.SQRT2*150), new Spring([p2, p4], Math.SQRT2*150))

        ctx = canvas.getContext('2d')!
        width = canvas.width
        height = canvas.height
        
        loop()
    })

    function loop() {
        // ctx.clearRect(0, 0, canvas.width, canvas.height)
        mousePoint.position = mouse.position

        ctx.fillStyle = 'black'
        ctx.beginPath()
        ctx.rect(0, 0, canvas.width, canvas.height)
        ctx.fill()

        springs.forEach(spring => {
            spring.step()
        });

        s1.vertices.forEach(point => {
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
                s1.vertices.forEach(p => {
                    if (p.position.subtracted(mouse.position).length > p.radius + 20) { return }
                    heldPoints.push(p)
                });
            }
            heldPoints.forEach(p => {
                const delta = mouse.position.subtracted(p.position)
                p.applyForce(delta)
            });
        } else {
            heldPoints = []
        }

        mouse.onEndOfFrame()
        requestAnimationFrame(loop)
    }
</script>

<canvas 
    bind:this={canvas} 
    width="1000" 
    height="1000"
></canvas>
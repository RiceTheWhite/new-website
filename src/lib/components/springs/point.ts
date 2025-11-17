import { Vec2D } from "./vec2d";

export class Point {
    position: Vec2D;
    velocity: Vec2D;
    acceleration: Vec2D;
    mass: number

    constructor(
        x: number, 
        y: number, 
        mass: number = 10
    ) {
        this.position = new Vec2D(x, y)
        this.velocity = new Vec2D(0, 0)
        this.acceleration = new Vec2D(0, 0)
        this.mass = mass
    }

    applyForce(force: Vec2D) {
        const newAccel = new Vec2D(force.x / this.mass, force.y / this.mass)
        this.acceleration.addSelf(newAccel)
    }

    step() {
        this.velocity.addSelf(this.acceleration)
        this.position.addSelf(this.velocity)

        this.acceleration.mulSelf(0)
    }

    clampPosition(width: number, height: number) {
        const minX = 0
        const minY = 0
        const maxX = minX + width
        const maxY = minY + height
        if (this.position.x < minX) {
            this.position.x = minX;
            this.velocity.x = 0;
        }
        if (this.position.x > maxX) {
            this.position.x = maxX;
            this.velocity.x = 0;
        }

        if (this.position.y < minY) {
            this.position.y = minY;
            this.velocity.y = 0;
        }
        if (this.position.y > maxY) {
            this.position.y = maxY;
            this.velocity.y = 0;
        }
    }

    render(ctx: CanvasRenderingContext2D, radius: number = 10, color: string = "red") {
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, radius, 0, 2*Math.PI)
        ctx.fill()
    }
}
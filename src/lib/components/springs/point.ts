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

    step(steps: number) {
        for (let i = 0; i < steps; i++) {
            this.velocity.addSelf(this.acceleration)
            this.position.addSelf(this.velocity)
        }
    }
}
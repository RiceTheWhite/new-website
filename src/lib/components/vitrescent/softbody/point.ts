import type { Shape } from "./shape";
import { Vec2D } from "./vec2d";

export class Point {
    position: Vec2D;

    constructor(
        x: number, 
        y: number, 
        public radius: number = 10
    ) {
        this.position = new Vec2D(x, y)
    }

    get x() {
        return this.position.x
    }

    get y() {
        return this.position.y
    }

    // stolen again, from geeksforgeeks
    isInsideShape(shape: Shape<Point>) {
        const num_vertices = shape.vertices.length;
        const x = this.x;
        const y = this.y;
        let inside = false;

        let p1 = shape.vertices[0];
        let p2;

        for (let i = 1; i <= num_vertices; i++) {
            p2 = shape.vertices[i % num_vertices];

            if (y > Math.min(p1.y, p2.y)) {
                if (y <= Math.max(p1.y, p2.y)) {
                    if (x <= Math.max(p1.x, p2.x)) {
                        const x_intersection = ((y - p1.y) * (p2.x - p1.x)) / (p2.y - p1.y) + p1.x;

                        if (p1.x === p2.x || x <= x_intersection) {
                            inside = !inside;
                        }
                    }
                }
            }
            p1 = p2;
        }
        return inside;
    }

    getSmallestVectorToShape(shape: Shape<Point>) {
        
    }

    render(ctx: CanvasRenderingContext2D, color: string = "white") {
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI)
        ctx.fill()
    }
}
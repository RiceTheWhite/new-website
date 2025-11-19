import type { Edge } from "./edge";
import type { LineSegment } from "./line-segment";
import { PointMass } from "./point-mass";
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

    projectPointOnSegment(segment: LineSegment) {
        let p1 = segment.pair[0]
        let p2 = segment.pair[1]

        let x1 = p1.position.x
        let y1 = p1.position.y
        let x2 = p2.position.x
        let y2 = p2.position.y

        var A = this.x - x1;
        var B = this.y - y1;
        var C = x2 - x1;
        var D = y2 - y1;

        var dot = A * C + B * D;
        var len_sq = C * C + D * D;
        var param = -1;
        if (len_sq != 0) //in case of 0 length line
            param = dot / len_sq;

        var xx, yy;

        if (param < 0) {
            xx = x1;
            yy = y1;
        }
        else if (param > 1) {
            xx = x2;
            yy = y2;
        }
        else {
            xx = x1 + param * C;
            yy = y1 + param * D;
        }
        
        return new Point(xx, yy);
    }

    private _findClosestPointData(shape: Shape<Point>) {
        let distanceSquared: number = Number.MAX_VALUE
        let closestPointOnShape: Point = new Point(0, 0)
        let closestVectorToShape: Vec2D = new Vec2D(0, 0)
        shape.edges.forEach(edge => {
            const projected = this.projectPointOnSegment(edge)
            const vectorToProjected = projected.position.subtracted(this.position)
            const distToProjectedSquared = vectorToProjected.lengthSquared
            if (distToProjectedSquared < distanceSquared) {
                distanceSquared = distToProjectedSquared
                closestPointOnShape.position = projected.position
                closestVectorToShape = vectorToProjected
            }
        });
        return { closestPointOnShape, closestVectorToShape, distanceSquared }
    }

    projectPointOnShape(shape: Shape<Point>) { return this._findClosestPointData(shape).closestPointOnShape }
    closestVectorToShape(shape: Shape<Point>) { return this._findClosestPointData(shape).closestVectorToShape }
    distanceToShape(shape: Shape<Point>) { return Math.sqrt(this._findClosestPointData(shape).distanceSquared) }


    render(ctx: CanvasRenderingContext2D, color: string = "white") {
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI)
        ctx.fill()
    }
}
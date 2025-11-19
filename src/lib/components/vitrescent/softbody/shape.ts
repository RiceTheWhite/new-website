import { Edge } from "./edge";
import type { Point } from "./point";

export class Shape {
    constructor(
        public vertices: Point[]
    ) {}

    get edges() {
        let edges: Edge[] = []
        for (let i = 0; i < this.vertices.length; i++) {
            const p1 = this.vertices[i]
            const p2 = this.vertices[(i+1)%this.vertices.length]

            edges.push(new Edge([p1, p2]))
        }
        return edges
    }
}
import { Point } from "./point";
import type { Shape } from "./shape";

export class LineSegment {
    constructor(
        public pair: [Point, Point],
    ) {}

    get delta() {
        const [p1, p2] = this.pair

        const delta = p2.position.subtracted(p1.position)
        return delta
    }

    get length() {
        const delta = this.delta
        const dist = delta.length
        return dist
    }


    // stolen straight from geeksforgeeks
    // stolen straight from geeksforgeeks
    // stolen straight from geeksforgeeks
    _onSegment(p: [number, number], q: [number, number], r: [number, number]) {
        return (q[0] <= Math.max(p[0], r[0]) && 
                q[0] >= Math.min(p[0], r[0]) &&
                q[1] <= Math.max(p[1], r[1]) &&
                q[1] >= Math.min(p[1], r[1]));
    }

    _orientation(p: [number, number], q: [number, number], r: [number, number]) {
        let val = (q[1] - p[1]) * (r[0] - q[0]) -
                (q[0] - p[0]) * (r[1] - q[1]);

        // collinear
        if (val === 0) return 0;

        // clock or counterclock wise
        // 1 for clockwise, 2 for counterclockwise
        return (val > 0) ? 1 : 2;
    }

    doIntersectLineSegment(s2: LineSegment) { 
        const s1 = this

        const p1: [number, number] = [s1.pair[0].position.x, s1.pair[0].position.y]
        const q1: [number, number] = [s1.pair[1].position.x, s1.pair[1].position.y]
        const p2: [number, number] = [s2.pair[0].position.x, s2.pair[0].position.y]
        const q2: [number, number] = [s2.pair[1].position.x, s2.pair[1].position.y]

        // find the four this._orientations needed
        // for general and special cases
        let o1 = this._orientation(p1, q1, p2);
        let o2 = this._orientation(p1, q1, q2);
        let o3 = this._orientation(p2, q2, p1);
        let o4 = this._orientation(p2, q2, q1);

        // general case
        if (o1 !== o2 && o3 !== o4)
            return true;

        // special cases
        // p1, q1 and p2 are collinear and p2 lies on segment p1q1
        if (o1 === 0 &&
        this._onSegment(p1, p2, q1)) return true;

        // p1, q1 and q2 are collinear and q2 lies on segment p1q1
        if (o2 === 0 &&
        this._onSegment(p1, q2, q1)) return true;

        // p2, q2 and p1 are collinear and p1 lies on segment p2q2
        if (o3 === 0 &&
        this._onSegment(p2, p1, q2)) return true;

        // p2, q2 and q1 are collinear and q1 lies on segment p2q2 
        if (o4 === 0 &&
        this._onSegment(p2, q1, q2)) return true;

        return false;
    }
}
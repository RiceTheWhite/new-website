import { LineSegment } from "./line-segment";
import type { Point } from "./point";

export class Edge extends LineSegment {
    constructor(
        public pair: [Point, Point],
    ) {
        super(pair)
    }

    
}
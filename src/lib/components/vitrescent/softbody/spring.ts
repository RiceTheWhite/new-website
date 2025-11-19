import { Vec2D } from "./vec2d";
import { PointMass } from "./point-mass";
import { Color } from "../colorlib";
import { LineSegment } from "./line-segment";

export class Spring extends LineSegment {
    constructor(
        public pair: [PointMass, PointMass],
        public restLength: number = 150,
        public stiffness: number = 1,
        public damping: number = 0.2,
        public solid: boolean = false,
    ) {
        super(pair);
    }

    step() {
        const [p1, p2] = this.pair

        const delta = p2.position.subtracted(p1.position)
        const dist = delta.length
        const diff = dist - this.restLength
        const dir = delta.normalized

        let force = dir.multiplied(this.stiffness * diff)

        const relVel = p2.velocity.subtracted(p1.velocity)
        const relVelAlong = relVel.dot(dir)

        const dampingForce = dir.multiplied(-this.damping * relVelAlong)
        force.subSelf(dampingForce)

        p1.applyForce(force)
        p2.applyForce(force.mulSelf(-1))
    }

    render(ctx: CanvasRenderingContext2D, size = 20, color = "stress", skippedTeeth = 1) {
        const [p1, p2] = this.pair;
        const teeth = Math.floor(this.restLength / size);

        let c: string = color

        if (color === "stress") {
            let t = Math.abs(this.length-this.restLength)/this.restLength
            t = Math.pow(t, 0.4)
            c = new Color(0, 255, 0).lerp(new Color(255, 0, 0), (
                t
            )).rgb
        }

        ctx.strokeStyle = c;
        ctx.beginPath();
        ctx.moveTo(p1.position.x, p1.position.y);

        for (let i = 0+skippedTeeth; i < teeth-skippedTeeth; i++) {
            const t0 = i / teeth;
            const t1 = (i + 1/4) / teeth;
            const t2 = (i + 3/4) / teeth;
            const t3 = (i + 1) / teeth;

            let v0 = p1.position.lerp(p2.position, t0)
            let v1 = p1.position.lerp(p2.position, t1)
            let v2 = p1.position.lerp(p2.position, t2)
            let v3 = p1.position.lerp(p2.position, t3)

            const delta = p2.position.subtracted(p1.position);
            const perp = new Vec2D(-delta.y, delta.x).multiplied(0.025); // amplitude
            
            v1.subSelf(perp)
            v2.addSelf(perp)

            ctx.lineTo(v0.x, v0.y)
            ctx.lineTo(v1.x, v1.y);
            ctx.lineTo(v2.x, v2.y);
            ctx.lineTo(v3.x, v3.y);
        }

        ctx.lineTo(p2.position.x, p2.position.y)
        ctx.stroke();
    }
}
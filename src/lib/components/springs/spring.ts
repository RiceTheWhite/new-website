import { Vec2D } from "./vec2d";
import { Point } from "./point";

export class Spring {
    constructor(
        public pair: [Point, Point],
        public restLength: number = 200,
        public stiffness: number = 1,
        public damping: number = 0.2
    ) {}

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

    render(ctx: CanvasRenderingContext2D, size = 10, color = "red") {
        const [p1, p2] = this.pair;
        const teeth = Math.floor(this.restLength / size);

        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(p1.position.x, p1.position.y);

        for (let i = 0; i < teeth; i++) {
            const t0 = i / teeth;
            const t1 = (i + 0.5) / teeth;
            const t2 = (i + 1) / teeth;

            const pStart = p1.position.lerp(p2.position, t0);
            const pMid = p1.position.lerp(p2.position, t1);
            const pEnd = p1.position.lerp(p2.position, t2);

            const delta = p2.position.subtracted(p1.position);
            const perp = new Vec2D(-delta.y, delta.x).multiplied(0.02); // amplitude

            const down = pMid.added(perp.multiplied(-1));
            ctx.lineTo(down.x, down.y);

            const up = pMid.added(perp);
            ctx.lineTo(up.x, up.y);

            ctx.lineTo(pEnd.x, pEnd.y);
        }

        ctx.stroke();
    }
}
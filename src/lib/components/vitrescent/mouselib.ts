import { Vec2D } from "../springs/vec2d"

export class Mouse {
    position = new Vec2D(0, 0)
    isDown = false
    changedState = false

    constructor(
        public canvas: HTMLCanvasElement
    ) {
        this.onPointerDown = this.onPointerDown.bind(this)
        this.onPointerMove = this.onPointerMove.bind(this)
        this.onPointerUp = this.onPointerUp.bind(this)

        this.canvas.addEventListener("pointerdown", this.onPointerDown)
        this.canvas.addEventListener("pointermove", this.onPointerMove)
        this.canvas.addEventListener("pointerup", this.onPointerUp)
        this.canvas.addEventListener("pointercancel", this.onPointerUp)
    }

    getRelativePos(event: PointerEvent) {
        const rect = this.canvas.getBoundingClientRect()
        const scaleX = this.canvas.width / rect.width
        const scaleY = this.canvas.height / rect.height

        return {
            x: (event.clientX - rect.left) * scaleX,
            y: (event.clientY - rect.top) * scaleY
        }
    }

    onPointerDown(e: PointerEvent) {
        this.changedState = true
        this.isDown = true
        const pos = this.getRelativePos(e)
        this.position.x = pos.x
        this.position.y = pos.y
    }

    onPointerMove(e: PointerEvent) {
        const pos = this.getRelativePos(e)
        this.position.x = pos.x
        this.position.y = pos.y
    }

    onPointerUp() {
        this.changedState = true
        this.isDown = false
    }

    onEndOfFrame() {
        this.changedState = false
    }
}
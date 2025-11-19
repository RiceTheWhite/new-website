import { Vec2D } from "../springs/vec2d"

export class Mouse {
    position = new Vec2D(0, 0)
    leftDown = false
    leftChanged = false

    rightDown = false
    rightChanged = false

    constructor(
        public canvas: HTMLCanvasElement
    ) {
        this.onPointerDown = this.onPointerDown.bind(this)
        this.onPointerMove = this.onPointerMove.bind(this)
        this.onPointerUp = this.onPointerUp.bind(this)

        this.canvas.addEventListener("pointerdown", this.onPointerDown)
        this.canvas.addEventListener("pointermove", this.onPointerMove)
        this.canvas.addEventListener("pointerup", this.onPointerUp)
        this.canvas.addEventListener("contextmenu", this.onContextMenu)

    }

    onContextMenu(e: PointerEvent) {
        e.preventDefault()
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
        if (e.button === 0) {
            this.leftChanged = true
            this.leftDown = true
        } else if (e.button === 2) {
            this.rightChanged = true
            this.rightDown = true
        }

        // const pos = this.getRelativePos(e)
        // this.position.x = pos.x
        // this.position.y = pos.y
    }

    onPointerMove(e: PointerEvent) {
        const pos = this.getRelativePos(e)
        this.position.x = pos.x
        this.position.y = pos.y
    }

    onPointerUp(e: PointerEvent) {
        if (e.button === 0) {
            this.leftChanged = true
            this.leftDown = false
        } else if (e.button === 2) {
            this.rightChanged = true
            this.rightDown = false
        }

    }

    onEndOfFrame() {
        this.leftChanged = false
    }
}
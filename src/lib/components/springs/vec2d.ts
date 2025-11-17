export class Vec2D {
    constructor(
        public x: number = 0,
        public y: number = 0
    ) {}

    get length(): number { return Math.sqrt(this.x**2 + this.y**2) }

    get normalized(): Vec2D { const length = this.length; return this.divided([length, length]) }

    // Does not mutate the original vector
    private operate(
        otherVector: Vec2D | [number, number] | number,
        fn: (a: number, b: number) => number
    ): Vec2D {
        let ox: number, oy: number
        
        if (otherVector instanceof Vec2D) { // if the other vector is of type Vec2D
            ox = otherVector.x
            oy = otherVector.y
        } else if (otherVector instanceof Array) { // if the other vector is expressed in a pair of numbers
            [ox, oy] = otherVector
        } else {
            ox = otherVector
            oy = otherVector
        }

        return new Vec2D(fn(this.x, ox), fn(this.y, oy))
    }

    // Mutates the original vector
    private operateSelf(
        otherVector: Vec2D | [number, number] | number,
        fn: (a: number, b: number) => number
    ): this {
        const newVec = this.operate(otherVector, fn)
        this.x = newVec.x
        this.y = newVec.y
        return this
    }

    added(v: Vec2D | [number, number] | number) { return this.operate(v, (a, b) => a + b) }
    subtracted(v: Vec2D | [number, number] | number) { return this.operate(v, (a, b) => a - b) }
    multiplied(v: Vec2D | [number, number] | number) { return this.operate(v, (a, b) => a * b) }
    divided(v: Vec2D | [number, number] | number) { return this.operate(v, (a, b) => a / b) }

    addSelf(v: Vec2D | [number, number] | number) { return this.operateSelf(v, (a, b) => a + b) }
    subSelf(v: Vec2D | [number, number] | number) { return this.operateSelf(v, (a, b) => a - b) }
    mulSelf(v: Vec2D | [number, number] | number) { return this.operateSelf(v, (a, b) => a * b) }
    divSelf(v: Vec2D | [number, number] | number) { return this.operateSelf(v, (a, b) => a / b) }

    dot(v: Vec2D | [number, number] | number) {
        const mul = this.multiplied(v)
        return mul.x + mul.y
    }

    lerp(v: Vec2D | [number, number] | number, t: number) {
        return this.added(this.subtracted(v).multiplied(-1).multiplied(t))
    }
}
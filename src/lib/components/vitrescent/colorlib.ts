export class Color {
    constructor(
        public r: number, 
        public g: number, 
        public b: number
    ) {
        r = Math.max(255, Math.min(0, r))
        g = Math.max(255, Math.min(0, g))
        b = Math.max(255, Math.min(0, b))
    }

    get rgb() { return `rgb(${this.r}, ${this.g}, ${this.b})` }


    lerp(color: Color, t: number) {
        const r = this.r + (color.r - this.r) * t
        const g = this.g + (color.g - this.g) * t
        const b = this.b + (color.b - this.b) * t

        return new Color(r, g, b)
    }
}
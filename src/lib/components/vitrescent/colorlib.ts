export class ColorLib {
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
}
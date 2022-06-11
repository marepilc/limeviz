'use strict'


import {number2str} from "./helpers";


export function round(x: number, decimal?: number): number { // round
    if (decimal) {
        let n = 1
        for (let i = 0; i < decimal; i++) {
            n *= 10
        }
        return Math.round(x * n) / n
    } else {
        return Math.round(x)
    }
}

export function round2str(x: number, decimal: number): string {
    let s = number2str(round(x, decimal))
    let ss: string[] = s.split('.')
    let missing0: number
    if (ss.length === 2) {
        missing0 = decimal - ss[1].length
    } else {
        s += '.'
        missing0 = decimal
    }
    for (let i = 0; i < missing0; i++) {
        s += '0'
    }
    return s
}

export let floor: (x: number) => number = Math.floor
export let ceil: (x: number) => number = Math.ceil

export function constrain(v: number, l1: number, l2: number): number {
    if (v < Math.min(l1, l2)) {
        return Math.min(l1, l2)
    } else if (v > Math.max(l1, l2)) {
        return Math.max(l1, l2)
    } else {
        return v
    }
}

export function sq(v: number): number {
    return Math.pow(v, 2)
}

export let pow: (x: number, y: number) => number = Math.pow
export let sqrt: (x: number) => number = Math.sqrt
export let abs: (x: number) => number = Math.abs

export function max(numbers: number[]): number {
    return Math.max(...numbers)
}

export function min(numbers: number[]): number {
    return Math.min(...numbers)
}

export function sum(numbers: number[]): number {
    return numbers.reduce((a, b) => a + b)
}

export function avg(numbers: number[]): number {
    return sum(numbers) / numbers.length
}

export function centile(data: number[], c: number): number {
    let dataCopy = data.concat()
    dataCopy.sort(function (a, b) {
        return a - b
    })
    let pos = (dataCopy.length + 1) * c / 100
    let ix = floor(pos)
    if (ix === 0) {
        return dataCopy[ix]
    } else if (ix > dataCopy.length - 1) {
        return dataCopy[dataCopy.length - 1]
    } else {
        let rem = pos - ix
        let diff = dataCopy[ix] - dataCopy[ix - 1]
        return dataCopy[ix - 1] + diff * rem
    }
}

export function revCentile(data: number[], n: number): number {
    let dataCopy = data.concat()
    dataCopy.sort(function (a, b) {
        return a - b
    })
    let pos1: number = 1
    let pos2: number = dataCopy.length
    for (let i = 0; i < dataCopy.length; i++) {
        if (dataCopy[i] < n) {
            pos1++
        } else if (dataCopy[i] > n) {
            pos2 = i
            break;
        }
    }
    return floor(avg([pos1, pos2])) / dataCopy.length * 100
}

export function iqr(data: number[]): number {
    return centile(data, 75) - centile(data, 25)
}

export function dataRange(data: number[]): number {
    return max(data) - min(data)
}

type SDevMethod = 'sample' | 'population'

export function stdDev(data: number[], method: SDevMethod = 'sample'): number {
    let avgX = avg(data)
    let s = 0
    for (let i = 0; i < data.length; i++) {
        s += pow(data[i] - avgX, 2)
    }
    let divider = data.length - 1
    if (method === 'population') {
        divider = data.length
    }
    return sqrt(s / divider)
}

export class Vector {
    private _x: number
    private _y: number
    constructor(x: number, y: number) {
        this._x = x
        this._y = y
    }

    public set(x: number, y: number) {
        this._x = x
        this._y = y
    }

    public get x(): number {
        return this._x
    }

    public get y(): number {
        return this._y
    }

    public set x(v: number) {
        this._x = v
    }

    public set y(v: number) {
        this._y = v
    }

    public copy(): Vector {
        return new Vector(this._x, this._y)
    }

    public add(v: Vector): Vector {
        return new Vector(this._x + v.x, this._y + v.y)
    }

    public add2(v: Vector): void {
        this._x += v.x
        this._y += v.y
    }

    public sub(v: Vector): Vector {
        return new Vector(this._x - v.x, this._y - v.y)
    }

    public sub2(v: Vector): void {
        this._x -= v.x
        this._y -= v.y
    }

    public mult(s: number): Vector {
        return new Vector(this._x * s, this._y * s)
    }

    public mult2(s: number): void {
        this._x *= s
        this._y *= s
    }

    public div(s: number): Vector {
        return new Vector(this._x / s, this._y / s)
    }

    public div2(s: number): void {
        this._x /= s
        this._y /= s
    }

    public dot(v: Vector): number { // dot product of two vectors
        return this._x * v.x + this._y * v.y
    }

    public norm(): Vector {
        let e1 = this._x / (Math.sqrt(this._x * this._x + this.y * this.y))
        let e2 = this._y / (Math.sqrt(this._x * this._x + this._y * this._y))
        return new Vector(e1, e2)
    }

    public norm2(): void {
        let e1 = this._x / (Math.sqrt(this._x * this._x + this._y * this._y))
        let e2 = this._y / (Math.sqrt(this._x * this._x + this._y * this._y))
        this._x = e1
        this._y = e2
    }

    get direction(): number {
        return Math.atan2(this._y, this._x)
    }

    set direction(angle: number) {
        let magnitude = this.magnitude;
        this._x = Math.cos(angle) * magnitude
        this._y = Math.sin(angle) * magnitude
    }

    get magnitude(): number {
        return Math.sqrt(this._x * this._x + this._y * this._y)
    }

    set magnitude(magnitude: number) {
        let direction = this.direction
        this._x = Math.cos(direction) * magnitude
        this._y = Math.sin(direction) * magnitude
    }

    public limit(limitScalar: number) {
        if (this.magnitude > limitScalar) {
            let direction = this.direction
            this._x = Math.cos(direction) * limitScalar
            this._y = Math.sin(direction) * limitScalar
        }
    }
}

export const E = Math.E,
    PI = Math.PI,
    TWO_PI = Math.PI * 2,
    HALF_PI = Math.PI / 2,
    PHI = (1 + Math.sqrt(5)) / 2

export let sin = Math.sin,
    cos = Math.cos,
    tan = Math.tan,
    asin = Math.asin,
    acos = Math.acos,
    atan = Math.atan,
    atan2 = Math.atan2

export function dist(x1: number, y1: number, x2: number, y2: number): number {
    return sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2))
}

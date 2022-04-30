'use strict'


import {round} from "./math";


export class Noise {
    private _min: number
    private _max: number
    private _range: number
    private _value: number
    constructor(min: number, max: number, noiseRange: number) {
        this._min = min
        this._max = max
        this._range = noiseRange * (max - min)
        this._value = Math.random() * (max - min) + min
    }
    set min(value: number) {
        if (this._value < value) {
            this._value = value
        }
        this._min = value
    }
    set max(value: number) {
        if (this._value > value) {
            this._value = value
        }
        this._max = value
    }
    set noiseRange(value: number) {
        if (value > 0 && value < 1) {
            this._range = value * (this._max - this._min)
        }
    }
    get value(): number {
        this.nextValue()
        return this._value
    }
    set value(value: number) {
        if (value >= this._min && value <= this._max) {
            this._value = value
        }
    }
    get intValue(): number {
        this.nextValue()
        return round(this._value)
    }
    private nextValue(): void {
        let min0, max0
        min0 = this._value - this._range / 2
        max0 = this._value + this._range / 2
        if (min0 < this._min) {
            min0 = this._min;
            max0 = min0 + this._range
        } else if (max0 > this._max) {
            max0 = this._max
            min0 = max0 - this._range
        }
        this._value = Math.random() * (max0 - min0) + min0
    }
}

export function randomInt(a: number, b: number): number {
    return Math.floor(Math.random() * (Math.max(a, b) - Math.min(a, b) + 1)) + Math.min(a, b)
}

export function choose(items: any[]): any {
    return items[randomInt(0, items.length - 1)]
}

export function random(...args: number[]): number {
    if (args.length === 2 && typeof args[0] === 'number' && typeof args[1] === 'number') {
        let e1 = Math.max(args[0], args[1]) - Math.min(args[0], args[1])
        let e2 = Math.min(args[0], args[1])
        return Math.random() * e1 + e2
    } else {
        return Math.random()
    }
}

export function shuffle(items: any[]): void {
    let j, x
    for (let i = items.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        x = items[i]
        items[i] = items[j]
        items[j] = x
    }
}

export function unique(items: any[]): any[] {
    return items.filter((value, index, self) => {
        return self.indexOf(value) === index
    }).sort()
}

export function fibonacci(n: number): number[] {
    let result = [1, 1]
    if (n < 1) {
        return []
    } else if (n === 1) {
        return [1]
    } else if (n === 2) {
        return [1, 1]
    } else {
        for (let i = 0; i < n - 2; i++) {
            result.push(result[i] + result[i + 1])
        }
        return result
    }
}

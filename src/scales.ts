'use strict'

import {round} from "./math";

export class LinearScale {
    private input: [number, number]
    private output: [number, number]
    public conv: (v: number) => number

    constructor(inMin: number, inMax: number, outMin: number, outMax: number) {
        this.input = [inMin, inMax]
        this.output = [outMin, outMax]
        this.conv = this.setFunction()
    }

    private setFunction(): (x: number) => number {
        return (v: number) => {
            let domain: number
            if (this.input[0] != this.input[1]) {
                domain = (v - this.input[0]) / (this.input[1] - this.input[0])
            } else {
                domain = 0.5
            }
            let range = this.output[1] - this.output[0]
            return domain * range + this.output[0]
        }
    }

    set inRange(range: [number, number]) {
        this.input = range
        this.conv = this.setFunction()
    }

    get inRange() {
        return this.input
    }

    set outRange(range: [number, number]) {
        this.output = range
        this.conv = this.setFunction()
    }

    get outRange(): [number, number] {
        return this.output
    }

}

export function linearScale(dataMin: number, dataMax: number, resultMin: number,
                            resultMax: number): (x: number) => number {
    return (v: number) => {
        let domain: number
        if (dataMin != dataMax) {
            domain = (v - dataMin) / (dataMax - dataMin)
        } else {
            domain = 0.5
        }
        let range = resultMax - resultMin
        return domain * range + resultMin
    }
}

export function ordinalScale(d: any[], padding: number, resultMin: number,
                             resultMax: number): (x: number) => number {
    let result: number[] = []
    let scale: any
    if (d.length > 1) {
        scale = linearScale(0, d.length - 1, resultMin + padding, resultMax - padding)
    } else {
        scale = () => {
            return (resultMax - resultMin) / 2
        }
    }
    for (let i = 0; i < d.length; i++) {
        result.push(round(scale(i)))
    }
    return (idx: number) => {
        let values = result
        if (idx >= values.length) {
            return values[values.length - 1]
        } else {
            return values[idx]
        }
    }
}

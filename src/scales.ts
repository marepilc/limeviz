'use strict'

import {round} from "./math";


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

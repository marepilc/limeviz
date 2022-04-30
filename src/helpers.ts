'use strict'


import {constrain, PI, round} from "./math";
import {lV} from "./limeviz";

export function number2str(x: number, radix: number = 10): string {
    return x.toString(radix)
}

export function thousandSep(x: number, sep: string): string {
    let s: string = number2str(x)
    let st: string[] = s.split('.')
    let st1 = st[0]
    let st2 = st.length > 1 ? '.' + st[1] : ''
    let rgx: RegExp = /(\d+)(\d{3})/
    while (rgx.test(st1)) {
        st1 = st1.replace(rgx, '$1' + sep + '$2')
    }
    return st1 + st2
}

export function deg2rad(v: number): number {
    return v * PI / 180
}

export function int(s: string, radix: number = 10): number {
    return parseInt(s, radix)
}

export let str: StringConstructor = String

export function mm2px(v: number): number {
    return round(lV.dpi * v / 25.4)
}

export function px2mm(v: number): number {
    return round(v * 25.4 / lV.dpi * 10) / 10
}

export function hexStr(v: number): string {
    if (constrain(v, 0, 255).toString(16).length == 1) {
        return 0 + constrain(v, 0, 255).toString(16)
    } else {
        return constrain(v, 0, 255).toString(16)
    }
}

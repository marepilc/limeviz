'use strict'


import {HALF_PI, PI, max} from './math';
import {lV, restore, save, LengthUnit} from './limeviz'


export function text(text: string, x: number, y: number): void {
    let lines = text.split('\n')
    let lineY = y
    if (!!lV.ctx) {
        for (let i = 0; i < lines.length; i++) {
            lV.ctx.fillText(lines[i], x, lineY)
            lineY += lV.fontSize * lV.lineHeight
        }
    }
}

export function fontSize(size?: number): void | number {
    if (size != undefined) {
        lV.fontSize = size
        if (!!lV.ctx) {
            setFont()
        }
    } else {
        return lV.fontSize
    }
}

export function fontUnit(unit: LengthUnit): void {
    if (!!lV) {
        lV.fontUnit = unit
    }
}

export function textWidth(text: string): number {
    if (!!lV.ctx) {
        return lV.ctx.measureText(text).width
    } else {
        return 0
    }
}

export function textDim(text: string): {
    w: number,
    h: number
} {
    let lines = text.split('\n')
    let wSize = 0
    let hSize = 0
    if (!!lV.ctx) {
        for (let i = 0; i < lines.length; i++) {
            wSize = max([wSize, lV.ctx.measureText(lines[i]).width])
            hSize += lV.fontSize * lV.lineHeight
        }
    }
    hSize = hSize - (lV.fontSize * lV.lineHeight - lV.fontSize)
    return {
        w: wSize,
        h: hSize
    };
}

type TextAlign = 'left' | 'right' | 'center' | 'start' | 'end'
type TextBaseline = 'top' | 'middle' | 'alphabetic' | 'hanging' | 'ideographic' | 'bottom'

export function textAlign(alignment: TextAlign): void {
    if (!!lV.ctx) lV.ctx.textAlign = alignment
}

export function textBaseline(baseline: TextBaseline): void {
    if (!!lV.ctx) lV.ctx.textBaseline = baseline
}

export function setFont(): void {
    if (!!lV.ctx) {
        lV.ctx.font = `${lV.fontStyle} ${lV.fontWeight} ${lV.fontSize}${lV.fontUnit} ${lV.fontFamily}`
    }
}

export function fontStyle(style?: string): void | string {
    if (style) {
        lV.fontStyle = style
        if (!!lV.ctx) {
            setFont()
        }
    } else {
        return lV.fontStyle
    }
}

export function fontWeight(weight?: string): void | string {
    if (weight) {
        lV.fontWeight = weight
        if (!!lV.ctx) {
            setFont()
        }
    } else {
        return lV.fontWeight
    }
}

export function fontFamily(family?: string): void | string {
    if (family) {
        lV.fontFamily = family
        if (!!lV.ctx) {
            setFont()
        }
    } else {
        return lV.fontFamily
    }
}

export function lineHeight(height?: number): void | number {
    if (height != undefined) {
        lV.lineHeight = height
    } else {
        return lV.lineHeight
    }
}

export function textOnArc(text: string, x: number, y: number, r: number, startAngle: number,
                          align: TextAlign = 'center', outside: boolean = true,
                          inward: boolean = true, kerning: number = 0): number {
    if (!!lV.ctx) {
        let clockwise = (align === 'left') ? 1 : -1 // draw clockwise if right. Else counterclockwise
        if (!outside) r -= lV.fontSize
        if (((align === 'center' || align === 'right') && inward) ||
            (align === 'left' && !inward)) text = text.split('').reverse().join('')
        save()
        lV.ctx.translate(x, y)
        let _startAngle = startAngle
        startAngle += HALF_PI
        if (!inward) startAngle += PI
        lV.ctx.textBaseline = 'middle'
        lV.ctx.textAlign = 'center'
        if (align === 'center') {
            for (let i = 0; i < text.length; i++) {
                let charWidth = lV.ctx.measureText(text[i]).width
                startAngle += ((charWidth + (i === text.length - 1 ? 0 : kerning)) /
                    (r - lV.fontSize)) / 2 * -clockwise
            }
        }
        let tempAngle = 0
        lV.ctx.rotate(startAngle)
        for (let i = 0; i < text.length; i++) {
            let charWidth = lV.ctx.measureText(text[i]).width
            lV.ctx.rotate((charWidth / 2) / (r - lV.fontSize) * clockwise)
            lV.ctx.fillText(text[i], 0, (inward ? 1 : -1) * (0 - r + lV.fontSize / 2))

            lV.ctx.rotate((charWidth / 2 + kerning) / (r - lV.fontSize) * clockwise)
            tempAngle += ((charWidth / 2) / (r - lV.fontSize) * clockwise) +
                ((charWidth / 2 + kerning) / (r - lV.fontSize) * clockwise)
        }
        restore()
        return _startAngle + tempAngle
    } else {
        return 0
    }
}

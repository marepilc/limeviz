'use strict'


import {HALF_PI, PI, max} from './math';
import {lV, restore, save, LengthUnit} from './limeviz'


/**
 * This function place a text on the canvas.
 * @param text
 * @param x X coordinate of the text's anchor point.
 * @param y Y coordinate of the text's anchor point.
 */
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

/**
 * This function changes the size of the font if called with size argument.
 * If function is called without an argument, it returns the current font size.
 * @param size Font size.
 */
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

/**
 * This function sets the units for the typography.
 * @param unit
 */
export function fontUnit(unit: LengthUnit): void {
    if (!!lV) {
        lV.fontUnit = unit
    }
}

/**
 * This function returns the text width.
 * @param text
 */
export function textWidth(text: string): number {
    if (!!lV.ctx) {
        return lV.ctx.measureText(text).width
    } else {
        return 0
    }
}

/**
 * This function returns an object with the text dimensions.
 * @param text
 */
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

export type TextAlign = 'left' | 'right' | 'center' | 'start' | 'end'
export type TextBaseline = 'top' | 'middle' | 'alphabetic' | 'hanging' | 'ideographic' | 'bottom'

/**
 * This function defines an alignment of the text.
 * @param alignment
 */
export function textAlign(alignment: TextAlign): void {
    if (!!lV.ctx) lV.ctx.textAlign = alignment
}

/**
 * This function defines a baseline of the text.
 * @param baseline
 */
export function textBaseline(baseline: TextBaseline): void {
    if (!!lV.ctx) lV.ctx.textBaseline = baseline
}

/**
 * @ignore
 */
export function setFont(): void {
    if (!!lV.ctx) {
        lV.ctx.font = `${lV.fontStyle} ${lV.fontWeight} ${lV.fontSize}${lV.fontUnit} ${lV.fontFamily}`
    }
}

/**
 * This function sets the style of the font according to the CSS property.
 * @param style
 */
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

/**
 * This function changes the font weight if called with weight argument.
 * If function is called without an argument, it returns the current font weight.
 * @param weight
 */
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

/**
 * This function changes the font family if called with family argument.
 * If function is called without an argument, it returns the current font family.
 * @param family
 */
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

/**
 * This function checks or sets the line height for multiline text.
 * The default value is 1.1. If cunction is called without argument, the curent value is returned.
 * @param height
 */
export function lineHeight(height?: number): void | number {
    if (height != undefined) {
        lV.lineHeight = height
    } else {
        return lV.lineHeight
    }
}

/**
 * This function places the text on arc and return an angle in radians at which the text ends on the arc.
 * @param text
 * @param x X coordinate of the arc center.
 * @param y Y coordinate of the arc center.
 * @param r Radius of the arc.
 * @param startAngle Start angle in radians.
 * @param align Alignment of the text (default 'center'.)
 * @param outside If `true` (default value) the text is placed outside the arc.
 * @param inward Defines text direction (default `true`.)
 * @param kerning Defines text kerning (default `0`.)
 */
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

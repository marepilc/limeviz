'use strict'


import {height, lV, restore, rotate, save, translate, width} from "./limeviz"
import {cos, HALF_PI, PI, sin, TWO_PI} from "./math"
import {color2rgba} from "./colors"


export function clear(): void {
    if (!!lV.ctx) lV.ctx.clearRect(0, 0, width, height)
}

export function background(v: number[] | string | number, alpha:number=1): void {
    save()
    if (!!lV.ctx) {
        lV.ctx.fillStyle = color2rgba(v, alpha)
        lV.ctx.fillRect(0, 0, width, height)
    }
    restore()
}

export function stroke(v: number[] | string | number, alpha:number=1): void {
    lV.withStroke = true
    if (!!lV.ctx) lV.ctx.strokeStyle = color2rgba(v, alpha)
    lV.currentStroke = color2rgba(v, alpha)
}

export function strokeWidth(size: number): void {
    lV.withStroke = true
    if (!!lV.ctx) lV.ctx.lineWidth = size
}

export function noStroke(): void {
    lV.withStroke = false
}

type StrokeCupStyle = 'butt' | 'round' | 'square'

export function strokeCup(style: StrokeCupStyle): void {
    if (!!lV.ctx) lV.ctx.lineCap = style
}

type JoinStyle = 'bevel' | 'round' | 'miter'

export function strokeJoin(style: JoinStyle, miterValue: number = 10): void {
    if (!!lV.ctx) {
        if (style === 'miter') {
            if (!!lV.ctx) lV.ctx.miterLimit = miterValue
        }
        lV.ctx.lineJoin = style
    }
}

export function dashLine(line: number, space: number, offset: number = 0): void {
    if (!!lV.ctx) {
        lV.ctx.setLineDash([line, space])
        lV.ctx.lineDashOffset = offset
    }
}

export function solidLine(): void {
    if (!!lV.ctx) lV.ctx.setLineDash([])
}

export function fill(v: number[] | string | number | CanvasGradient, alpha:number=1): void {
    lV.withFill = true
    if (Array.isArray(v) || typeof v === 'string' || typeof v === 'number') {
        if (!!lV.ctx) lV.ctx.fillStyle = color2rgba(v, alpha)
        lV.currentFill = color2rgba(v, alpha)
    } else {
        if (!!lV.ctx) lV.ctx.fillStyle = v
        lV.currentFill = v
    }
}

export function noFill(): void {
    lV.withFill = false
}

export function shadow(level: number, offsetX: number, offsetY: number,
                       v: number[] | string | number, alpha:number=1): void {
    if (!!lV.ctx) {
        lV.ctx.shadowColor = color2rgba(v, alpha)
        lV.ctx.shadowBlur = level
        lV.ctx.shadowOffsetX = offsetX
        lV.ctx.shadowOffsetY = offsetY
    }
}

/* Shapes */
export function point(x: number, y: number): void {
    if (!!lV.ctx) lV.ctx.fillRect(x, y, 1, 1)
}

export function line(x1: number, y1: number, x2: number, y2: number): void {
    if (!!lV.ctx) {
        lV.ctx.beginPath()
        lV.ctx.moveTo(x1, y1)
        lV.ctx.lineTo(x2, y2)
        lV.ctx.stroke()
    }
}

export function arc(x: number, y: number, r: number, startAngle: number, endAngle: number): void {
    if (!!lV.ctx) {
        lV.ctx.beginPath()
        lV.ctx.arc(x, y, r, startAngle, endAngle)
        lV.commitShape()
    }
}

export function circle(x: number, y: number, r: number): void {
    if (!!lV.ctx) {
        lV.ctx.beginPath()
        lV.ctx.arc(x, y, r, 0, PI * 2)
        lV.commitShape()
    }
}

export function ellipse(x: number, y: number, r1: number, r2: number, angle: number = 0): void {
    if (!!lV.ctx) {
        save()
        translate(x, y)
        rotate(angle)
        lV.ctx.beginPath()
        for (let i = 0; i < TWO_PI; i += 0.01) {
            let xPos = r1 * cos(i)
            let yPos = r2 * sin(i)
            if (i === 0) {
                lV.ctx.moveTo(xPos, yPos)
            } else {
                lV.ctx.lineTo(xPos, yPos)
            }
        }
        lV.commitShape()
        restore()
    }
}

export function ring(x: number, y: number, r1: number, r2: number,
                     startAngle: number = 0, endAngle: number = TWO_PI): void {
    if (!!lV.ctx) {
        let ro = Math.max(r1, r2)
        let ri = Math.min(r1, r2)
        if (startAngle === 0 && endAngle === TWO_PI) {
            lV.ctx.beginPath()
            lV.ctx.arc(x, y, ro, startAngle, endAngle)
            lV.ctx.arc(x, y, ri, endAngle, startAngle, true)
            if (lV.withFill) lV.ctx.fill()
            if (lV.withStroke) {
                lV.ctx.beginPath()
                lV.ctx.arc(x, y, ro, startAngle, endAngle)
                lV.ctx.stroke()
                lV.ctx.beginPath()
                lV.ctx.arc(x, y, ri, startAngle, endAngle)
                lV.ctx.stroke()
            }
        } else {
            lV.ctx.beginPath()
            lV.ctx.arc(x, y, ro, startAngle, endAngle)
            lV.ctx.arc(x, y, ri, endAngle, startAngle, true)
            lV.ctx.closePath()
            lV.commitShape()
        }
    }
}

export function rect(x: number, y: number, w: number, h: number, r: number = 0): void {
    if (!!lV.ctx) {
        lV.ctx.beginPath()
        lV.ctx.moveTo(x + r, y)
        lV.ctx.lineTo(x + w - r, y)
        lV.ctx.arcTo(x + w, y, x + w, y + r, r)
        lV.ctx.lineTo(x + w, y + h - r)
        lV.ctx.arcTo(x + w, y + h, x + w - r, y + h, r)
        lV.ctx.lineTo(x + r, y + h)
        lV.ctx.arcTo(x, y + h, x, y + h - r, r)
        lV.ctx.lineTo(x, y + r)
        lV.ctx.arcTo(x, y, x + r, y, r)
        lV.commitShape()
    }
}

export function star(x: number, y: number, r1: number, r2: number, n: number = 5): void {
    if (!!lV.ctx) {
        let angle = TWO_PI / n
        let halfAngle = angle / 2
        lV.ctx.beginPath()
        for (let a = 0; a < TWO_PI; a += angle) {
            let sx = x + cos(a - HALF_PI) * r2
            let sy = y + sin(a - HALF_PI) * r2
            lV.ctx.lineTo(sx, sy);
            sx = x + cos(a - HALF_PI + halfAngle) * r1
            sy = y + sin(a - HALF_PI + halfAngle) * r1
            lV.ctx.lineTo(sx, sy)
        }
        lV.ctx.closePath()
        lV.commitShape()
    }
}

export function polygon(x: number, y: number, r: number, n: number = 5): void {
    if (!!lV.ctx) {
        let angle = TWO_PI / n
        lV.ctx.beginPath()
        for (let a = 0; a < TWO_PI; a += angle) {
            let sx = x + cos(a - HALF_PI) * r
            let sy = y + sin(a - HALF_PI) * r
            lV.ctx.lineTo(sx, sy)
        }
        lV.ctx.closePath()
        lV.commitShape()
    }
}

export function polyline(pts: number[], closed: boolean = false): void {
    if (!!lV.ctx) {
        lV.ctx.beginPath()
        for (let i = 0; i < pts.length; i += 2) {
            lV.ctx.lineTo(pts[i], pts[i + 1])
        }
        if (closed) lV.ctx.closePath()
        lV.commitShape()
    }
}

export function spline(pts: number[], tension: number = 0.5, closed: boolean = false): void {
    if (!!lV.ctx) {
        save()
        let cp: number[] = []
        let n = pts.length

        if (closed) {
            pts.push(pts[0], pts[1], pts[2], pts[3])
            pts.unshift(pts[n - 1])
            pts.unshift(pts[n - 1])
            for (let i = 0; i < n; i += 2) {
                cp = cp.concat(getControlPoints(pts[i], pts[i + 1], pts[i + 2], pts[i + 3],
                    pts[i + 4], pts[i + 5], tension));
            }
            cp = cp.concat(cp[0], cp[1])
            for (let i = 2; i < n + 2; i += 2) {
                plotPath(pts, cp, i)
            }
        } else {
            for (let i = 0; i < n - 4; i += 2) {
                cp = cp.concat(getControlPoints(pts[i], pts[i + 1], pts[i + 2], pts[i + 3],
                    pts[i + 4], pts[i + 5], tension))
            }
            for (let i = 2; i < pts.length - 5; i += 2) {
                plotPath(pts, cp, i)
            }
            lV.ctx.beginPath()
            lV.ctx.moveTo(pts[0], pts[1])
            lV.ctx.quadraticCurveTo(cp[0], cp[1], pts[2], pts[3])
            lV.ctx.stroke()
            lV.ctx.closePath()

            lV.ctx.beginPath()
            lV.ctx.moveTo(pts[n - 2], pts[n - 1])
            lV.ctx.quadraticCurveTo(cp[2 * n - 10], cp[2 * n - 9], pts[n - 4], pts[n - 3])
            lV.ctx.stroke()
            lV.ctx.closePath()
        }
        restore()
    }
}

function plotPath(pts: number[], cp: number[], i: number) {
    if (!!lV.ctx) {
        lV.ctx.beginPath()
        lV.ctx.moveTo(pts[i], pts[i + 1])
        lV.ctx.bezierCurveTo(cp[2 * i - 2], cp[2 * i - 1], cp[2 * i], cp[2 * i + 1],
            pts[i + 2], pts[i + 3])
        lV.ctx.stroke()
        lV.ctx.closePath()
    }
}

function getControlPoints(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, tension: number) {
    let d01 = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2))
    let d12 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))

    let fa = tension * d01 / (d01 + d12)
    let fb = tension - fa

    let p1x = x1 + fa * (x0 - x2)
    let p1y = y1 + fa * (y0 - y2)

    let p2x = x1 - fb * (x0 - x2)
    let p2y = y1 - fb * (y0 - y2)

    return [p1x, p1y, p2x, p2y]
}

export function bezier(x1: number, y1: number, cp1x: number, cp1y: number, cp2x: number,
                       cp2y: number, x2: number, y2: number): void {
    if (!!lV.ctx) {
        lV.ctx.beginPath()
        lV.ctx.moveTo(x1, y1)
        lV.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y2)
        lV.ctx.stroke()
    }
}

/* Custom Paths */
export function beginPath(x: number, y: number): void {
    if (!!lV.ctx) {
        lV.ctx.beginPath()
        lV.ctx.moveTo(x, y)
    }
}

export function endPath(): void {
    lV.commitShape()
}

export function closePath(): void {
    if (!!lV.ctx) {
        lV.ctx.closePath()
        lV.commitShape()
    }
}

export function moveTo(x: number, y: number): void {
    if (!!lV.ctx) lV.ctx.moveTo(x, y)
}

export function lineTo(x: number, y: number): void {
    if (!!lV.ctx) lV.ctx.lineTo(x, y)
}

export function bezierTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number,
                         x: number, y: number): void {
    if (!!lV.ctx) lV.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
}

export function quadraticTo(cpx: number, cpy: number, x: number, y: number): void {
    if (!!lV.ctx) lV.ctx.quadraticCurveTo(cpx, cpy, x, y)
}

type ImgOrigin = 'left-bottom' | 'right-bottom' | 'center-bottom' |
    'left-top' | 'right-top' | 'center-top' |
    'left-middle' | 'right-middle' | 'center-middle'

export function placeImage(img: HTMLImageElement, x: number, y: number, origin: ImgOrigin,
                           w?: number, h?: number): void {
    let _x = x
    let _y = y
    let _w: number
    let _h: number
    if (w) {
        _w = w
    } else {
        _w = img.naturalWidth
    }
    if (h) {
        _h = h
    } else {
        _h = img.naturalHeight
    }
    if (!!lV.ctx) {
        switch (origin) {
            case 'left-bottom':
                lV.ctx.drawImage(img, _x, _y, _w, -_h)
                break
            case 'right-bottom':
                lV.ctx.drawImage(img, _x - _w, _y , _w, -_h)
                break
            case 'center-bottom':
                lV.ctx.drawImage(img, _x - _w / 2, _y, _w, -_h)
                break
            case 'left-top':
                lV.ctx.drawImage(img, _x, _y, _w, _h)
                break
            case 'right-top':
                lV.ctx.drawImage(img, _x - _w, _y, _w, _h)
                break
            case 'center-top':
                lV.ctx.drawImage(img, _x - _w / 2, _y, _w, _h)
                break
            case 'left-middle':
                lV.ctx.drawImage(img, _x, _y + _h / 2, _w, -_h)
                break
            case 'right-middle':
                lV.ctx.drawImage(img, _x - _w, _y + _h / 2, _w, -_h)
                break
            case 'center-middle':
                lV.ctx.drawImage(img, _x - _w / 2, _y + _h / 2, _w, -_h)
                break
        }
    }
}

'use strict'


import {height, lV, restore, rotate, save, translate, width} from "./limeviz"
import {cos, HALF_PI, PI, sin, TWO_PI} from "./math"
import {color2rgba} from "./colors"

/**
 * This function clears the specified rectangle. If called without parameters it erases entire canvas.
 * @param x X coordinate
 * @param y Y coordinate
 * @param w Width
 * @param h Height
 */
export function clear(x: number = 0, y: number = 0, w: number = width, h: number = height): void {
    if (!!lV.ctx) lV.ctx.clearRect(x, y, w, h)
}

/**
 * This function covers the entire canvas with the specified color.
 * @param c Color
 * @param alpha Transparency - number between `0` and `1`.
 */
export function background(c: number[] | string | number, alpha:number=1): void {
    save()
    if (!!lV.ctx) {
        lV.ctx.fillStyle = color2rgba(c, alpha)
        lV.ctx.fillRect(0, 0, width, height)
    }
    restore()
}

/**
 * This function sets the current stroke color.
 * @param c Color
 * @param alpha Transparency - number between `0` and `1`.
 */
export function stroke(c: number[] | string | number, alpha:number=1): void {
    lV.withStroke = true
    if (!!lV.ctx) lV.ctx.strokeStyle = color2rgba(c, alpha)
    lV.currentStroke = color2rgba(c, alpha)
}

/**
 * This function sets the stroke width.
 * @param w Stroke width
 */
export function strokeWidth(w: number): void {
    lV.withStroke = true
    if (!!lV.ctx) lV.ctx.lineWidth = w
}

/**
 * This function makes the stroke fully transparent.
 */
export function noStroke(): void {
    lV.withStroke = false
}

export type StrokeCupStyle = 'butt' | 'round' | 'square'

/**
 * This function implements `CanvasRenderingContext2D.lineCap` - property of the Canvas 2D API,
 * which determines the shape used to draw the end points of lines.
 * @param style Style of the line ends.
 */
export function strokeCup(style: StrokeCupStyle): void {
    if (!!lV.ctx) lV.ctx.lineCap = style
}

export type JoinStyle = 'bevel' | 'round' | 'miter'

/**
 * This function implements `CanvasRenderingContext2D.lineJoin` - property of the Canvas 2D API,
 * which determines the shape used to join two line segments where they meet.
 * @param style Style of the line joints.
 * @param miterValue Miter limit ratio.
 */
export function strokeJoin(style: JoinStyle, miterValue: number = 10): void {
    if (!!lV.ctx) {
        if (style === 'miter') {
            if (!!lV.ctx) lV.ctx.miterLimit = miterValue
        }
        lV.ctx.lineJoin = style
    }
}

/**
 * This function changes the stroke style from solid to dashed.
 * @param line Segment line length.
 * @param space Space length.
 * @param offset Dash offset
 */
export function dashLine(line: number, space: number, offset: number = 0): void {
    if (!!lV.ctx) {
        lV.ctx.setLineDash([line, space])
        lV.ctx.lineDashOffset = offset
    }
}

/**
 * This function restores the solid style of the stroke.
 */
export function solidLine(): void {
    if (!!lV.ctx) lV.ctx.setLineDash([])
}

/**
 * This function sets the current fill color.
 * @param c Color
 * @param alpha Transparency - number between `0` and `1`.
 */
export function fill(c: number[] | string | number | CanvasGradient, alpha:number=1): void {
    lV.withFill = true
    if (Array.isArray(c) || typeof c === 'string' || typeof c === 'number') {
        if (!!lV.ctx) lV.ctx.fillStyle = color2rgba(c, alpha)
        lV.currentFill = color2rgba(c, alpha)
    } else {
        if (!!lV.ctx) lV.ctx.fillStyle = c
        lV.currentFill = c
    }
}

/**
 * This function makes the fill fully transparent.
 */
export function noFill(): void {
    lV.withFill = false
}

/**
 * This function defines shadow under the drawing elements.
 * @param level Blurriness of the shadow.
 * @param offsetX Horizontal offset.
 * @param offsetY Vertical offset.
 * @param c Color
 * @param alpha Transparency - number between `0` and `1`.
 */
export function shadow(level: number, offsetX: number, offsetY: number,
                       c: number[] | string | number, alpha:number=1): void {
    if (!!lV.ctx) {
        lV.ctx.shadowColor = color2rgba(c, alpha)
        lV.ctx.shadowBlur = level
        lV.ctx.shadowOffsetX = offsetX
        lV.ctx.shadowOffsetY = offsetY
    }
}

/* Shapes */

/**
 * This function draws a single point on the canvas.
 * @param x X coordinate
 * @param y Y coordinate
 */
export function point(x: number, y: number): void {
    if (!!lV.ctx) lV.ctx.fillRect(x, y, 1, 1)
}

/**
 * This function draws a line on the canvas.
 * @param x1 X start coordinate of the line.
 * @param y1 Y start coordinate of the line.
 * @param x2 X end coordinate of the line.
 * @param y2 Y end coordinate of the line.
 */
export function line(x1: number, y1: number, x2: number, y2: number): void {
    if (!!lV.ctx) {
        lV.ctx.beginPath()
        lV.ctx.moveTo(x1, y1)
        lV.ctx.lineTo(x2, y2)
        lV.ctx.stroke()
    }
}

/**
 * This function draws an arc on the canvas (clockwise).
 * @param x X coordinate of the arc's center.
 * @param y Y coordinate of the arc's center.
 * @param r  Arc's radius.
 * @param startAngle Start angle in radians. O - 3 o'clock.
 * @param endAngle End angle in radians.
 */
export function arc(x: number, y: number, r: number, startAngle: number, endAngle: number): void {
    if (!!lV.ctx) {
        lV.ctx.beginPath()
        lV.ctx.arc(x, y, r, startAngle, endAngle)
        lV.commitShape()
    }
}

/**
 * This function draws a circle on the canvas.
 * @param x X coordinate of the circle center.
 * @param y Y coordinate of the circle center.
 * @param r Circle radius.
 */
export function circle(x: number, y: number, r: number): void {
    if (!!lV.ctx) {
        lV.ctx.beginPath()
        lV.ctx.arc(x, y, r, 0, PI * 2)
        lV.commitShape()
    }
}

/**
 * This function draws an ellipse on the canvas.
 * @param x X coordinate of the ellipse center.
 * @param y Y coordinate of the ellipse center.
 * @param r1 Ellipse horizontal radius.
 * @param r2 Ellipse vertical radius.
 * @param angle Ellipse rotation angle in radians.
 */
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

/**
 * This function draws a ring on the canvas.
 * @param x X coordinate of the ring's center.
 * @param y Y coordinate of the ring's center.
 * @param r1 Ring's inner radius.
 * @param r2 Ring's outer radius.
 * @param startAngle Ring's start angle (optional - default 0 - 3 o'clock.)
 * @param endAngle Ring's end angle (optional - default 2π - 3 o'clock.)
 */
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

/**
 * This function draws a rectangle on the canvas.
 * @param x X coordinate of the rectangle corner.
 * @param y Y coordinate of the rectangle corner.
 * @param w Width of the rectangle.
 * @param h Height of the rectangle.
 * @param r Corners radius (optional.)
 */
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

/**
 * This function draws a star on the canvas. x and y define the center of the star.
 * @param x X coordinate of the star center.
 * @param y Y coordinate of the star center.
 * @param r1 Star inner radius.
 * @param r2 Star outer radius.
 * @param n Number of sides (default 5.)
 */
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

/**
 * This function draws a polygon on the canvas. x and y define the center of the polygon.
 * @param x X coordinate of the polygon center.
 * @param y Y coordinate of the polygon center.
 * @param r Polygon radius.
 * @param n Number of sides (default 5.)
 */
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

/**
 * This function draws a polyline on the canvas.
 * @param pts An array of point coordinates.
 * @param closed If `true` the polyline will be closed.
 */
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

/**
 * This function draws a spline through the points `[x1, y1, x2, y2, ..., xn, yn]`.
 * @param pts
 */
export function spline(pts: number[]): void {
    if (!!lV.ctx) {
        lV.ctx.beginPath()
        lV.ctx.moveTo(pts[0], pts[1])
        for (let i = 0; i < pts.length - 2; i += 2) {
            const mx = (pts[i] + pts[i + 2]) / 2
            const my = (pts[i + 1] + pts[i + 3]) / 2
            const cp1 = (mx + pts[i]) / 2
            const cp2 = (mx + pts[i + 2]) / 2
            lV.ctx.quadraticCurveTo(cp1, pts[i + 1], mx, my)
            lV.ctx.quadraticCurveTo(cp2, pts[i + 3], pts[i + 2], pts[i + 3])
        }
        lV.commitShape()
    }
}

/**
 * This function draws the bezier curve between two points. The position of the control points controls curvature.
 * @param x1 X coordinate of the curve start point.
 * @param y1 Y coordinate of the curve start point.
 * @param cp1x X coordinate of the first control point.
 * @param cp1y Y coordinate of the first control point.
 * @param cp2x X coordinate of the second control point.
 * @param cp2y Y coordinate of the second control point.
 * @param x2 X coordinate of the curve end point.
 * @param y2 Y coordinate of the curve end point.
 */
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

/**
 * This function initiates the drawing of the custom shape, and moves the drawing
 * position to point defied by `x` and `y`.
 * @param x X start coordinate of the custom shape.
 * @param y Y start coordinate of the custom shape.
 */
export function beginPath(x: number, y: number): void {
    if (!!lV.ctx) {
        lV.ctx.beginPath()
        lV.ctx.moveTo(x, y)
    }
}

/**
 * This function commits the drawn shape.
 */
export function endPath(): void {
    lV.commitShape()
}

/**
 * This function can be used to close the custom shape.
 */
export function closePath(): void {
    if (!!lV.ctx) {
        lV.ctx.closePath()
        lV.commitShape()
    }
}

/**
 * This function moves the current path point without drawing a line.
 * @param x X coordinate of the destination point.
 * @param y Y coordinate of the destination point.
 */
export function moveTo(x: number, y: number): void {
    if (!!lV.ctx) lV.ctx.moveTo(x, y)
}

/**
 * This function can be used to draw the custom shape. It draws the line to the given end coordinates from the current position.
 * @param x X coordinate of the line end point.
 * @param y Y coordinate of the line end point.
 */
export function lineTo(x: number, y: number): void {
    if (!!lV.ctx) lV.ctx.lineTo(x, y)
}

/**
 * This function can be used to draw the custom shape. It draws the bezier curve
 * to the given end coordinates from the current position.
 * The position of the control points controls curvature.
 * @param cp1x X coordinate of the first control point.
 * @param cp1y Y coordinate of the first control point.
 * @param cp2x X coordinate of the second control point.
 * @param cp2y Y coordinate of the second control point.
 * @param x X coordinate of the curve end point.
 * @param y Y coordinate of the curve end point.
 */
export function bezierTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number,
                         x: number, y: number): void {
    if (!!lV.ctx) lV.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
}

/**
 * This function can be used to draw the custom shape.
 * It draws a quadratic curve from the current path point to the point defined by the function parameters.
 * @param cpx X coordinate of the control point.
 * @param cpy Y coordinate of the control point.
 * @param x X coordinate of the curve end point.
 * @param y Y coordinate of the curve end point.
 */
export function quadraticTo(cpx: number, cpy: number, x: number, y: number): void {
    if (!!lV.ctx) lV.ctx.quadraticCurveTo(cpx, cpy, x, y)
}

export type ImgOrigin = 'left-bottom' | 'right-bottom' | 'center-bottom' |
    'left-top' | 'right-top' | 'center-top' |
    'left-middle' | 'right-middle' | 'center-middle'

/**
 * This function places the preloaded image on the canvas.
 * @param img Preloaded image.
 * @param x X coordinate of the image.
 * @param y Y coordinate of the image.
 * @param origin Location of the image origin.
 * @param w Width of the image.
 * @param h Height of the image.
 */
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

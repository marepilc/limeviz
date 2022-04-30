'use strict';


import {preloader, AssetsObject, assetList} from './assets'
import {round, floor, abs, max, sqrt, pow, constrain} from './math'


class Keyboard {
    public keyIsPressed: boolean
    public altIsPressed: boolean
    public shiftIsPressed: boolean
    public ctrlIsPressed: boolean
    public keyPressed: string | null
    public keyDown: ((key: string) => void) | null
    public keyUp: ((key: string) => void) | null
    private _canvas: HTMLCanvasElement

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas
        this.keyIsPressed = false
        this.altIsPressed = false
        this.shiftIsPressed = false
        this.ctrlIsPressed = false
        this.keyPressed = null
        this.keyDown = null
        this.keyUp = null
        this._canvas.tabIndex = 1; // to make it focusable
        this._canvas.addEventListener('keydown', (e: KeyboardEvent) => {
            this.keyIsPressed = true
            if (e.key === 'Alt') this.altIsPressed = true
            if (e.key === 'Shift') this.shiftIsPressed = true
            if (e.key === 'Control') this.ctrlIsPressed = true
            this.keyPressed = e.key
            if (this.keyDown != null) {
                this.keyDown(e.key)
            }
        })
        this._canvas.addEventListener('keyup', (e: KeyboardEvent) => {
            this.keyIsPressed = false
            if (e.key === 'Alt') this.altIsPressed = false
            if (e.key === 'Shift') this.shiftIsPressed = false
            if (e.key === 'Control') this.ctrlIsPressed = false
            this.keyPressed = null
            if (this.keyUp != null) {
                this.keyUp(e.key)
            }
        })
    }
}

class Mouse {
    private _canvas: HTMLCanvasElement
    private _x: number
    private _y: number
    private _px: number
    private _py: number
    public isPressed: boolean
    public wheel: ((e: WheelEvent) => void) | null
    public down: () => void
    public up: () => void
    public click: () => void
    public dblClick: () => void
    public move: (() => void) | null

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas
        this._x = 0
        this._y = 0
        this._px = 0
        this._py = 0
        this.isPressed = false
        this.wheel = null
        this.down = function () {}
        this.up = function () {}
        this.click = function () {}
        this.dblClick = function () {}
        this.move = null

        this._canvas.addEventListener('mousemove', (e: MouseEvent) => {
            this._updateMousePos(canvas, e)
            if (this.move) this.move()
        })
        this._canvas.addEventListener('wheel', (e: WheelEvent) => {
            this._updateMousePos(canvas, e)
            if (this.wheel != null) {
                this.wheel(e)
            }
        })
        this._canvas.addEventListener('mousedown', () => {
            this.isPressed = true
            this.down()
        })
        this._canvas.addEventListener('mouseup', () => {
            this.isPressed = false
            this.up()
        })
        this._canvas.addEventListener('click', () => {
            this.click()
        })
        this._canvas.addEventListener('dblclick', () => {
            this.dblClick()
        })
    }

    private _updateMousePos(canvas: HTMLCanvasElement, e: MouseEvent) {
        this._px = this._x
        this._py = this._y
        let bbox = canvas.getBoundingClientRect()
        this._x = abs(round((e.clientX - bbox.left) * (width / bbox.width)))
        this._y = abs(round((e.clientY - bbox.top) * (height / bbox.height)))
    }

    get x() {
        return this._x
    }

    get y() {
        return this._y
    }

    get px() {
        return this._px
    }

    get py() {
        return this._py
    }
}

class AnimationCtrl {
    private _fps: number
    private _delay: number
    private _time: number | null
    private readonly _step: (x: number) => void
    private _reqAF: number
    public currentFrame: number
    public isAnimating: boolean
    public start: () => void
    public stop: () => void

    constructor(callback: () => void) {
        this._fps = 60
        this._delay = 1000 / this._fps
        this.currentFrame = 0
        this._time = null
        this._reqAF = 0

        this._step = (timestamp: number) => {
            if (this._time == null) this._time = timestamp
            let seg = floor((timestamp - this._time) / this._delay)
            if (seg > this.currentFrame) {
                // this.currentFrame = seg;
                this.currentFrame++
                callback()
            }
            if (this.isAnimating) {
                this._reqAF = requestAnimationFrame(this._step)
            }
        }

        this.isAnimating = false

        this.start = () => {
            if (!this.isAnimating) {
                this.isAnimating = true
                this._reqAF = requestAnimationFrame(this._step)
            }
        }

        this.stop = () => {

            if (this.isAnimating) {
                this._reqAF = requestAnimationFrame(this._step)
                cancelAnimationFrame(this._reqAF)
                this.isAnimating = false
                // this._time = null;
                // this.currentFrame = 0;
            }
        }
    }

    public get fps() {
        if (this.isAnimating) {
            return this._fps
        } else {
            return 0
        }
    }

    public set fps(v: number) {
        this._fps = v
        this._delay = 1000 / this._fps
        this.currentFrame = 0
        this._time = null
    }
}

class LV {
    public ctx: CanvasRenderingContext2D | null
    public canvas: HTMLCanvasElement
    public dpi: number
    public noLoop: boolean
    public withFill: boolean
    public withStroke: boolean
    public currentFill: string | CanvasGradient
    public currentStroke: string
    public fontStyle: string
    public fontWeight: string
    public fontSize: number
    public fontFamily: string
    public lineHeight: number

    constructor(canvas: HTMLCanvasElement, noLoop = false) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext('2d')
        this.dpi = 300
        this.noLoop = noLoop
        this.withFill = true
        this.withStroke = true
        this.currentFill = '#c53c3c'
        this.currentStroke = '#4dd227'
        this.fontStyle = 'normal'
        this.fontWeight = 'normal'
        this.fontSize = 24
        this.fontFamily = 'sans-serif'
        this.lineHeight = 1.1
    }

    public commitShape() {
        if (this.withFill && !!this.ctx) this.ctx.fill()
        if (this.withStroke && !!this.ctx) this.ctx.stroke()
    }
}

// Global variables
export let
    width: number,
    height: number,
    keyboard: Keyboard,
    mouse: Mouse,
    animation: AnimationCtrl,
    assets: AssetsObject

export let lV: LV

type CursorType = ('auto' | 'default' | 'none' | 'context-menu' | 'help' |
    'pointer' | 'progress' | 'wait' | 'cell' | 'crosshair' | 'text' | 'vertical-text' |
    'alias' | 'copy' | 'move' | 'no-drop' | 'not-allowed' | 'grab' | 'grabbing' |
    'all-scroll' | 'col-resize' | 'n-resize' | 'e-resize' | 's-resize' | 'w-resize' |
    'ne-resize' | 'nw-resize' | 'se-resize' | 'sw-resize' | 'ew-resize' | 'ns-resize' |
    'nesw-resize' | 'nwse-resize' | 'zoom-in' | 'zoom-out')

export function cursor(display: CursorType): void {
    if (!!lV.canvas) lV.canvas.style.cursor = display
}

function setContextDefault(): void {
    if (!!lV.canvas) {
        lV.ctx = lV.canvas.getContext('2d')
        height = lV.canvas.height
        width = lV.canvas.width
        if (!!lV.ctx) {
            lV.ctx.fillStyle = lV.currentFill
            lV.ctx.strokeStyle = lV.currentStroke
            setFont()
        }
    }
}

export function lvStart(setup?: () => void, draw?: () => void,
                        events?: () => void, loadAssets?: () => void) {
    assets = {}
    if (loadAssets != undefined) loadAssets()
    if (assetList.length > 0) {
        preloader.on('complete', onCompletePreloader) // on complete listener
        preloader.load(assetList) // launch the loading process
    } else {
        lVrun(setup, draw, events)
    }

    function onCompletePreloader(): void {
        for (let a of assetList) {
            assets[a.id] = preloader.getResult(a.id)
        }
        lVrun(setup, draw, events)
    }
}

function lVrun(setup?: () => void, draw?: () => void, events?: () => void) {
    if (animation == undefined) {
        animation = new AnimationCtrl(() => {
            // save();
            if (draw != undefined) draw()
            // restore();
        });
    }
    if (setup != undefined) setup()
    if (mouse == undefined) mouse = new Mouse(lV.canvas)
    if (events != undefined) events()
    if (lV.noLoop) {
        // save();
        if (draw != undefined) draw()
        // restore();
    } else {
        animation.start()
    }
}

export function createCanvas(target: HTMLElement, id?: string): void {
    let cnv = document.createElement('canvas')
    if (id !== undefined) cnv.id = id
    if (keyboard == undefined) keyboard = new Keyboard(cnv)
    if (lV == undefined) lV = new LV(cnv)
    target.appendChild(lV.canvas)
    setContextDefault()
}

export function selectCanvas(id: string): void {
    let cnv = <HTMLCanvasElement>document.getElementById(id)
    if (keyboard == undefined) keyboard = new Keyboard(cnv)
    if (lV == undefined) lV = new LV(cnv)
    setContextDefault()
}

export function resizeCanvas(w: number, h: number, canvas: HTMLCanvasElement = lV.canvas): void {
    canvas.setAttribute('width', str(w))
    canvas.setAttribute('height', str(h))
    setContextDefault()
}

/* transformation */
export function translate(x: number, y: number): void {
    if (!!lV.ctx) lV.ctx.translate(x, y)
}

export function rotate(angle: number): void {
    if (!!lV.ctx) lV.ctx.rotate(angle)
}

export function scale(x: number, y: number): void {
    if (!!lV.ctx) lV.ctx.scale(x, y)
}

export function save(): void {
    if (!!lV.ctx) lV.ctx.save()
}

export function restore(): void {
    if (!!lV.ctx) lV.ctx.restore()
}

export function staticDrawing(): void {
    lV.noLoop = true
}

export enum ImgOrigin {
    lb, rb, cb,
    lt, rt, ct,
    lc, rc, cc
}

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
            case ImgOrigin.lb:
                lV.ctx.drawImage(img, _x, _y, _w, -_h)
                break
            case ImgOrigin.rb:
                lV.ctx.drawImage(img, _x - _w, _y , _w, -_h)
                break
            case ImgOrigin.cb:
                lV.ctx.drawImage(img, _x - _w / 2, _y, _w, -_h)
                break
            case ImgOrigin.lt:
                lV.ctx.drawImage(img, _x, _y, _w, _h)
                break
            case ImgOrigin.rt:
                lV.ctx.drawImage(img, _x - _w, _y, _w, _h)
                break
            case ImgOrigin.ct:
                lV.ctx.drawImage(img, _x - _w / 2, _y, _w, _h)
                break
            case ImgOrigin.lc:
                lV.ctx.drawImage(img, _x, _y + _h / 2, _w, -_h)
                break
            case ImgOrigin.rc:
                lV.ctx.drawImage(img, _x - _w, _y + _h / 2, _w, -_h)
                break
            case ImgOrigin.cc:
                lV.ctx.drawImage(img, _x - _w / 2, _y + _h / 2, _w, -_h)
                break
        }
    }
}

export function canvas(): HTMLCanvasElement | undefined {
    if (!!lV.canvas) {
        return lV.canvas
    }
}

//---------------------------------------------------//
/* TYPOGRAPHY */
//---------------------------------------------------//

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

export function textSize(size?: number): void | number {
    if (size != undefined) {
        lV.fontSize = size
        if (!!lV.ctx) {
            setFont()
        }
    } else {
        return lV.fontSize
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

export enum TextAlign {
    left,
    right,
    center,
    start,
    end
}

export enum TextBaseline {
    top,
    hanging,
    middle,
    alphabetic,
    ideographic,
    bottom
}

export function textPlacement(h: TextAlign, v?: TextBaseline): void {
    if (!!lV.ctx) {
        const optionsH: CanvasTextAlign[] = ['left', 'right', 'center', 'start', 'end']
        const optionsV: CanvasTextBaseline[] = ['top', 'hanging', 'middle', 'alphabetic', 'ideographic', 'bottom']
        lV.ctx.textAlign = optionsH[h]
        if (v != undefined) lV.ctx.textBaseline = optionsV[v]
    }
}

function setFont(): void {
    if (!!lV.ctx) {
        lV.ctx.font = `${lV.fontStyle} ${lV.fontWeight} ${lV.fontSize}px ${lV.fontFamily}`
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
                          align: TextAlign = TextAlign.center, outside: boolean = true,
                          inward: boolean = true, kerning: number = 0): number {
    if (!!lV.ctx) {
        let clockwise = (align === TextAlign.left) ? 1 : -1 // draw clockwise if right. Else counterclockwise
        if (!outside) r -= lV.fontSize
        if (((align === TextAlign.center || align === TextAlign.right) && inward) ||
            (align === TextAlign.left && !inward)) text = text.split('').reverse().join('')
        save()
        lV.ctx.translate(x, y)
        let _startAngle = startAngle
        startAngle += HALF_PI
        if (!inward) startAngle += PI
        lV.ctx.textBaseline = 'middle'
        lV.ctx.textAlign = 'center'
        if (align === TextAlign.center) {
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

//---------------------------------------------------//
/* MATH */
//---------------------------------------------------//
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

/* Conversion */

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

/* Functions */



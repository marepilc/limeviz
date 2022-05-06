'use strict';


import {preloader, AssetsObject, assetList} from './assets'
import {round, floor, abs} from './math'
import {setFont} from './typography'


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
    public enter: (() => void) | null
    public leave: (() => void) | null

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
        this.enter = null
        this.leave = null

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
        this._canvas.addEventListener('mouseenter', () => {
            if (typeof this.enter === 'function') this.enter()
        })
        this._canvas.addEventListener('mouseleave', () => {
            if (typeof this.leave === 'function') this.leave()
        })
    }

    private _updateMousePos(canvas: HTMLCanvasElement, e: MouseEvent) {
        this._px = this._x
        this._py = this._y
        let bbox = canvas.getBoundingClientRect()
        this._x = abs(round(e.clientX - bbox.left))
        this._y = abs(round(e.clientY - bbox.top))
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
        let pxRatio = window.devicePixelRatio || 1
        lV.canvas.width = floor(parseInt(lV.canvas.style.width) * pxRatio)
        lV.canvas.height = floor(parseInt(lV.canvas.style.height) * pxRatio)
        width = parseInt(lV.canvas.style.width)
        height = parseInt(lV.canvas.style.height)
        if (!!lV.ctx) {
            lV.ctx.scale(pxRatio, pxRatio)
            lV.ctx.fillStyle = lV.currentFill
            lV.ctx.strokeStyle = lV.currentStroke
            setFont()
        }
    }
}

type UserFunc = (() => void) | null

export function lvStart(setup?: UserFunc, draw?: UserFunc,
                        events?: UserFunc, loadAssets?: UserFunc) {
    assets = {}
    if (typeof loadAssets == 'function') loadAssets()
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

function lVrun(setup?: UserFunc, draw?: UserFunc, events?: UserFunc) {
    if (animation == undefined) {
        animation = new AnimationCtrl(() => {
            if (draw != undefined) draw()
            if (lV.noLoop) animation.stop()
        })
    }
    if (typeof setup == 'function') setup()
    if (typeof events == 'function') {
        if (mouse == undefined) mouse = new Mouse(lV.canvas)
        events()
    }
    animation.start()
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
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
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

export function canvas(): HTMLCanvasElement | undefined {
    if (!!lV.canvas) {
        return lV.canvas
    }
}

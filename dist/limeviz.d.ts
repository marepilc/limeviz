import { AssetsObject } from './assets';
declare class Keyboard {
    keyIsPressed: boolean;
    altIsPressed: boolean;
    shiftIsPressed: boolean;
    ctrlIsPressed: boolean;
    keyPressed: string | null;
    keyDown: ((key: string) => void) | null;
    keyUp: ((key: string) => void) | null;
    private _canvas;
    constructor(canvas: HTMLCanvasElement);
}
declare class Mouse {
    private _canvas;
    private _x;
    private _y;
    private _px;
    private _py;
    isPressed: boolean;
    wheel: ((e: WheelEvent) => void) | null;
    down: () => void;
    up: () => void;
    click: () => void;
    dblClick: () => void;
    move: (() => void) | null;
    constructor(canvas: HTMLCanvasElement);
    private _updateMousePos;
    get x(): number;
    get y(): number;
    get px(): number;
    get py(): number;
}
declare class AnimationCtrl {
    private _fps;
    private _delay;
    private _time;
    private readonly _step;
    private _reqAF;
    currentFrame: number;
    isAnimating: boolean;
    start: () => void;
    stop: () => void;
    constructor(callback: () => void);
    get fps(): number;
    set fps(v: number);
}
declare class LV {
    ctx: CanvasRenderingContext2D | null;
    canvas: HTMLCanvasElement;
    dpi: number;
    noLoop: boolean;
    withFill: boolean;
    withStroke: boolean;
    currentFill: string | CanvasGradient;
    currentStroke: string;
    fontStyle: string;
    fontWeight: string;
    fontSize: number;
    fontFamily: string;
    lineHeight: number;
    constructor(canvas: HTMLCanvasElement, noLoop?: boolean);
    commitShape(): void;
}
export declare let width: number, height: number, keyboard: Keyboard, mouse: Mouse, animation: AnimationCtrl, assets: AssetsObject;
export declare let lV: LV;
declare type CursorType = ('auto' | 'default' | 'none' | 'context-menu' | 'help' | 'pointer' | 'progress' | 'wait' | 'cell' | 'crosshair' | 'text' | 'vertical-text' | 'alias' | 'copy' | 'move' | 'no-drop' | 'not-allowed' | 'grab' | 'grabbing' | 'all-scroll' | 'col-resize' | 'n-resize' | 'e-resize' | 's-resize' | 'w-resize' | 'ne-resize' | 'nw-resize' | 'se-resize' | 'sw-resize' | 'ew-resize' | 'ns-resize' | 'nesw-resize' | 'nwse-resize' | 'zoom-in' | 'zoom-out');
export declare function cursor(display: CursorType): void;
export declare function lvStart(setup?: () => void, draw?: () => void, events?: () => void, loadAssets?: () => void): void;
export declare function createCanvas(target: HTMLElement, id?: string): void;
export declare function selectCanvas(id: string): void;
export declare function resizeCanvas(w: number, h: number, canvas?: HTMLCanvasElement): void;
export declare function translate(x: number, y: number): void;
export declare function rotate(angle: number): void;
export declare function scale(x: number, y: number): void;
export declare function save(): void;
export declare function restore(): void;
export declare function staticDrawing(): void;
export declare enum ImgOrigin {
    lb = 0,
    rb = 1,
    cb = 2,
    lt = 3,
    rt = 4,
    ct = 5,
    lc = 6,
    rc = 7,
    cc = 8
}
export declare function placeImage(img: HTMLImageElement, x: number, y: number, origin: ImgOrigin, w?: number, h?: number): void;
export declare function canvas(): HTMLCanvasElement | undefined;
export declare function text(text: string, x: number, y: number): void;
export declare function textSize(size?: number): void | number;
export declare function textWidth(text: string): number;
export declare function textDim(text: string): {
    w: number;
    h: number;
};
export declare enum TextAlign {
    left = 0,
    right = 1,
    center = 2,
    start = 3,
    end = 4
}
export declare enum TextBaseline {
    top = 0,
    hanging = 1,
    middle = 2,
    alphabetic = 3,
    ideographic = 4,
    bottom = 5
}
export declare function textPlacement(h: TextAlign, v?: TextBaseline): void;
export declare function fontStyle(style?: string): void | string;
export declare function fontWeight(weight?: string): void | string;
export declare function fontFamily(family?: string): void | string;
export declare function lineHeight(height?: number): void | number;
export declare function textOnArc(text: string, x: number, y: number, r: number, startAngle: number, align?: TextAlign, outside?: boolean, inward?: boolean, kerning?: number): number;
export declare function number2str(x: number, radix?: number): string;
export declare function thousandSep(x: number, sep: string): string;
export declare const E: number, PI: number, TWO_PI: number, HALF_PI: number, PHI: number;
export declare let sin: (x: number) => number, cos: (x: number) => number, tan: (x: number) => number, asin: (x: number) => number, acos: (x: number) => number, atan: (x: number) => number, atan2: (y: number, x: number) => number;
export declare function dist(x1: number, y1: number, x2: number, y2: number): number;
export declare function deg2rad(v: number): number;
export declare function int(s: string, radix?: number): number;
export declare let str: StringConstructor;
export declare function mm2px(v: number): number;
export declare function px2mm(v: number): number;
export declare function hexStr(v: number): string;
export {};

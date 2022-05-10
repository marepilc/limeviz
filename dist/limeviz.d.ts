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
    enter: (() => void) | null;
    leave: (() => void) | null;
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
export declare type LengthUnit = 'px' | 'pt' | 'pc' | 'in' | 'Q' | 'mm' | 'cm';
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
    fontUnit: LengthUnit;
    fontFamily: string;
    lineHeight: number;
    constructor(canvas: HTMLCanvasElement, noLoop?: boolean);
    commitShape(): void;
}
export declare let width: number, height: number, keyboard: Keyboard, mouse: Mouse, animation: AnimationCtrl, assets: AssetsObject;
export declare let lV: LV;
declare type CursorType = ('auto' | 'default' | 'none' | 'context-menu' | 'help' | 'pointer' | 'progress' | 'wait' | 'cell' | 'crosshair' | 'text' | 'vertical-text' | 'alias' | 'copy' | 'move' | 'no-drop' | 'not-allowed' | 'grab' | 'grabbing' | 'all-scroll' | 'col-resize' | 'n-resize' | 'e-resize' | 's-resize' | 'w-resize' | 'ne-resize' | 'nw-resize' | 'se-resize' | 'sw-resize' | 'ew-resize' | 'ns-resize' | 'nesw-resize' | 'nwse-resize' | 'zoom-in' | 'zoom-out');
export declare function cursor(display: CursorType): void;
declare type UserFunc = (() => void) | null;
export declare function lvStart(setup?: UserFunc, draw?: UserFunc, events?: UserFunc, loadAssets?: UserFunc): void;
export declare function createCanvas(target: HTMLElement, id?: string): void;
export declare function selectCanvas(id: string): void;
export declare function resizeCanvas(w: number, h: number, canvas?: HTMLCanvasElement): void;
export declare function translate(x: number, y: number): void;
export declare function rotate(angle: number): void;
export declare function scale(x: number, y: number): void;
export declare function save(): void;
export declare function restore(): void;
export declare function staticDrawing(): void;
export declare function canvas(): HTMLCanvasElement | undefined;
export {};

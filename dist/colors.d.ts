export declare function color2rgba(v: number[] | string | number, alpha?: number): string;
export declare function blend(color1: string, color2: string, proportion: number): string;
export declare function randomColor(): string;
export interface CanvasGradient {
    addColorStop(offset: number, color: string): void;
}
export declare function linearGradient(x0: number, y0: number, x1: number, y1: number): CanvasGradient;

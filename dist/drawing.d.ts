export declare function clear(): void;
export declare function background(v: number[] | string | number, alpha?: number): void;
export declare function stroke(v: number[] | string | number, alpha?: number): void;
export declare function strokeWidth(size: number): void;
export declare function noStroke(): void;
export declare enum StrokeCupStyle {
    butt = 0,
    round = 1,
    square = 2
}
export declare function strokeCup(style: StrokeCupStyle): void;
export declare enum JoinStyle {
    bevel = 0,
    round = 1,
    miter = 2
}
export declare function strokeJoin(style: JoinStyle, miterValue?: number): void;
export declare function dashLine(line: number, space: number, offset?: number): void;
export declare function solidLine(): void;
export declare function fill(v: number[] | string | number | CanvasGradient, alpha?: number): void;
export declare function noFill(): void;
export declare function shadow(level: number, offsetX: number, offsetY: number, v: number[] | string | number, alpha?: number): void;
export declare function point(x: number, y: number): void;
export declare function line(x1: number, y1: number, x2: number, y2: number): void;
export declare function arc(x: number, y: number, r: number, startAngle: number, endAngle: number): void;
export declare function circle(x: number, y: number, r: number): void;
export declare function ellipse(x: number, y: number, r1: number, r2: number, angle?: number): void;
export declare function ring(x: number, y: number, r1: number, r2: number, startAngle?: number, endAngle?: number): void;
export declare function rect(x: number, y: number, w: number, h: number, r?: number): void;
export declare function star(x: number, y: number, r1: number, r2: number, n?: number): void;
export declare function polygon(x: number, y: number, r: number, n?: number): void;
export declare function polyline(pts: number[], closed?: boolean): void;
export declare function spline(pts: number[], tension?: number, closed?: boolean): void;
export declare function bezier(x1: number, y1: number, cp1x: number, cp1y: number, cp2x: number, cp2y: number, x2: number, y2: number): void;
export declare function beginPath(x: number, y: number): void;
export declare function endPath(): void;
export declare function closeShape(): void;
export declare function moveTo(x: number, y: number): void;
export declare function lineTo(x: number, y: number): void;
export declare function bezierTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
export declare function quadraticTo(cpx: number, cpy: number, x: number, y: number): void;

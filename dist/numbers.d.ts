export declare class Noise {
    private _min;
    private _max;
    private _range;
    private _value;
    constructor(min: number, max: number, noiseRange: number);
    set min(value: number);
    set max(value: number);
    set noiseRange(value: number);
    get value(): number;
    set value(value: number);
    get intValue(): number;
    private nextValue;
}
export declare function randomInt(a: number, b: number): number;
export declare function choose(items: any[]): any;
export declare function random(...args: number[]): number;
export declare function shuffle(items: any[]): void;
export declare function asc(a: number, b: number): number;
export declare function des(a: number, b: number): number;
export declare function unique(items: any[]): any[];
export declare function fibonacci(n: number): number[];

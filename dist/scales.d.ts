export declare class LinearScale {
    private input;
    private output;
    conv: (v: number) => number;
    constructor(inMin: number, inMax: number, outMin: number, outMax: number);
    private setFunction;
    set inRange(range: [number, number]);
    get inRange(): [number, number];
    set outRange(range: [number, number]);
    get outRange(): [number, number];
}
export declare function linearScale(dataMin: number, dataMax: number, resultMin: number, resultMax: number): (x: number) => number;
export declare function ordinalScale(d: any[], padding: number, resultMin: number, resultMax: number): (x: number) => number;

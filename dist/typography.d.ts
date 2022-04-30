export declare function text(text: string, x: number, y: number): void;
export declare function textSize(size?: number): void | number;
export declare function textWidth(text: string): number;
export declare function textDim(text: string): {
    w: number;
    h: number;
};
declare type TextAlign = 'left' | 'right' | 'center' | 'start' | 'end';
declare type TextBaseline = 'top' | 'middle' | 'alphabetic' | 'hanging' | 'ideographic' | 'bottom';
export declare function textAlign(alignment: TextAlign): void;
export declare function textBaseline(baseline: TextBaseline): void;
export declare function setFont(): void;
export declare function fontStyle(style?: string): void | string;
export declare function fontWeight(weight?: string): void | string;
export declare function fontFamily(family?: string): void | string;
export declare function lineHeight(height?: number): void | number;
export declare function textOnArc(text: string, x: number, y: number, r: number, startAngle: number, align?: TextAlign, outside?: boolean, inward?: boolean, kerning?: number): number;
export {};

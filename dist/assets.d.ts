export interface AssetsObject {
    [key: string]: any;
}
export interface AssetsItem {
    id: string;
    src: string;
}
export declare let assetList: AssetsItem[];
declare class Preloader {
    assets: any;
    onProgress: () => void;
    onComplete: () => void;
    loadingProgress: number;
    loadAssets: any;
    constructor();
    on(eventName: string, callbackFunction: () => void): void;
    load(assets: any[]): void;
    loadJson(id: string, src: string, callback: () => void): void;
    loadImg(id: string, src: string, callback: () => void): void;
    request(src: string, type: XMLHttpRequestResponseType, callback: (response: any) => void): void;
    getResult(id: string): any;
}
export declare let preloader: Preloader;
export declare function addAsset(asset: AssetsItem): void;
export {};

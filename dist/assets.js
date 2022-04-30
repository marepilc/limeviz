'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAsset = exports.preloader = exports.assetList = void 0;
exports.assetList = [];
class Preloader {
    constructor() {
        this.assets = {};
        this.onProgress = () => { };
        this.onComplete = () => { };
        this.loadingProgress = 0;
    }
    on(eventName, callbackFunction) {
        switch (eventName) {
            case 'progress':
                this.onProgress = callbackFunction;
                break;
            case 'complete':
                this.onComplete = callbackFunction;
                break;
        }
    }
    load(assets) {
        let total = assets.length;
        let loaded = 0;
        let onFinishedLoading = () => {
            loaded++;
            this.loadingProgress = loaded / total;
            if (loaded == total) {
                this.onComplete();
            }
        };
        this.loadingProgress = 0;
        for (let count = 0; count < total; count++) {
            let id = assets[count].id;
            let src = assets[count].src;
            let type = src.split('.').pop();
            switch (type) {
                case 'svg':
                case 'png':
                case 'jpg':
                case 'jpeg':
                    this.loadImg(id, src, onFinishedLoading);
                    break;
                // JSON files.
                case 'json':
                    this.loadJson(id, src, onFinishedLoading);
                    break;
                // Default case for unsupported file types.
                default:
                    onFinishedLoading();
                    break;
            }
        }
    }
    loadJson(id, src, callback) {
        this.request(src, 'json', (response) => {
            this.assets[id] = response;
            callback();
        });
    }
    loadImg(id, src, callback) {
        this.request(src, 'blob', (response) => {
            let img = new Image();
            img.src = URL.createObjectURL(response);
            this.assets[id] = img;
            img.onload = callback;
        });
    }
    request(src, type, callback) {
        let xhrObj = new XMLHttpRequest();
        xhrObj.onload = () => {
            callback(xhrObj.response);
        };
        xhrObj.open('get', src, true);
        xhrObj.responseType = type;
        xhrObj.send();
    }
    getResult(id) {
        if (typeof this.assets[id] !== 'undefined') {
            return this.assets[id];
        }
        else {
            return null;
        }
    }
}
exports.preloader = new Preloader();
function addAsset(asset) {
    exports.assetList.push(asset);
}
exports.addAsset = addAsset;

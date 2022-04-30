'use strict'

export interface AssetsObject {
    [key: string]: any
}

export interface AssetsItem {
    id: string,
    src: string
}

export let assetList: AssetsItem[] = []

class Preloader {
    public assets: any
    public onProgress: () => void
    public onComplete: () => void
    public loadingProgress: number
    public loadAssets: any

    constructor() {
        this.assets = {}

        this.onProgress = () => { }
        this.onComplete = () => { }

        this.loadingProgress = 0
    }

    on(eventName: string, callbackFunction: () => void) {
        switch (eventName) {
            case 'progress':
                this.onProgress = callbackFunction
                break;
            case 'complete':
                this.onComplete = callbackFunction
                break;
        }
    }

    load(assets: any[]) {
        let total: number = assets.length

        let loaded: number = 0

        let onFinishedLoading = () => {
            loaded++

            this.loadingProgress = loaded / total
            if (loaded == total) {
                this.onComplete()
            }
        }
        this.loadingProgress = 0
        for (let count = 0; count < total; count++) {

            let id = assets[count].id
            let src = assets[count].src

            let type = src.split('.').pop()

            switch (type) {
                case 'svg':
                case 'png':
                case 'jpg':
                case 'jpeg':
                    this.loadImg(id, src, onFinishedLoading)
                    break

                // JSON files.
                case 'json':
                    this.loadJson(id, src, onFinishedLoading)
                    break

                // Default case for unsupported file types.
                default:
                    onFinishedLoading()
                    break
            }
        }
    }

    loadJson(id: string, src: string, callback: () => void) {

        this.request(src, 'json', (response) => {

            this.assets[id] = response

            callback()
        })
    }

    loadImg(id: string, src: string, callback: () => void) {

        this.request(src, 'blob', (response) => {

            let img = new Image()

            img.src = URL.createObjectURL(response)

            this.assets[id] = img

            img.onload = callback
        })
    }

    request(src: string, type: XMLHttpRequestResponseType, callback: (response: any) => void) {

        let xhrObj = new XMLHttpRequest()

        xhrObj.onload = () => {
            callback(xhrObj.response)
        };

        xhrObj.open('get', src, true)
        xhrObj.responseType = type
        xhrObj.send()
    }

    getResult(id: string) {
        if (typeof this.assets[id] !== 'undefined') {
            return this.assets[id]
        } else {
            return null
        }
    }
}

export let preloader: Preloader = new Preloader()

export function addAsset(asset: AssetsItem): void {
    assetList.push(asset)
}

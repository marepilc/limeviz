'use strict'


export function print(...items: any) {
    if (items.length != 0) {
        console.log(...items)
    } else {
        window.print()
    }
}

export function svg2img(svg: string): HTMLImageElement {
    let img = new Image()
    let blob = new Blob([svg], {type: 'image/svg+xml'})
    img.src = URL.createObjectURL(blob)
    return img
}

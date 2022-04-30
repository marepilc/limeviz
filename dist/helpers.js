'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.svg2img = exports.print = void 0;
function print(...items) {
    if (items.length != 0) {
        console.log(...items);
    }
    else {
        window.print();
    }
}
exports.print = print;
function svg2img(svg) {
    let img = new Image();
    let blob = new Blob([svg], { type: 'image/svg+xml' });
    img.src = URL.createObjectURL(blob);
    return img;
}
exports.svg2img = svg2img;

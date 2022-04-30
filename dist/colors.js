'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.linearGradient = exports.randomColor = exports.blend = exports.color2rgba = void 0;
const limeviz_1 = require("./limeviz");
const helpers_1 = require("./helpers");
const math_1 = require("./math");
const numbers_1 = require("./numbers");
function color2rgba(v, alpha = 1) {
    let r;
    let g;
    let b;
    let a;
    switch (typeof v) {
        case 'object':
            if (Array.isArray(v) && v.length === 3) {
                r = (0, math_1.constrain)(v[0], 0, 255);
                g = (0, math_1.constrain)(v[1], 0, 255);
                b = (0, math_1.constrain)(v[2], 0, 255);
                a = (0, math_1.constrain)(alpha, 0, 1);
            }
            else {
                r = g = b = 0;
                a = 1;
            }
            break;
        case 'number':
            r = g = b = (0, math_1.constrain)(v, 0, 255);
            a = (0, math_1.constrain)(alpha, 0, 1);
            break;
        case 'string':
            let rgb = str2rgb(v);
            r = rgb.r;
            g = rgb.g;
            b = rgb.b;
            a = (0, math_1.constrain)(alpha, 0, 1);
            break;
    }
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}
exports.color2rgba = color2rgba;
function str2rgb(col) {
    let rgb = {
        r: 0,
        g: 0,
        b: 0
    };
    let rgx = /^#+([a-fA-F\d]{6}|[a-fA-F\d]{3})$/;
    if (rgx.test(col)) {
        if (col.length == 4) {
            col = col.slice(0, 2) + col[1] + col.slice(2);
            col = col.slice(0, 4) + col[3] + col.slice(4);
            col = col + col[5];
        }
        rgb.r = (0, helpers_1.int)(col.slice(1, 3), 16);
        rgb.g = (0, helpers_1.int)(col.slice(3, 5), 16);
        rgb.b = (0, helpers_1.int)(col.slice(5), 16);
    }
    return rgb;
}
function blend(color1, color2, proportion) {
    proportion = (0, math_1.constrain)(proportion, 0, 1);
    let c1 = (color1.indexOf('#') === 0) ? color1 : '#' + color1;
    let c2 = (color2.indexOf('#') === 0) ? color2 : '#' + color2;
    let rgx = /^#+([a-fA-F\d]{6}|[a-fA-F\d]{3})$/;
    if (rgx.test(c1) && rgx.test(c2)) {
        let col1 = (c1.length === 7) ? c1.slice(1) : c1;
        let col2 = (c2.length === 7) ? c2.slice(1) : c2;
        let r1 = (0, helpers_1.int)(col1.slice(0, 2), 16);
        let r2 = (0, helpers_1.int)(col2.slice(0, 2), 16);
        let r = (0, math_1.round)((1 - proportion) * r1 + proportion * r2);
        let g1 = (0, helpers_1.int)(col1.slice(2, 4), 16);
        let g2 = (0, helpers_1.int)(col2.slice(2, 4), 16);
        let g = (0, math_1.round)((1 - proportion) * g1 + proportion * g2);
        let b1 = (0, helpers_1.int)(col1.slice(4), 16);
        let b2 = (0, helpers_1.int)(col2.slice(4), 16);
        let b = (0, math_1.round)((1 - proportion) * b1 + proportion * b2);
        let strR = r.toString(16);
        if (strR.length === 1)
            strR = '0' + strR;
        let strG = g.toString(16);
        if (strG.length === 1)
            strG = '0' + strG;
        let strB = b.toString(16);
        if (strB.length === 1)
            strB = '0' + strB;
        return '#' + strR + strG + strB;
    }
    else {
        return '#000000';
    }
}
exports.blend = blend;
function randomColor() {
    let r = (0, helpers_1.hexStr)((0, numbers_1.randomInt)(0, 255));
    let g = (0, helpers_1.hexStr)((0, numbers_1.randomInt)(0, 255));
    let b = (0, helpers_1.hexStr)((0, numbers_1.randomInt)(0, 255));
    return '#' + r + g + b;
}
exports.randomColor = randomColor;
function linearGradient(x0, y0, x1, y1) {
    if (!!limeviz_1.lV.ctx) {
        return limeviz_1.lV.ctx.createLinearGradient(x0, y0, x1, y1);
    }
    else {
        return new CanvasGradient;
    }
}
exports.linearGradient = linearGradient;

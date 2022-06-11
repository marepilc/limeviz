'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.textOnArc = exports.lineHeight = exports.fontFamily = exports.fontWeight = exports.fontStyle = exports.setFont = exports.textBaseline = exports.textAlign = exports.textDim = exports.textWidth = exports.fontUnit = exports.fontSize = exports.text = void 0;
const math_1 = require("./math");
const limeviz_1 = require("./limeviz");
function text(text, x, y) {
    let lines = text.split('\n');
    let lineY = y;
    if (!!limeviz_1.lV.ctx) {
        for (let i = 0; i < lines.length; i++) {
            limeviz_1.lV.ctx.fillText(lines[i], x, lineY);
            lineY += limeviz_1.lV.fontSize * limeviz_1.lV.lineHeight;
        }
    }
}
exports.text = text;
function fontSize(size) {
    if (size != undefined) {
        limeviz_1.lV.fontSize = size;
        if (!!limeviz_1.lV.ctx) {
            setFont();
        }
    }
    else {
        return limeviz_1.lV.fontSize;
    }
}
exports.fontSize = fontSize;
function fontUnit(unit) {
    if (!!limeviz_1.lV) {
        limeviz_1.lV.fontUnit = unit;
    }
}
exports.fontUnit = fontUnit;
function textWidth(text) {
    if (!!limeviz_1.lV.ctx) {
        return limeviz_1.lV.ctx.measureText(text).width;
    }
    else {
        return 0;
    }
}
exports.textWidth = textWidth;
function textDim(text) {
    let lines = text.split('\n');
    let wSize = 0;
    let hSize = 0;
    if (!!limeviz_1.lV.ctx) {
        for (let i = 0; i < lines.length; i++) {
            wSize = (0, math_1.max)([wSize, limeviz_1.lV.ctx.measureText(lines[i]).width]);
            hSize += limeviz_1.lV.fontSize * limeviz_1.lV.lineHeight;
        }
    }
    hSize = hSize - (limeviz_1.lV.fontSize * limeviz_1.lV.lineHeight - limeviz_1.lV.fontSize);
    return {
        w: wSize,
        h: hSize
    };
}
exports.textDim = textDim;
function textAlign(alignment) {
    if (!!limeviz_1.lV.ctx)
        limeviz_1.lV.ctx.textAlign = alignment;
}
exports.textAlign = textAlign;
function textBaseline(baseline) {
    if (!!limeviz_1.lV.ctx)
        limeviz_1.lV.ctx.textBaseline = baseline;
}
exports.textBaseline = textBaseline;
function setFont() {
    if (!!limeviz_1.lV.ctx) {
        limeviz_1.lV.ctx.font = `${limeviz_1.lV.fontStyle} ${limeviz_1.lV.fontWeight} ${limeviz_1.lV.fontSize}${limeviz_1.lV.fontUnit} ${limeviz_1.lV.fontFamily}`;
    }
}
exports.setFont = setFont;
function fontStyle(style) {
    if (style) {
        limeviz_1.lV.fontStyle = style;
        if (!!limeviz_1.lV.ctx) {
            setFont();
        }
    }
    else {
        return limeviz_1.lV.fontStyle;
    }
}
exports.fontStyle = fontStyle;
function fontWeight(weight) {
    if (weight) {
        limeviz_1.lV.fontWeight = weight;
        if (!!limeviz_1.lV.ctx) {
            setFont();
        }
    }
    else {
        return limeviz_1.lV.fontWeight;
    }
}
exports.fontWeight = fontWeight;
function fontFamily(family) {
    if (family) {
        limeviz_1.lV.fontFamily = family;
        if (!!limeviz_1.lV.ctx) {
            setFont();
        }
    }
    else {
        return limeviz_1.lV.fontFamily;
    }
}
exports.fontFamily = fontFamily;
function lineHeight(height) {
    if (height != undefined) {
        limeviz_1.lV.lineHeight = height;
    }
    else {
        return limeviz_1.lV.lineHeight;
    }
}
exports.lineHeight = lineHeight;
function textOnArc(text, x, y, r, startAngle, align = 'center', outside = true, inward = true, kerning = 0) {
    if (!!limeviz_1.lV.ctx) {
        let clockwise = (align === 'left') ? 1 : -1; // draw clockwise if right. Else counterclockwise
        if (!outside)
            r -= limeviz_1.lV.fontSize;
        if (((align === 'center' || align === 'right') && inward) ||
            (align === 'left' && !inward))
            text = text.split('').reverse().join('');
        (0, limeviz_1.save)();
        limeviz_1.lV.ctx.translate(x, y);
        let _startAngle = startAngle;
        startAngle += math_1.HALF_PI;
        if (!inward)
            startAngle += math_1.PI;
        limeviz_1.lV.ctx.textBaseline = 'middle';
        limeviz_1.lV.ctx.textAlign = 'center';
        if (align === 'center') {
            for (let i = 0; i < text.length; i++) {
                let charWidth = limeviz_1.lV.ctx.measureText(text[i]).width;
                startAngle += ((charWidth + (i === text.length - 1 ? 0 : kerning)) /
                    (r - limeviz_1.lV.fontSize)) / 2 * -clockwise;
            }
        }
        let tempAngle = 0;
        limeviz_1.lV.ctx.rotate(startAngle);
        for (let i = 0; i < text.length; i++) {
            let charWidth = limeviz_1.lV.ctx.measureText(text[i]).width;
            limeviz_1.lV.ctx.rotate((charWidth / 2) / (r - limeviz_1.lV.fontSize) * clockwise);
            limeviz_1.lV.ctx.fillText(text[i], 0, (inward ? 1 : -1) * (0 - r + limeviz_1.lV.fontSize / 2));
            limeviz_1.lV.ctx.rotate((charWidth / 2 + kerning) / (r - limeviz_1.lV.fontSize) * clockwise);
            tempAngle += ((charWidth / 2) / (r - limeviz_1.lV.fontSize) * clockwise) +
                ((charWidth / 2 + kerning) / (r - limeviz_1.lV.fontSize) * clockwise);
        }
        (0, limeviz_1.restore)();
        return _startAngle + tempAngle;
    }
    else {
        return 0;
    }
}
exports.textOnArc = textOnArc;

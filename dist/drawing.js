'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.placeImage = exports.quadraticTo = exports.bezierTo = exports.lineTo = exports.moveTo = exports.closePath = exports.endPath = exports.beginPath = exports.bezier = exports.spline = exports.polyline = exports.polygon = exports.star = exports.rect = exports.ring = exports.ellipse = exports.circle = exports.arc = exports.line = exports.point = exports.shadow = exports.noFill = exports.fill = exports.solidLine = exports.dashLine = exports.strokeJoin = exports.strokeCup = exports.noStroke = exports.strokeWidth = exports.stroke = exports.background = exports.clear = void 0;
const limeviz_1 = require("./limeviz");
const math_1 = require("./math");
const colors_1 = require("./colors");
function clear() {
    if (!!limeviz_1.lV.ctx)
        limeviz_1.lV.ctx.clearRect(0, 0, limeviz_1.width, limeviz_1.height);
}
exports.clear = clear;
function background(v, alpha = 1) {
    (0, limeviz_1.save)();
    if (!!limeviz_1.lV.ctx) {
        limeviz_1.lV.ctx.fillStyle = (0, colors_1.color2rgba)(v, alpha);
        limeviz_1.lV.ctx.fillRect(0, 0, limeviz_1.width, limeviz_1.height);
    }
    (0, limeviz_1.restore)();
}
exports.background = background;
function stroke(v, alpha = 1) {
    limeviz_1.lV.withStroke = true;
    if (!!limeviz_1.lV.ctx)
        limeviz_1.lV.ctx.strokeStyle = (0, colors_1.color2rgba)(v, alpha);
    limeviz_1.lV.currentStroke = (0, colors_1.color2rgba)(v, alpha);
}
exports.stroke = stroke;
function strokeWidth(size) {
    limeviz_1.lV.withStroke = true;
    if (!!limeviz_1.lV.ctx)
        limeviz_1.lV.ctx.lineWidth = size;
}
exports.strokeWidth = strokeWidth;
function noStroke() {
    limeviz_1.lV.withStroke = false;
}
exports.noStroke = noStroke;
function strokeCup(style) {
    if (!!limeviz_1.lV.ctx)
        limeviz_1.lV.ctx.lineCap = style;
}
exports.strokeCup = strokeCup;
function strokeJoin(style, miterValue = 10) {
    if (!!limeviz_1.lV.ctx) {
        if (style === 'miter') {
            if (!!limeviz_1.lV.ctx)
                limeviz_1.lV.ctx.miterLimit = miterValue;
        }
        limeviz_1.lV.ctx.lineJoin = style;
    }
}
exports.strokeJoin = strokeJoin;
function dashLine(line, space, offset = 0) {
    if (!!limeviz_1.lV.ctx) {
        limeviz_1.lV.ctx.setLineDash([line, space]);
        limeviz_1.lV.ctx.lineDashOffset = offset;
    }
}
exports.dashLine = dashLine;
function solidLine() {
    if (!!limeviz_1.lV.ctx)
        limeviz_1.lV.ctx.setLineDash([]);
}
exports.solidLine = solidLine;
function fill(v, alpha = 1) {
    limeviz_1.lV.withFill = true;
    if (Array.isArray(v) || typeof v === 'string' || typeof v === 'number') {
        if (!!limeviz_1.lV.ctx)
            limeviz_1.lV.ctx.fillStyle = (0, colors_1.color2rgba)(v, alpha);
        limeviz_1.lV.currentFill = (0, colors_1.color2rgba)(v, alpha);
    }
    else {
        if (!!limeviz_1.lV.ctx)
            limeviz_1.lV.ctx.fillStyle = v;
        limeviz_1.lV.currentFill = v;
    }
}
exports.fill = fill;
function noFill() {
    limeviz_1.lV.withFill = false;
}
exports.noFill = noFill;
function shadow(level, offsetX, offsetY, v, alpha = 1) {
    if (!!limeviz_1.lV.ctx) {
        limeviz_1.lV.ctx.shadowColor = (0, colors_1.color2rgba)(v, alpha);
        limeviz_1.lV.ctx.shadowBlur = level;
        limeviz_1.lV.ctx.shadowOffsetX = offsetX;
        limeviz_1.lV.ctx.shadowOffsetY = offsetY;
    }
}
exports.shadow = shadow;
/* Shapes */
function point(x, y) {
    if (!!limeviz_1.lV.ctx)
        limeviz_1.lV.ctx.fillRect(x, y, 1, 1);
}
exports.point = point;
function line(x1, y1, x2, y2) {
    if (!!limeviz_1.lV.ctx) {
        limeviz_1.lV.ctx.beginPath();
        limeviz_1.lV.ctx.moveTo(x1, y1);
        limeviz_1.lV.ctx.lineTo(x2, y2);
        limeviz_1.lV.ctx.stroke();
    }
}
exports.line = line;
function arc(x, y, r, startAngle, endAngle) {
    if (!!limeviz_1.lV.ctx) {
        limeviz_1.lV.ctx.beginPath();
        limeviz_1.lV.ctx.arc(x, y, r, startAngle, endAngle);
        limeviz_1.lV.commitShape();
    }
}
exports.arc = arc;
function circle(x, y, r) {
    if (!!limeviz_1.lV.ctx) {
        limeviz_1.lV.ctx.beginPath();
        limeviz_1.lV.ctx.arc(x, y, r, 0, math_1.PI * 2);
        limeviz_1.lV.commitShape();
    }
}
exports.circle = circle;
function ellipse(x, y, r1, r2, angle = 0) {
    if (!!limeviz_1.lV.ctx) {
        (0, limeviz_1.save)();
        (0, limeviz_1.translate)(x, y);
        (0, limeviz_1.rotate)(angle);
        limeviz_1.lV.ctx.beginPath();
        for (let i = 0; i < math_1.TWO_PI; i += 0.01) {
            let xPos = r1 * (0, math_1.cos)(i);
            let yPos = r2 * (0, math_1.sin)(i);
            if (i === 0) {
                limeviz_1.lV.ctx.moveTo(xPos, yPos);
            }
            else {
                limeviz_1.lV.ctx.lineTo(xPos, yPos);
            }
        }
        limeviz_1.lV.commitShape();
        (0, limeviz_1.restore)();
    }
}
exports.ellipse = ellipse;
function ring(x, y, r1, r2, startAngle = 0, endAngle = math_1.TWO_PI) {
    if (!!limeviz_1.lV.ctx) {
        let ro = Math.max(r1, r2);
        let ri = Math.min(r1, r2);
        if (startAngle === 0 && endAngle === math_1.TWO_PI) {
            limeviz_1.lV.ctx.beginPath();
            limeviz_1.lV.ctx.arc(x, y, ro, startAngle, endAngle);
            limeviz_1.lV.ctx.arc(x, y, ri, endAngle, startAngle, true);
            if (limeviz_1.lV.withFill)
                limeviz_1.lV.ctx.fill();
            if (limeviz_1.lV.withStroke) {
                limeviz_1.lV.ctx.beginPath();
                limeviz_1.lV.ctx.arc(x, y, ro, startAngle, endAngle);
                limeviz_1.lV.ctx.stroke();
                limeviz_1.lV.ctx.beginPath();
                limeviz_1.lV.ctx.arc(x, y, ri, startAngle, endAngle);
                limeviz_1.lV.ctx.stroke();
            }
        }
        else {
            limeviz_1.lV.ctx.beginPath();
            limeviz_1.lV.ctx.arc(x, y, ro, startAngle, endAngle);
            limeviz_1.lV.ctx.arc(x, y, ri, endAngle, startAngle, true);
            limeviz_1.lV.ctx.closePath();
            limeviz_1.lV.commitShape();
        }
    }
}
exports.ring = ring;
function rect(x, y, w, h, r = 0) {
    if (!!limeviz_1.lV.ctx) {
        limeviz_1.lV.ctx.beginPath();
        limeviz_1.lV.ctx.moveTo(x + r, y);
        limeviz_1.lV.ctx.lineTo(x + w - r, y);
        limeviz_1.lV.ctx.arcTo(x + w, y, x + w, y + r, r);
        limeviz_1.lV.ctx.lineTo(x + w, y + h - r);
        limeviz_1.lV.ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
        limeviz_1.lV.ctx.lineTo(x + r, y + h);
        limeviz_1.lV.ctx.arcTo(x, y + h, x, y + h - r, r);
        limeviz_1.lV.ctx.lineTo(x, y + r);
        limeviz_1.lV.ctx.arcTo(x, y, x + r, y, r);
        limeviz_1.lV.commitShape();
    }
}
exports.rect = rect;
function star(x, y, r1, r2, n = 5) {
    if (!!limeviz_1.lV.ctx) {
        let angle = math_1.TWO_PI / n;
        let halfAngle = angle / 2;
        limeviz_1.lV.ctx.beginPath();
        for (let a = 0; a < math_1.TWO_PI; a += angle) {
            let sx = x + (0, math_1.cos)(a - math_1.HALF_PI) * r2;
            let sy = y + (0, math_1.sin)(a - math_1.HALF_PI) * r2;
            limeviz_1.lV.ctx.lineTo(sx, sy);
            sx = x + (0, math_1.cos)(a - math_1.HALF_PI + halfAngle) * r1;
            sy = y + (0, math_1.sin)(a - math_1.HALF_PI + halfAngle) * r1;
            limeviz_1.lV.ctx.lineTo(sx, sy);
        }
        limeviz_1.lV.ctx.closePath();
        limeviz_1.lV.commitShape();
    }
}
exports.star = star;
function polygon(x, y, r, n = 5) {
    if (!!limeviz_1.lV.ctx) {
        let angle = math_1.TWO_PI / n;
        limeviz_1.lV.ctx.beginPath();
        for (let a = 0; a < math_1.TWO_PI; a += angle) {
            let sx = x + (0, math_1.cos)(a - math_1.HALF_PI) * r;
            let sy = y + (0, math_1.sin)(a - math_1.HALF_PI) * r;
            limeviz_1.lV.ctx.lineTo(sx, sy);
        }
        limeviz_1.lV.ctx.closePath();
        limeviz_1.lV.commitShape();
    }
}
exports.polygon = polygon;
function polyline(pts, closed = false) {
    if (!!limeviz_1.lV.ctx) {
        limeviz_1.lV.ctx.beginPath();
        for (let i = 0; i < pts.length; i += 2) {
            limeviz_1.lV.ctx.lineTo(pts[i], pts[i + 1]);
        }
        if (closed)
            limeviz_1.lV.ctx.closePath();
        limeviz_1.lV.commitShape();
    }
}
exports.polyline = polyline;
function spline(pts, tension = 0.5, closed = false) {
    if (!!limeviz_1.lV.ctx) {
        (0, limeviz_1.save)();
        let cp = [];
        let n = pts.length;
        if (closed) {
            pts.push(pts[0], pts[1], pts[2], pts[3]);
            pts.unshift(pts[n - 1]);
            pts.unshift(pts[n - 1]);
            for (let i = 0; i < n; i += 2) {
                cp = cp.concat(getControlPoints(pts[i], pts[i + 1], pts[i + 2], pts[i + 3], pts[i + 4], pts[i + 5], tension));
            }
            cp = cp.concat(cp[0], cp[1]);
            for (let i = 2; i < n + 2; i += 2) {
                plotPath(pts, cp, i);
            }
        }
        else {
            for (let i = 0; i < n - 4; i += 2) {
                cp = cp.concat(getControlPoints(pts[i], pts[i + 1], pts[i + 2], pts[i + 3], pts[i + 4], pts[i + 5], tension));
            }
            for (let i = 2; i < pts.length - 5; i += 2) {
                plotPath(pts, cp, i);
            }
            limeviz_1.lV.ctx.beginPath();
            limeviz_1.lV.ctx.moveTo(pts[0], pts[1]);
            limeviz_1.lV.ctx.quadraticCurveTo(cp[0], cp[1], pts[2], pts[3]);
            limeviz_1.lV.ctx.stroke();
            limeviz_1.lV.ctx.closePath();
            limeviz_1.lV.ctx.beginPath();
            limeviz_1.lV.ctx.moveTo(pts[n - 2], pts[n - 1]);
            limeviz_1.lV.ctx.quadraticCurveTo(cp[2 * n - 10], cp[2 * n - 9], pts[n - 4], pts[n - 3]);
            limeviz_1.lV.ctx.stroke();
            limeviz_1.lV.ctx.closePath();
        }
        (0, limeviz_1.restore)();
    }
}
exports.spline = spline;
function plotPath(pts, cp, i) {
    if (!!limeviz_1.lV.ctx) {
        limeviz_1.lV.ctx.beginPath();
        limeviz_1.lV.ctx.moveTo(pts[i], pts[i + 1]);
        limeviz_1.lV.ctx.bezierCurveTo(cp[2 * i - 2], cp[2 * i - 1], cp[2 * i], cp[2 * i + 1], pts[i + 2], pts[i + 3]);
        limeviz_1.lV.ctx.stroke();
        limeviz_1.lV.ctx.closePath();
    }
}
function getControlPoints(x0, y0, x1, y1, x2, y2, tension) {
    let d01 = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
    let d12 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    let fa = tension * d01 / (d01 + d12);
    let fb = tension - fa;
    let p1x = x1 + fa * (x0 - x2);
    let p1y = y1 + fa * (y0 - y2);
    let p2x = x1 - fb * (x0 - x2);
    let p2y = y1 - fb * (y0 - y2);
    return [p1x, p1y, p2x, p2y];
}
function bezier(x1, y1, cp1x, cp1y, cp2x, cp2y, x2, y2) {
    if (!!limeviz_1.lV.ctx) {
        limeviz_1.lV.ctx.beginPath();
        limeviz_1.lV.ctx.moveTo(x1, y1);
        limeviz_1.lV.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y2);
        limeviz_1.lV.ctx.stroke();
    }
}
exports.bezier = bezier;
/* Custom Paths */
function beginPath(x, y) {
    if (!!limeviz_1.lV.ctx) {
        limeviz_1.lV.ctx.beginPath();
        limeviz_1.lV.ctx.moveTo(x, y);
    }
}
exports.beginPath = beginPath;
function endPath() {
    limeviz_1.lV.commitShape();
}
exports.endPath = endPath;
function closePath() {
    if (!!limeviz_1.lV.ctx) {
        limeviz_1.lV.ctx.closePath();
        limeviz_1.lV.commitShape();
    }
}
exports.closePath = closePath;
function moveTo(x, y) {
    if (!!limeviz_1.lV.ctx)
        limeviz_1.lV.ctx.moveTo(x, y);
}
exports.moveTo = moveTo;
function lineTo(x, y) {
    if (!!limeviz_1.lV.ctx)
        limeviz_1.lV.ctx.lineTo(x, y);
}
exports.lineTo = lineTo;
function bezierTo(cp1x, cp1y, cp2x, cp2y, x, y) {
    if (!!limeviz_1.lV.ctx)
        limeviz_1.lV.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
}
exports.bezierTo = bezierTo;
function quadraticTo(cpx, cpy, x, y) {
    if (!!limeviz_1.lV.ctx)
        limeviz_1.lV.ctx.quadraticCurveTo(cpx, cpy, x, y);
}
exports.quadraticTo = quadraticTo;
function placeImage(img, x, y, origin, w, h) {
    let _x = x;
    let _y = y;
    let _w;
    let _h;
    if (w) {
        _w = w;
    }
    else {
        _w = img.naturalWidth;
    }
    if (h) {
        _h = h;
    }
    else {
        _h = img.naturalHeight;
    }
    if (!!limeviz_1.lV.ctx) {
        switch (origin) {
            case 'left-bottom':
                limeviz_1.lV.ctx.drawImage(img, _x, _y, _w, -_h);
                break;
            case 'right-bottom':
                limeviz_1.lV.ctx.drawImage(img, _x - _w, _y, _w, -_h);
                break;
            case 'center-bottom':
                limeviz_1.lV.ctx.drawImage(img, _x - _w / 2, _y, _w, -_h);
                break;
            case 'left-top':
                limeviz_1.lV.ctx.drawImage(img, _x, _y, _w, _h);
                break;
            case 'right-top':
                limeviz_1.lV.ctx.drawImage(img, _x - _w, _y, _w, _h);
                break;
            case 'center-top':
                limeviz_1.lV.ctx.drawImage(img, _x - _w / 2, _y, _w, _h);
                break;
            case 'left-middle':
                limeviz_1.lV.ctx.drawImage(img, _x, _y + _h / 2, _w, -_h);
                break;
            case 'right-middle':
                limeviz_1.lV.ctx.drawImage(img, _x - _w, _y + _h / 2, _w, -_h);
                break;
            case 'center-middle':
                limeviz_1.lV.ctx.drawImage(img, _x - _w / 2, _y + _h / 2, _w, -_h);
                break;
        }
    }
}
exports.placeImage = placeImage;

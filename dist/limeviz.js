'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.quadraticTo = exports.bezierTo = exports.lineTo = exports.moveTo = exports.closeShape = exports.endPath = exports.beginPath = exports.bezier = exports.spline = exports.polyline = exports.polygon = exports.star = exports.rect = exports.ring = exports.ellipse = exports.circle = exports.arc = exports.line = exports.point = exports.shadow = exports.noFill = exports.fill = exports.solidLine = exports.dashLine = exports.strokeJoin = exports.JoinStyle = exports.strokeCup = exports.StrokeCupStyle = exports.noStroke = exports.strokeWidth = exports.stroke = exports.background = exports.clear = exports.staticDrawing = exports.restore = exports.save = exports.scale = exports.rotate = exports.translate = exports.resizeCanvas = exports.selectCanvas = exports.createCanvas = exports.lvStart = exports.cursor = exports.assets = exports.animation = exports.mouse = exports.keyboard = exports.height = exports.width = void 0;
exports.round2str = exports.round = exports.hexStr = exports.px2mm = exports.mm2px = exports.str = exports.int = exports.deg2rad = exports.dist = exports.atan2 = exports.atan = exports.acos = exports.asin = exports.tan = exports.cos = exports.sin = exports.PHI = exports.HALF_PI = exports.TWO_PI = exports.PI = exports.E = exports.thousandSep = exports.number2str = exports.textOnArc = exports.lineHeight = exports.fontFamily = exports.fontWeight = exports.fontStyle = exports.textPlacement = exports.TextBaseline = exports.TextAlign = exports.textDim = exports.textWidth = exports.textSize = exports.text = exports.canvas = exports.placeImage = exports.ImgOrigin = exports.linearGradient = exports.randomColor = exports.blend = exports.color2rgba = exports.magenta = exports.blue = exports.red = exports.green = exports.orange = exports.yellow = exports.dark = exports.light = void 0;
exports.addAsset = exports.svg2img = exports.print = exports.ordinalScale = exports.linearScale = exports.LinearScale = exports.fibonacci = exports.unique = exports.shuffle = exports.random = exports.choose = exports.randomInt = exports.Noise = exports.Vector = exports.stdDev = exports.SDevMethod = exports.dataRange = exports.iqr = exports.revCentile = exports.centile = exports.avg = exports.sum = exports.min = exports.max = exports.abs = exports.sqrt = exports.pow = exports.sq = exports.constrain = exports.ceil = exports.floor = void 0;
class Keyboard {
    constructor(canvas) {
        this._canvas = canvas;
        this.keyIsPressed = false;
        this.altIsPressed = false;
        this.shiftIsPressed = false;
        this.ctrlIsPressed = false;
        this.keyPressed = null;
        this.keyDown = null;
        this.keyUp = null;
        this._canvas.tabIndex = 1; // to make it focusable
        this._canvas.addEventListener('keydown', (e) => {
            this.keyIsPressed = true;
            if (e.key === 'Alt')
                this.altIsPressed = true;
            if (e.key === 'Shift')
                this.shiftIsPressed = true;
            if (e.key === 'Control')
                this.ctrlIsPressed = true;
            this.keyPressed = e.key;
            if (this.keyDown != null) {
                this.keyDown(e.key);
            }
        });
        this._canvas.addEventListener('keyup', (e) => {
            this.keyIsPressed = false;
            if (e.key === 'Alt')
                this.altIsPressed = false;
            if (e.key === 'Shift')
                this.shiftIsPressed = false;
            if (e.key === 'Control')
                this.ctrlIsPressed = false;
            this.keyPressed = null;
            if (this.keyUp != null) {
                this.keyUp(e.key);
            }
        });
    }
}
class Mouse {
    constructor(canvas) {
        this._canvas = canvas;
        this._x = 0;
        this._y = 0;
        this._px = 0;
        this._py = 0;
        this.isPressed = false;
        this.wheel = null;
        this.down = function () { };
        this.up = function () { };
        this.click = function () { };
        this.dblClick = function () { };
        this.move = null;
        this._canvas.addEventListener('mousemove', (e) => {
            this._updateMousePos(canvas, e);
            if (this.move)
                this.move();
        });
        this._canvas.addEventListener('wheel', (e) => {
            this._updateMousePos(canvas, e);
            if (this.wheel != null) {
                this.wheel(e);
            }
        });
        this._canvas.addEventListener('mousedown', () => {
            this.isPressed = true;
            this.down();
        });
        this._canvas.addEventListener('mouseup', () => {
            this.isPressed = false;
            this.up();
        });
        this._canvas.addEventListener('click', () => {
            this.click();
        });
        this._canvas.addEventListener('dblclick', () => {
            this.dblClick();
        });
    }
    _updateMousePos(canvas, e) {
        this._px = this._x;
        this._py = this._y;
        let bbox = canvas.getBoundingClientRect();
        this._x = (0, exports.abs)(round((e.clientX - bbox.left) * (exports.width / bbox.width)));
        this._y = (0, exports.abs)(round((e.clientY - bbox.top) * (exports.height / bbox.height)));
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get px() {
        return this._px;
    }
    get py() {
        return this._py;
    }
}
class AnimationCtrl {
    constructor(callback) {
        this._fps = 60;
        this._delay = 1000 / this._fps;
        this.currentFrame = 0;
        this._time = null;
        this._reqAF = 0;
        this._step = (timestamp) => {
            if (this._time == null)
                this._time = timestamp;
            let seg = (0, exports.floor)((timestamp - this._time) / this._delay);
            if (seg > this.currentFrame) {
                // this.currentFrame = seg;
                this.currentFrame++;
                callback();
            }
            if (this.isAnimating) {
                this._reqAF = requestAnimationFrame(this._step);
            }
        };
        this.isAnimating = false;
        this.start = () => {
            if (!this.isAnimating) {
                this.isAnimating = true;
                this._reqAF = requestAnimationFrame(this._step);
            }
        };
        this.stop = () => {
            if (this.isAnimating) {
                this._reqAF = requestAnimationFrame(this._step);
                cancelAnimationFrame(this._reqAF);
                this.isAnimating = false;
                // this._time = null;
                // this.currentFrame = 0;
            }
        };
    }
    get fps() {
        if (this.isAnimating) {
            return this._fps;
        }
        else {
            return 0;
        }
    }
    set fps(v) {
        this._fps = v;
        this._delay = 1000 / this._fps;
        this.currentFrame = 0;
        this._time = null;
    }
}
class LV {
    constructor(canvas, noLoop = false) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.dpi = 300;
        this.noLoop = noLoop;
        this.withFill = true;
        this.withStroke = true;
        this.currentFill = '#c53c3c';
        this.currentStroke = '#4dd227';
        this.fontStyle = 'normal';
        this.fontWeight = 'normal';
        this.fontSize = 24;
        this.fontFamily = 'sans-serif';
        this.lineHeight = 1.1;
    }
    commitShape() {
        if (this.withFill && !!this.ctx)
            this.ctx.fill();
        if (this.withStroke && !!this.ctx)
            this.ctx.stroke();
    }
}
let lV;
let assetList = [];
function cursor(display) {
    if (!!lV.canvas)
        lV.canvas.style.cursor = display;
}
exports.cursor = cursor;
function setContextDefault() {
    if (!!lV.canvas) {
        lV.ctx = lV.canvas.getContext('2d');
        exports.height = lV.canvas.height;
        exports.width = lV.canvas.width;
        if (!!lV.ctx) {
            lV.ctx.fillStyle = lV.currentFill;
            lV.ctx.strokeStyle = lV.currentStroke;
            setFont();
        }
    }
}
function lvStart(setup, draw, events, loadAssets) {
    exports.assets = {};
    if (loadAssets != undefined)
        loadAssets();
    if (assetList.length > 0) {
        preloader.on('complete', onCompletePreloader); // on complete listener
        preloader.load(assetList); // launch the loading process
    }
    else {
        lVrun(setup, draw, events);
    }
    function onCompletePreloader() {
        for (let a of assetList) {
            exports.assets[a.id] = preloader.getResult(a.id);
        }
        lVrun(setup, draw, events);
    }
}
exports.lvStart = lvStart;
function lVrun(setup, draw, events) {
    if (exports.animation == undefined) {
        exports.animation = new AnimationCtrl(() => {
            // save();
            if (draw != undefined)
                draw();
            // restore();
        });
    }
    if (setup != undefined)
        setup();
    if (exports.mouse == undefined)
        exports.mouse = new Mouse(lV.canvas);
    if (events != undefined)
        events();
    if (lV.noLoop) {
        // save();
        if (draw != undefined)
            draw();
        // restore();
    }
    else {
        exports.animation.start();
    }
}
function createCanvas(target, id) {
    let cnv = document.createElement('canvas');
    if (id !== undefined)
        cnv.id = id;
    if (exports.keyboard == undefined)
        exports.keyboard = new Keyboard(cnv);
    if (lV == undefined)
        lV = new LV(cnv);
    target.appendChild(lV.canvas);
    setContextDefault();
}
exports.createCanvas = createCanvas;
function selectCanvas(id) {
    let cnv = document.getElementById(id);
    if (exports.keyboard == undefined)
        exports.keyboard = new Keyboard(cnv);
    if (lV == undefined)
        lV = new LV(cnv);
    setContextDefault();
}
exports.selectCanvas = selectCanvas;
function resizeCanvas(w, h, canvas = lV.canvas) {
    canvas.setAttribute('width', (0, exports.str)(w));
    canvas.setAttribute('height', (0, exports.str)(h));
    setContextDefault();
}
exports.resizeCanvas = resizeCanvas;
/* transformation */
function translate(x, y) {
    if (!!lV.ctx)
        lV.ctx.translate(x, y);
}
exports.translate = translate;
function rotate(angle) {
    if (!!lV.ctx)
        lV.ctx.rotate(angle);
}
exports.rotate = rotate;
function scale(x, y) {
    if (!!lV.ctx)
        lV.ctx.scale(x, y);
}
exports.scale = scale;
function save() {
    if (!!lV.ctx)
        lV.ctx.save();
}
exports.save = save;
function restore() {
    if (!!lV.ctx)
        lV.ctx.restore();
}
exports.restore = restore;
function staticDrawing() {
    lV.noLoop = true;
}
exports.staticDrawing = staticDrawing;
//---------------------------------------------------//
/* DRAWING */
//---------------------------------------------------//
function clear() {
    if (!!lV.ctx)
        lV.ctx.clearRect(0, 0, exports.width, exports.height);
}
exports.clear = clear;
function background(v, alpha = 1) {
    save();
    if (!!lV.ctx) {
        lV.ctx.fillStyle = color2rgba(v, alpha);
        lV.ctx.fillRect(0, 0, exports.width, exports.height);
    }
    restore();
}
exports.background = background;
/* stroke and fill */
function stroke(v, alpha = 1) {
    lV.withStroke = true;
    if (!!lV.ctx)
        lV.ctx.strokeStyle = color2rgba(v, alpha);
    lV.currentStroke = color2rgba(v, alpha);
}
exports.stroke = stroke;
function strokeWidth(size) {
    lV.withStroke = true;
    if (!!lV.ctx)
        lV.ctx.lineWidth = size;
}
exports.strokeWidth = strokeWidth;
function noStroke() {
    lV.withStroke = false;
}
exports.noStroke = noStroke;
var StrokeCupStyle;
(function (StrokeCupStyle) {
    StrokeCupStyle[StrokeCupStyle["butt"] = 0] = "butt";
    StrokeCupStyle[StrokeCupStyle["round"] = 1] = "round";
    StrokeCupStyle[StrokeCupStyle["square"] = 2] = "square";
})(StrokeCupStyle = exports.StrokeCupStyle || (exports.StrokeCupStyle = {}));
function strokeCup(style) {
    let types = ['butt', 'round', 'square'];
    if (!!lV.ctx)
        lV.ctx.lineCap = types[style];
}
exports.strokeCup = strokeCup;
var JoinStyle;
(function (JoinStyle) {
    JoinStyle[JoinStyle["bevel"] = 0] = "bevel";
    JoinStyle[JoinStyle["round"] = 1] = "round";
    JoinStyle[JoinStyle["miter"] = 2] = "miter";
})(JoinStyle = exports.JoinStyle || (exports.JoinStyle = {}));
function strokeJoin(style, miterValue = 10) {
    let types = ['bevel', 'round', 'miter'];
    if (style === JoinStyle.miter) {
        if (!!lV.ctx)
            lV.ctx.miterLimit = miterValue;
    }
    if (!!lV.ctx)
        lV.ctx.lineJoin = types[style];
}
exports.strokeJoin = strokeJoin;
function dashLine(line, space, offset = 0) {
    if (!!lV.ctx) {
        lV.ctx.setLineDash([line, space]);
        lV.ctx.lineDashOffset = offset;
    }
}
exports.dashLine = dashLine;
function solidLine() {
    if (!!lV.ctx)
        lV.ctx.setLineDash([]);
}
exports.solidLine = solidLine;
function fill(v, alpha = 1) {
    lV.withFill = true;
    if (Array.isArray(v) || typeof v === 'string' || typeof v === 'number') {
        if (!!lV.ctx)
            lV.ctx.fillStyle = color2rgba(v, alpha);
        lV.currentFill = color2rgba(v, alpha);
    }
    else {
        if (!!lV.ctx)
            lV.ctx.fillStyle = v;
        lV.currentFill = v;
    }
}
exports.fill = fill;
function noFill() {
    lV.withFill = false;
}
exports.noFill = noFill;
function shadow(level, offsetX, offsetY, v, alpha = 1) {
    if (!!lV.ctx) {
        lV.ctx.shadowColor = color2rgba(v, alpha);
        lV.ctx.shadowBlur = level;
        lV.ctx.shadowOffsetX = offsetX;
        lV.ctx.shadowOffsetY = offsetY;
    }
}
exports.shadow = shadow;
/* Shapes */
function point(x, y) {
    if (!!lV.ctx)
        lV.ctx.fillRect(x, y, 1, 1);
}
exports.point = point;
function line(x1, y1, x2, y2) {
    if (!!lV.ctx) {
        lV.ctx.beginPath();
        lV.ctx.moveTo(x1, y1);
        lV.ctx.lineTo(x2, y2);
        lV.ctx.stroke();
    }
}
exports.line = line;
function arc(x, y, r, startAngle, endAngle) {
    if (!!lV.ctx) {
        lV.ctx.beginPath();
        lV.ctx.arc(x, y, r, startAngle, endAngle);
        lV.commitShape();
    }
}
exports.arc = arc;
function circle(x, y, r) {
    if (!!lV.ctx) {
        lV.ctx.beginPath();
        lV.ctx.arc(x, y, r, 0, exports.PI * 2);
        lV.commitShape();
    }
}
exports.circle = circle;
function ellipse(x, y, r1, r2, angle = 0) {
    if (!!lV.ctx) {
        save();
        translate(x, y);
        rotate(angle);
        lV.ctx.beginPath();
        for (let i = 0; i < exports.TWO_PI; i += 0.01) {
            let xPos = r1 * (0, exports.cos)(i);
            let yPos = r2 * (0, exports.sin)(i);
            if (i === 0) {
                lV.ctx.moveTo(xPos, yPos);
            }
            else {
                lV.ctx.lineTo(xPos, yPos);
            }
        }
        lV.commitShape();
        restore();
    }
}
exports.ellipse = ellipse;
function ring(x, y, r1, r2, startAngle = 0, endAngle = exports.TWO_PI) {
    if (!!lV.ctx) {
        let ro = Math.max(r1, r2);
        let ri = Math.min(r1, r2);
        if (startAngle === 0 && endAngle === exports.TWO_PI) {
            lV.ctx.beginPath();
            lV.ctx.arc(x, y, ro, startAngle, endAngle);
            lV.ctx.arc(x, y, ri, endAngle, startAngle, true);
            if (lV.withFill)
                lV.ctx.fill();
            if (lV.withStroke) {
                lV.ctx.beginPath();
                lV.ctx.arc(x, y, ro, startAngle, endAngle);
                lV.ctx.stroke();
                lV.ctx.beginPath();
                lV.ctx.arc(x, y, ri, startAngle, endAngle);
                lV.ctx.stroke();
            }
        }
        else {
            lV.ctx.beginPath();
            lV.ctx.arc(x, y, ro, startAngle, endAngle);
            lV.ctx.arc(x, y, ri, endAngle, startAngle, true);
            lV.ctx.closePath();
            lV.commitShape();
        }
    }
}
exports.ring = ring;
function rect(x, y, w, h, r = 0) {
    if (!!lV.ctx) {
        lV.ctx.beginPath();
        lV.ctx.moveTo(x + r, y);
        lV.ctx.lineTo(x + w - r, y);
        lV.ctx.arcTo(x + w, y, x + w, y + r, r);
        lV.ctx.lineTo(x + w, y + h - r);
        lV.ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
        lV.ctx.lineTo(x + r, y + h);
        lV.ctx.arcTo(x, y + h, x, y + h - r, r);
        lV.ctx.lineTo(x, y + r);
        lV.ctx.arcTo(x, y, x + r, y, r);
        lV.commitShape();
    }
}
exports.rect = rect;
function star(x, y, r1, r2, n = 5) {
    if (!!lV.ctx) {
        let angle = exports.TWO_PI / n;
        let halfAngle = angle / 2;
        lV.ctx.beginPath();
        for (let a = 0; a < exports.TWO_PI; a += angle) {
            let sx = x + (0, exports.cos)(a - exports.HALF_PI) * r2;
            let sy = y + (0, exports.sin)(a - exports.HALF_PI) * r2;
            lV.ctx.lineTo(sx, sy);
            sx = x + (0, exports.cos)(a - exports.HALF_PI + halfAngle) * r1;
            sy = y + (0, exports.sin)(a - exports.HALF_PI + halfAngle) * r1;
            lV.ctx.lineTo(sx, sy);
        }
        lV.ctx.closePath();
        lV.commitShape();
    }
}
exports.star = star;
function polygon(x, y, r, n = 5) {
    if (!!lV.ctx) {
        let angle = exports.TWO_PI / n;
        lV.ctx.beginPath();
        for (let a = 0; a < exports.TWO_PI; a += angle) {
            let sx = x + (0, exports.cos)(a - exports.HALF_PI) * r;
            let sy = y + (0, exports.sin)(a - exports.HALF_PI) * r;
            lV.ctx.lineTo(sx, sy);
        }
        lV.ctx.closePath();
        lV.commitShape();
    }
}
exports.polygon = polygon;
function polyline(pts, closed = false) {
    if (!!lV.ctx) {
        lV.ctx.beginPath();
        for (let i = 0; i < pts.length; i += 2) {
            lV.ctx.lineTo(pts[i], pts[i + 1]);
        }
        if (closed)
            lV.ctx.closePath();
        lV.commitShape();
    }
}
exports.polyline = polyline;
function spline(pts, tension = 0.5, closed = false) {
    if (!!lV.ctx) {
        save();
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
            lV.ctx.beginPath();
            lV.ctx.moveTo(pts[0], pts[1]);
            lV.ctx.quadraticCurveTo(cp[0], cp[1], pts[2], pts[3]);
            lV.ctx.stroke();
            lV.ctx.closePath();
            lV.ctx.beginPath();
            lV.ctx.moveTo(pts[n - 2], pts[n - 1]);
            lV.ctx.quadraticCurveTo(cp[2 * n - 10], cp[2 * n - 9], pts[n - 4], pts[n - 3]);
            lV.ctx.stroke();
            lV.ctx.closePath();
        }
        restore();
    }
}
exports.spline = spline;
function plotPath(pts, cp, i) {
    if (!!lV.ctx) {
        lV.ctx.beginPath();
        lV.ctx.moveTo(pts[i], pts[i + 1]);
        lV.ctx.bezierCurveTo(cp[2 * i - 2], cp[2 * i - 1], cp[2 * i], cp[2 * i + 1], pts[i + 2], pts[i + 3]);
        lV.ctx.stroke();
        lV.ctx.closePath();
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
    if (!!lV.ctx) {
        lV.ctx.beginPath();
        lV.ctx.moveTo(x1, y1);
        lV.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y2);
        lV.ctx.stroke();
    }
}
exports.bezier = bezier;
/* Custom Paths */
function beginPath(x, y) {
    if (!!lV.ctx) {
        lV.ctx.beginPath();
        lV.ctx.moveTo(x, y);
    }
}
exports.beginPath = beginPath;
function endPath() {
    lV.commitShape();
}
exports.endPath = endPath;
function closeShape() {
    if (!!lV.ctx) {
        lV.ctx.closePath();
        lV.commitShape();
    }
}
exports.closeShape = closeShape;
function moveTo(x, y) {
    if (!!lV.ctx)
        lV.ctx.moveTo(x, y);
}
exports.moveTo = moveTo;
function lineTo(x, y) {
    if (!!lV.ctx)
        lV.ctx.lineTo(x, y);
}
exports.lineTo = lineTo;
function bezierTo(cp1x, cp1y, cp2x, cp2y, x, y) {
    if (!!lV.ctx)
        lV.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
}
exports.bezierTo = bezierTo;
function quadraticTo(cpx, cpy, x, y) {
    if (!!lV.ctx)
        lV.ctx.quadraticCurveTo(cpx, cpy, x, y);
}
exports.quadraticTo = quadraticTo;
/* colors */
exports.light = '#EDE5DD';
exports.dark = '#26201C';
exports.yellow = '#ECDC21';
exports.orange = '#E09423';
exports.green = '#53C352';
exports.red = '#E0533D';
exports.blue = '#4DAFEA';
exports.magenta = '#B34DFF';
function color2rgba(v, alpha = 1) {
    let r;
    let g;
    let b;
    let a;
    switch (typeof v) {
        case "object":
            if (Array.isArray(v) && v.length === 3) {
                r = constrain(v[0], 0, 255);
                g = constrain(v[1], 0, 255);
                b = constrain(v[2], 0, 255);
                a = constrain(alpha, 0, 1);
            }
            else {
                r = g = b = 0;
                a = 1;
            }
            break;
        case "number":
            r = g = b = constrain(v, 0, 255);
            a = constrain(alpha, 0, 1);
            break;
        case "string":
            let rgb = str2rgb(v);
            r = rgb.r;
            g = rgb.g;
            b = rgb.b;
            a = constrain(alpha, 0, 1);
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
        rgb.r = int(col.slice(1, 3), 16);
        rgb.g = int(col.slice(3, 5), 16);
        rgb.b = int(col.slice(5), 16);
    }
    return rgb;
}
function blend(color1, color2, proportion) {
    let c1 = (color1.indexOf('#') === 0) ? color1 : '#' + color1;
    let c2 = (color2.indexOf('#') === 0) ? color2 : '#' + color2;
    let rgx = /^#+([a-fA-F\d]{6}|[a-fA-F\d]{3})$/;
    if (rgx.test(c1) && rgx.test(c2)) {
        let col1 = (c1.length === 7) ? c1.slice(1) : c1;
        let col2 = (c2.length === 7) ? c2.slice(1) : c2;
        let r1 = int(col1.slice(0, 2), 16);
        let r2 = int(col2.slice(0, 2), 16);
        let r = round((1 - proportion) * r1 + proportion * r2);
        let g1 = int(col1.slice(2, 4), 16);
        let g2 = int(col2.slice(2, 4), 16);
        let g = round((1 - proportion) * g1 + proportion * g2);
        let b1 = int(col1.slice(4), 16);
        let b2 = int(col2.slice(4), 16);
        let b = round((1 - proportion) * b1 + proportion * b2);
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
    let r = hexStr(randomInt(0, 255));
    let g = hexStr(randomInt(0, 255));
    let b = hexStr(randomInt(0, 255));
    return '#' + r + g + b;
}
exports.randomColor = randomColor;
function linearGradient(x0, y0, x1, y1) {
    if (!!lV.ctx) {
        return lV.ctx.createLinearGradient(x0, y0, x1, y1);
    }
    else {
        return new CanvasGradient;
    }
}
exports.linearGradient = linearGradient;
/* Assets */
var ImgOrigin;
(function (ImgOrigin) {
    ImgOrigin[ImgOrigin["lb"] = 0] = "lb";
    ImgOrigin[ImgOrigin["rb"] = 1] = "rb";
    ImgOrigin[ImgOrigin["cb"] = 2] = "cb";
    ImgOrigin[ImgOrigin["lt"] = 3] = "lt";
    ImgOrigin[ImgOrigin["rt"] = 4] = "rt";
    ImgOrigin[ImgOrigin["ct"] = 5] = "ct";
    ImgOrigin[ImgOrigin["lc"] = 6] = "lc";
    ImgOrigin[ImgOrigin["rc"] = 7] = "rc";
    ImgOrigin[ImgOrigin["cc"] = 8] = "cc";
})(ImgOrigin = exports.ImgOrigin || (exports.ImgOrigin = {}));
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
    if (!!lV.ctx) {
        switch (origin) {
            case ImgOrigin.lb:
                lV.ctx.drawImage(img, _x, _y, _w, -_h);
                break;
            case ImgOrigin.rb:
                lV.ctx.drawImage(img, _x - _w, _y, _w, -_h);
                break;
            case ImgOrigin.cb:
                lV.ctx.drawImage(img, _x - _w / 2, _y, _w, -_h);
                break;
            case ImgOrigin.lt:
                lV.ctx.drawImage(img, _x, _y, _w, _h);
                break;
            case ImgOrigin.rt:
                lV.ctx.drawImage(img, _x - _w, _y, _w, _h);
                break;
            case ImgOrigin.ct:
                lV.ctx.drawImage(img, _x - _w / 2, _y, _w, _h);
                break;
            case ImgOrigin.lc:
                lV.ctx.drawImage(img, _x, _y + _h / 2, _w, -_h);
                break;
            case ImgOrigin.rc:
                lV.ctx.drawImage(img, _x - _w, _y + _h / 2, _w, -_h);
                break;
            case ImgOrigin.cc:
                lV.ctx.drawImage(img, _x - _w / 2, _y + _h / 2, _w, -_h);
                break;
        }
    }
}
exports.placeImage = placeImage;
function canvas() {
    if (!!lV.canvas) {
        return lV.canvas;
    }
}
exports.canvas = canvas;
//---------------------------------------------------//
/* TYPOGRAPHY */
//---------------------------------------------------//
function text(text, x, y) {
    let lines = text.split('\n');
    let lineY = y;
    if (!!lV.ctx) {
        for (let i = 0; i < lines.length; i++) {
            lV.ctx.fillText(lines[i], x, lineY);
            lineY += lV.fontSize * lV.lineHeight;
        }
    }
}
exports.text = text;
function textSize(size) {
    if (size != undefined) {
        lV.fontSize = size;
        if (!!lV.ctx) {
            setFont();
        }
    }
    else {
        return lV.fontSize;
    }
}
exports.textSize = textSize;
function textWidth(text) {
    if (!!lV.ctx) {
        return lV.ctx.measureText(text).width;
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
    if (!!lV.ctx) {
        for (let i = 0; i < lines.length; i++) {
            wSize = max([wSize, lV.ctx.measureText(lines[i]).width]);
            hSize += lV.fontSize * lV.lineHeight;
        }
    }
    hSize = hSize - (lV.fontSize * lV.lineHeight - lV.fontSize);
    return {
        w: wSize,
        h: hSize
    };
}
exports.textDim = textDim;
var TextAlign;
(function (TextAlign) {
    TextAlign[TextAlign["left"] = 0] = "left";
    TextAlign[TextAlign["right"] = 1] = "right";
    TextAlign[TextAlign["center"] = 2] = "center";
    TextAlign[TextAlign["start"] = 3] = "start";
    TextAlign[TextAlign["end"] = 4] = "end";
})(TextAlign = exports.TextAlign || (exports.TextAlign = {}));
var TextBaseline;
(function (TextBaseline) {
    TextBaseline[TextBaseline["top"] = 0] = "top";
    TextBaseline[TextBaseline["hanging"] = 1] = "hanging";
    TextBaseline[TextBaseline["middle"] = 2] = "middle";
    TextBaseline[TextBaseline["alphabetic"] = 3] = "alphabetic";
    TextBaseline[TextBaseline["ideographic"] = 4] = "ideographic";
    TextBaseline[TextBaseline["bottom"] = 5] = "bottom";
})(TextBaseline = exports.TextBaseline || (exports.TextBaseline = {}));
function textPlacement(h, v) {
    if (!!lV.ctx) {
        const optionsH = ['left', 'right', 'center', 'start', 'end'];
        const optionsV = ['top', 'hanging', 'middle', 'alphabetic', 'ideographic', 'bottom'];
        lV.ctx.textAlign = optionsH[h];
        if (v != undefined)
            lV.ctx.textBaseline = optionsV[v];
    }
}
exports.textPlacement = textPlacement;
function setFont() {
    if (!!lV.ctx) {
        lV.ctx.font = `${lV.fontStyle} ${lV.fontWeight} ${lV.fontSize}px ${lV.fontFamily}`;
    }
}
function fontStyle(style) {
    if (style) {
        lV.fontStyle = style;
        if (!!lV.ctx) {
            setFont();
        }
    }
    else {
        return lV.fontStyle;
    }
}
exports.fontStyle = fontStyle;
function fontWeight(weight) {
    if (weight) {
        lV.fontWeight = weight;
        if (!!lV.ctx) {
            setFont();
        }
    }
    else {
        return lV.fontWeight;
    }
}
exports.fontWeight = fontWeight;
function fontFamily(family) {
    if (family) {
        lV.fontFamily = family;
        if (!!lV.ctx) {
            setFont();
        }
    }
    else {
        return lV.fontFamily;
    }
}
exports.fontFamily = fontFamily;
function lineHeight(height) {
    if (height != undefined) {
        lV.lineHeight = height;
    }
    else {
        return lV.lineHeight;
    }
}
exports.lineHeight = lineHeight;
function textOnArc(text, x, y, r, startAngle, align = TextAlign.center, outside = true, inward = true, kerning = 0) {
    if (!!lV.ctx) {
        let clockwise = (align === TextAlign.left) ? 1 : -1; // draw clockwise if right. Else counterclockwise
        if (!outside)
            r -= lV.fontSize;
        if (((align === TextAlign.center || align === TextAlign.right) && inward) ||
            (align === TextAlign.left && !inward))
            text = text.split('').reverse().join('');
        save();
        lV.ctx.translate(x, y);
        let _startAngle = startAngle;
        startAngle += exports.HALF_PI;
        if (!inward)
            startAngle += exports.PI;
        lV.ctx.textBaseline = 'middle';
        lV.ctx.textAlign = 'center';
        if (align === TextAlign.center) {
            for (let i = 0; i < text.length; i++) {
                let charWidth = lV.ctx.measureText(text[i]).width;
                startAngle += ((charWidth + (i === text.length - 1 ? 0 : kerning)) /
                    (r - lV.fontSize)) / 2 * -clockwise;
            }
        }
        let tempAngle = 0;
        lV.ctx.rotate(startAngle);
        for (let i = 0; i < text.length; i++) {
            let charWidth = lV.ctx.measureText(text[i]).width;
            lV.ctx.rotate((charWidth / 2) / (r - lV.fontSize) * clockwise);
            lV.ctx.fillText(text[i], 0, (inward ? 1 : -1) * (0 - r + lV.fontSize / 2));
            lV.ctx.rotate((charWidth / 2 + kerning) / (r - lV.fontSize) * clockwise);
            tempAngle += ((charWidth / 2) / (r - lV.fontSize) * clockwise) +
                ((charWidth / 2 + kerning) / (r - lV.fontSize) * clockwise);
        }
        restore();
        return _startAngle + tempAngle;
    }
    else {
        return 0;
    }
}
exports.textOnArc = textOnArc;
function number2str(x, radix = 10) {
    return x.toString(radix);
}
exports.number2str = number2str;
function thousandSep(x, sep) {
    let s = number2str(x);
    let st = s.split('.');
    let st1 = st[0];
    let st2 = st.length > 1 ? '.' + st[1] : '';
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(st1)) {
        st1 = st1.replace(rgx, '$1' + sep + '$2');
    }
    return st1 + st2;
}
exports.thousandSep = thousandSep;
//---------------------------------------------------//
/* MATH */
//---------------------------------------------------//
exports.E = Math.E, exports.PI = Math.PI, exports.TWO_PI = Math.PI * 2, exports.HALF_PI = Math.PI / 2, exports.PHI = (1 + Math.sqrt(5)) / 2;
exports.sin = Math.sin, exports.cos = Math.cos, exports.tan = Math.tan, exports.asin = Math.asin, exports.acos = Math.acos, exports.atan = Math.atan, exports.atan2 = Math.atan2;
function dist(x1, y1, x2, y2) {
    return (0, exports.sqrt)((0, exports.pow)(x2 - x1, 2) + (0, exports.pow)(y2 - y1, 2));
}
exports.dist = dist;
/* Conversion */
function deg2rad(v) {
    return v * exports.PI / 180;
}
exports.deg2rad = deg2rad;
function int(s, radix = 10) {
    return parseInt(s, radix);
}
exports.int = int;
exports.str = String;
function mm2px(v) {
    return round(lV.dpi * v / 25.4);
}
exports.mm2px = mm2px;
function px2mm(v) {
    return round(v * 25.4 / lV.dpi * 10) / 10;
}
exports.px2mm = px2mm;
function hexStr(v) {
    if (constrain(v, 0, 255).toString(16).length == 1) {
        return 0 + constrain(v, 0, 255).toString(16);
    }
    else {
        return constrain(v, 0, 255).toString(16);
    }
}
exports.hexStr = hexStr;
/* Functions */
function round(x, decimal) {
    if (decimal) {
        let n = 1;
        for (let i = 0; i < decimal; i++) {
            n *= 10;
        }
        return Math.round(x * n) / n;
    }
    else {
        return Math.round(x);
    }
}
exports.round = round;
function round2str(x, decimal) {
    let s = number2str(round(x, decimal));
    let ss = s.split('.');
    let missing0;
    if (ss.length === 2) {
        missing0 = decimal - ss[1].length;
    }
    else {
        s += '.';
        missing0 = decimal;
    }
    for (let i = 0; i < missing0; i++) {
        s += '0';
    }
    return s;
}
exports.round2str = round2str;
exports.floor = Math.floor;
exports.ceil = Math.ceil;
function constrain(v, l1, l2) {
    if (v < Math.min(l1, l2)) {
        return Math.min(l1, l2);
    }
    else if (v > Math.max(l1, l2)) {
        return Math.max(l1, l2);
    }
    else {
        return v;
    }
}
exports.constrain = constrain;
function sq(v) {
    return Math.pow(v, 2);
}
exports.sq = sq;
exports.pow = Math.pow;
exports.sqrt = Math.sqrt;
exports.abs = Math.abs;
function max(numbers) {
    return Math.max(...numbers);
}
exports.max = max;
function min(numbers) {
    return Math.min(...numbers);
}
exports.min = min;
function sum(numbers) {
    return numbers.reduce((a, b) => a + b);
}
exports.sum = sum;
function avg(numbers) {
    return sum(numbers) / numbers.length;
}
exports.avg = avg;
function centile(data, c) {
    let dataCopy = data.concat();
    dataCopy.sort(function (a, b) {
        return a - b;
    });
    let pos = (dataCopy.length + 1) * c / 100;
    let ix = (0, exports.floor)(pos);
    if (ix === 0) {
        return dataCopy[ix];
    }
    else if (ix > dataCopy.length - 1) {
        return dataCopy[dataCopy.length - 1];
    }
    else {
        let rem = pos - ix;
        let diff = dataCopy[ix] - dataCopy[ix - 1];
        return dataCopy[ix - 1] + diff * rem;
    }
}
exports.centile = centile;
function revCentile(data, n) {
    let dataCopy = data.concat();
    dataCopy.sort(function (a, b) {
        return a - b;
    });
    let pos1 = 1;
    let pos2 = dataCopy.length;
    for (let i = 0; i < dataCopy.length; i++) {
        if (dataCopy[i] < n) {
            pos1++;
        }
        else if (dataCopy[i] > n) {
            pos2 = i;
            break;
        }
    }
    return (0, exports.floor)(avg([pos1, pos2])) / dataCopy.length * 100;
}
exports.revCentile = revCentile;
function iqr(data) {
    return centile(data, 75) - centile(data, 25);
}
exports.iqr = iqr;
function dataRange(data) {
    return max(data) - min(data);
}
exports.dataRange = dataRange;
var SDevMethod;
(function (SDevMethod) {
    SDevMethod[SDevMethod["sample"] = 0] = "sample";
    SDevMethod[SDevMethod["population"] = 1] = "population";
})(SDevMethod = exports.SDevMethod || (exports.SDevMethod = {}));
function stdDev(data, method = SDevMethod.sample) {
    let avgX = avg(data);
    let s = 0;
    for (let i = 0; i < data.length; i++) {
        s += (0, exports.pow)(data[i] - avgX, 2);
    }
    let divider = data.length - 1;
    if (method === SDevMethod.population) {
        divider = data.length;
    }
    return (0, exports.sqrt)(s / divider);
}
exports.stdDev = stdDev;
class Vector {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }
    set(x, y) {
        this._x = x;
        this._y = y;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    set x(v) {
        this._x = v;
    }
    set y(v) {
        this._y = v;
    }
    copy() {
        return new Vector(this._x, this._y);
    }
    add(v) {
        return new Vector(this._x + v.x, this._y + v.y);
    }
    addInPlace(v) {
        this._x += v.x;
        this._y += v.y;
    }
    sub(v) {
        return new Vector(this._x - v.x, this._y - v.y);
    }
    subInPlace(v) {
        this._x -= v.x;
        this._y -= v.y;
    }
    mult(s) {
        return new Vector(this._x * s, this._y * s);
    }
    multInPlace(s) {
        this._x *= s;
        this._y *= s;
    }
    div(s) {
        return new Vector(this._x / s, this._y / s);
    }
    divInPlace(s) {
        this._x /= s;
        this._y /= s;
    }
    dot(v) {
        return this._x * v.x + this._y * v.y;
    }
    norm() {
        let e1 = this._x / (Math.sqrt(this._x * this._x + this.y * this.y));
        let e2 = this._y / (Math.sqrt(this._x * this._x + this._y * this._y));
        return new Vector(e1, e2);
    }
    normInPlace() {
        let e1 = this._x / (Math.sqrt(this._x * this._x + this._y * this._y));
        let e2 = this._y / (Math.sqrt(this._x * this._x + this._y * this._y));
        this._x = e1;
        this._y = e2;
    }
    get direction() {
        return Math.atan2(this._y, this._x);
    }
    set direction(angle) {
        let magnitude = this.magnitude;
        this._x = Math.cos(angle) * magnitude;
        this._y = Math.sin(angle) * magnitude;
    }
    get magnitude() {
        return Math.sqrt(this._x * this._x + this._y * this._y);
    }
    set magnitude(magnitude) {
        let direction = this.direction;
        this._x = Math.cos(direction) * magnitude;
        this._y = Math.sin(direction) * magnitude;
    }
    limit(limitScalar) {
        if (this.magnitude > limitScalar) {
            let direction = this.direction;
            this._x = Math.cos(direction) * limitScalar;
            this._y = Math.sin(direction) * limitScalar;
        }
    }
}
exports.Vector = Vector;
/* Numbers */
class Noise {
    constructor(min, max, noiseRange) {
        this._min = min;
        this._max = max;
        this._range = noiseRange * (max - min);
        this._value = Math.random() * (max - min) + min;
    }
    set min(value) {
        if (this._value < value) {
            this._value = value;
        }
        this._min = value;
    }
    set max(value) {
        if (this._value > value) {
            this._value = value;
        }
        this._max = value;
    }
    set noiseRange(value) {
        if (value > 0 && value < 1) {
            this._range = value * (this._max - this._min);
        }
    }
    get value() {
        this.nextValue();
        return this._value;
    }
    set value(value) {
        if (value >= this._min && value <= this._max) {
            this._value = value;
        }
    }
    get intValue() {
        this.nextValue();
        return round(this._value);
    }
    nextValue() {
        let min0, max0;
        min0 = this._value - this._range / 2;
        max0 = this._value + this._range / 2;
        if (min0 < this._min) {
            min0 = this._min;
            max0 = min0 + this._range;
        }
        else if (max0 > this._max) {
            max0 = this._max;
            min0 = max0 - this._range;
        }
        this._value = Math.random() * (max0 - min0) + min0;
    }
}
exports.Noise = Noise;
function randomInt(a, b) {
    return Math.floor(Math.random() * (Math.max(a, b) - Math.min(a, b) + 1)) + Math.min(a, b);
}
exports.randomInt = randomInt;
function choose(items) {
    return items[randomInt(0, items.length - 1)];
}
exports.choose = choose;
function random(...args) {
    if (args.length === 2 && typeof args[0] === 'number' && typeof args[1] === 'number') {
        let e1 = Math.max(args[0], args[1]) - Math.min(args[0], args[1]);
        let e2 = Math.min(args[0], args[1]);
        return Math.random() * e1 + e2;
    }
    else {
        return Math.random();
    }
}
exports.random = random;
function shuffle(items) {
    let j, x;
    for (let i = items.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = items[i];
        items[i] = items[j];
        items[j] = x;
    }
}
exports.shuffle = shuffle;
function unique(items) {
    return items.filter((value, index, self) => {
        return self.indexOf(value) === index;
    }).sort();
}
exports.unique = unique;
function fibonacci(n) {
    let result = [1, 1];
    if (n < 1) {
        return [];
    }
    else if (n === 1) {
        return [1];
    }
    else if (n === 2) {
        return [1, 1];
    }
    else {
        for (let i = 0; i < n - 2; i++) {
            result.push(result[i] + result[i + 1]);
        }
        return result;
    }
}
exports.fibonacci = fibonacci;
/* Scales */
class LinearScale {
    constructor(inMin, inMax, outMin, outMax) {
        this.input = [inMin, inMax];
        this.output = [outMin, outMax];
        this.conv = this.setFunction();
    }
    setFunction() {
        return (v) => {
            let domain;
            if (this.input[0] != this.input[1]) {
                domain = (v - this.input[0]) / (this.input[1] - this.input[0]);
            }
            else {
                domain = 0.5;
            }
            let range = this.output[1] - this.output[0];
            return domain * range + this.output[0];
        };
    }
    set inRange(range) {
        this.input = range;
        this.conv = this.setFunction();
    }
    get inRange() {
        return this.input;
    }
    set outRange(range) {
        this.output = range;
        this.conv = this.setFunction();
    }
    get outRange() {
        return this.output;
    }
}
exports.LinearScale = LinearScale;
function linearScale(dataMin, dataMax, resultMin, resultMax) {
    return (v) => {
        let domain;
        if (dataMin != dataMax) {
            domain = (v - dataMin) / (dataMax - dataMin);
        }
        else {
            domain = 0.5;
        }
        let range = resultMax - resultMin;
        return domain * range + resultMin;
    };
}
exports.linearScale = linearScale;
function ordinalScale(d, padding, resultMin, resultMax) {
    let result = [];
    let scale;
    if (d.length > 1) {
        scale = linearScale(0, d.length - 1, resultMin + padding, resultMax - padding);
    }
    else {
        scale = () => {
            return (resultMax - resultMin) / 2;
        };
    }
    for (let i = 0; i < d.length; i++) {
        result.push(round(scale(i)));
    }
    return (idx) => {
        let values = result;
        if (idx >= values.length) {
            return values[values.length - 1];
        }
        else {
            return values[idx];
        }
    };
}
exports.ordinalScale = ordinalScale;
//---------------------------------------------------//
/* Control */
//---------------------------------------------------//
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
// Preloader
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
let preloader = new Preloader();
function addAsset(asset) {
    assetList.push(asset);
}
exports.addAsset = addAsset;

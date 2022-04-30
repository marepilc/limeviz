'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.int = exports.deg2rad = exports.dist = exports.atan2 = exports.atan = exports.acos = exports.asin = exports.tan = exports.cos = exports.sin = exports.PHI = exports.HALF_PI = exports.TWO_PI = exports.PI = exports.E = exports.thousandSep = exports.number2str = exports.textOnArc = exports.lineHeight = exports.fontFamily = exports.fontWeight = exports.fontStyle = exports.textPlacement = exports.TextBaseline = exports.TextAlign = exports.textDim = exports.textWidth = exports.textSize = exports.text = exports.canvas = exports.placeImage = exports.ImgOrigin = exports.staticDrawing = exports.restore = exports.save = exports.scale = exports.rotate = exports.translate = exports.resizeCanvas = exports.selectCanvas = exports.createCanvas = exports.lvStart = exports.cursor = exports.lV = exports.assets = exports.animation = exports.mouse = exports.keyboard = exports.height = exports.width = void 0;
exports.hexStr = exports.px2mm = exports.mm2px = exports.str = void 0;
const assets_1 = require("./assets");
const math_1 = require("./math");
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
        this._x = (0, math_1.abs)((0, math_1.round)((e.clientX - bbox.left) * (exports.width / bbox.width)));
        this._y = (0, math_1.abs)((0, math_1.round)((e.clientY - bbox.top) * (exports.height / bbox.height)));
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
            let seg = (0, math_1.floor)((timestamp - this._time) / this._delay);
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
function cursor(display) {
    if (!!exports.lV.canvas)
        exports.lV.canvas.style.cursor = display;
}
exports.cursor = cursor;
function setContextDefault() {
    if (!!exports.lV.canvas) {
        exports.lV.ctx = exports.lV.canvas.getContext('2d');
        exports.height = exports.lV.canvas.height;
        exports.width = exports.lV.canvas.width;
        if (!!exports.lV.ctx) {
            exports.lV.ctx.fillStyle = exports.lV.currentFill;
            exports.lV.ctx.strokeStyle = exports.lV.currentStroke;
            setFont();
        }
    }
}
function lvStart(setup, draw, events, loadAssets) {
    exports.assets = {};
    if (loadAssets != undefined)
        loadAssets();
    if (assets_1.assetList.length > 0) {
        assets_1.preloader.on('complete', onCompletePreloader); // on complete listener
        assets_1.preloader.load(assets_1.assetList); // launch the loading process
    }
    else {
        lVrun(setup, draw, events);
    }
    function onCompletePreloader() {
        for (let a of assets_1.assetList) {
            exports.assets[a.id] = assets_1.preloader.getResult(a.id);
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
        exports.mouse = new Mouse(exports.lV.canvas);
    if (events != undefined)
        events();
    if (exports.lV.noLoop) {
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
    if (exports.lV == undefined)
        exports.lV = new LV(cnv);
    target.appendChild(exports.lV.canvas);
    setContextDefault();
}
exports.createCanvas = createCanvas;
function selectCanvas(id) {
    let cnv = document.getElementById(id);
    if (exports.keyboard == undefined)
        exports.keyboard = new Keyboard(cnv);
    if (exports.lV == undefined)
        exports.lV = new LV(cnv);
    setContextDefault();
}
exports.selectCanvas = selectCanvas;
function resizeCanvas(w, h, canvas = exports.lV.canvas) {
    canvas.setAttribute('width', (0, exports.str)(w));
    canvas.setAttribute('height', (0, exports.str)(h));
    setContextDefault();
}
exports.resizeCanvas = resizeCanvas;
/* transformation */
function translate(x, y) {
    if (!!exports.lV.ctx)
        exports.lV.ctx.translate(x, y);
}
exports.translate = translate;
function rotate(angle) {
    if (!!exports.lV.ctx)
        exports.lV.ctx.rotate(angle);
}
exports.rotate = rotate;
function scale(x, y) {
    if (!!exports.lV.ctx)
        exports.lV.ctx.scale(x, y);
}
exports.scale = scale;
function save() {
    if (!!exports.lV.ctx)
        exports.lV.ctx.save();
}
exports.save = save;
function restore() {
    if (!!exports.lV.ctx)
        exports.lV.ctx.restore();
}
exports.restore = restore;
function staticDrawing() {
    exports.lV.noLoop = true;
}
exports.staticDrawing = staticDrawing;
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
    if (!!exports.lV.ctx) {
        switch (origin) {
            case ImgOrigin.lb:
                exports.lV.ctx.drawImage(img, _x, _y, _w, -_h);
                break;
            case ImgOrigin.rb:
                exports.lV.ctx.drawImage(img, _x - _w, _y, _w, -_h);
                break;
            case ImgOrigin.cb:
                exports.lV.ctx.drawImage(img, _x - _w / 2, _y, _w, -_h);
                break;
            case ImgOrigin.lt:
                exports.lV.ctx.drawImage(img, _x, _y, _w, _h);
                break;
            case ImgOrigin.rt:
                exports.lV.ctx.drawImage(img, _x - _w, _y, _w, _h);
                break;
            case ImgOrigin.ct:
                exports.lV.ctx.drawImage(img, _x - _w / 2, _y, _w, _h);
                break;
            case ImgOrigin.lc:
                exports.lV.ctx.drawImage(img, _x, _y + _h / 2, _w, -_h);
                break;
            case ImgOrigin.rc:
                exports.lV.ctx.drawImage(img, _x - _w, _y + _h / 2, _w, -_h);
                break;
            case ImgOrigin.cc:
                exports.lV.ctx.drawImage(img, _x - _w / 2, _y + _h / 2, _w, -_h);
                break;
        }
    }
}
exports.placeImage = placeImage;
function canvas() {
    if (!!exports.lV.canvas) {
        return exports.lV.canvas;
    }
}
exports.canvas = canvas;
//---------------------------------------------------//
/* TYPOGRAPHY */
//---------------------------------------------------//
function text(text, x, y) {
    let lines = text.split('\n');
    let lineY = y;
    if (!!exports.lV.ctx) {
        for (let i = 0; i < lines.length; i++) {
            exports.lV.ctx.fillText(lines[i], x, lineY);
            lineY += exports.lV.fontSize * exports.lV.lineHeight;
        }
    }
}
exports.text = text;
function textSize(size) {
    if (size != undefined) {
        exports.lV.fontSize = size;
        if (!!exports.lV.ctx) {
            setFont();
        }
    }
    else {
        return exports.lV.fontSize;
    }
}
exports.textSize = textSize;
function textWidth(text) {
    if (!!exports.lV.ctx) {
        return exports.lV.ctx.measureText(text).width;
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
    if (!!exports.lV.ctx) {
        for (let i = 0; i < lines.length; i++) {
            wSize = (0, math_1.max)([wSize, exports.lV.ctx.measureText(lines[i]).width]);
            hSize += exports.lV.fontSize * exports.lV.lineHeight;
        }
    }
    hSize = hSize - (exports.lV.fontSize * exports.lV.lineHeight - exports.lV.fontSize);
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
    if (!!exports.lV.ctx) {
        const optionsH = ['left', 'right', 'center', 'start', 'end'];
        const optionsV = ['top', 'hanging', 'middle', 'alphabetic', 'ideographic', 'bottom'];
        exports.lV.ctx.textAlign = optionsH[h];
        if (v != undefined)
            exports.lV.ctx.textBaseline = optionsV[v];
    }
}
exports.textPlacement = textPlacement;
function setFont() {
    if (!!exports.lV.ctx) {
        exports.lV.ctx.font = `${exports.lV.fontStyle} ${exports.lV.fontWeight} ${exports.lV.fontSize}px ${exports.lV.fontFamily}`;
    }
}
function fontStyle(style) {
    if (style) {
        exports.lV.fontStyle = style;
        if (!!exports.lV.ctx) {
            setFont();
        }
    }
    else {
        return exports.lV.fontStyle;
    }
}
exports.fontStyle = fontStyle;
function fontWeight(weight) {
    if (weight) {
        exports.lV.fontWeight = weight;
        if (!!exports.lV.ctx) {
            setFont();
        }
    }
    else {
        return exports.lV.fontWeight;
    }
}
exports.fontWeight = fontWeight;
function fontFamily(family) {
    if (family) {
        exports.lV.fontFamily = family;
        if (!!exports.lV.ctx) {
            setFont();
        }
    }
    else {
        return exports.lV.fontFamily;
    }
}
exports.fontFamily = fontFamily;
function lineHeight(height) {
    if (height != undefined) {
        exports.lV.lineHeight = height;
    }
    else {
        return exports.lV.lineHeight;
    }
}
exports.lineHeight = lineHeight;
function textOnArc(text, x, y, r, startAngle, align = TextAlign.center, outside = true, inward = true, kerning = 0) {
    if (!!exports.lV.ctx) {
        let clockwise = (align === TextAlign.left) ? 1 : -1; // draw clockwise if right. Else counterclockwise
        if (!outside)
            r -= exports.lV.fontSize;
        if (((align === TextAlign.center || align === TextAlign.right) && inward) ||
            (align === TextAlign.left && !inward))
            text = text.split('').reverse().join('');
        save();
        exports.lV.ctx.translate(x, y);
        let _startAngle = startAngle;
        startAngle += exports.HALF_PI;
        if (!inward)
            startAngle += exports.PI;
        exports.lV.ctx.textBaseline = 'middle';
        exports.lV.ctx.textAlign = 'center';
        if (align === TextAlign.center) {
            for (let i = 0; i < text.length; i++) {
                let charWidth = exports.lV.ctx.measureText(text[i]).width;
                startAngle += ((charWidth + (i === text.length - 1 ? 0 : kerning)) /
                    (r - exports.lV.fontSize)) / 2 * -clockwise;
            }
        }
        let tempAngle = 0;
        exports.lV.ctx.rotate(startAngle);
        for (let i = 0; i < text.length; i++) {
            let charWidth = exports.lV.ctx.measureText(text[i]).width;
            exports.lV.ctx.rotate((charWidth / 2) / (r - exports.lV.fontSize) * clockwise);
            exports.lV.ctx.fillText(text[i], 0, (inward ? 1 : -1) * (0 - r + exports.lV.fontSize / 2));
            exports.lV.ctx.rotate((charWidth / 2 + kerning) / (r - exports.lV.fontSize) * clockwise);
            tempAngle += ((charWidth / 2) / (r - exports.lV.fontSize) * clockwise) +
                ((charWidth / 2 + kerning) / (r - exports.lV.fontSize) * clockwise);
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
    return (0, math_1.sqrt)((0, math_1.pow)(x2 - x1, 2) + (0, math_1.pow)(y2 - y1, 2));
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
    return (0, math_1.round)(exports.lV.dpi * v / 25.4);
}
exports.mm2px = mm2px;
function px2mm(v) {
    return (0, math_1.round)(v * 25.4 / exports.lV.dpi * 10) / 10;
}
exports.px2mm = px2mm;
function hexStr(v) {
    if ((0, math_1.constrain)(v, 0, 255).toString(16).length == 1) {
        return 0 + (0, math_1.constrain)(v, 0, 255).toString(16);
    }
    else {
        return (0, math_1.constrain)(v, 0, 255).toString(16);
    }
}
exports.hexStr = hexStr;

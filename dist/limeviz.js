'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.canvas = exports.staticDrawing = exports.restore = exports.save = exports.scale = exports.rotate = exports.translate = exports.resizeCanvas = exports.selectCanvas = exports.createCanvas = exports.lvStart = exports.scaleModifier = exports.cursor = exports.lV = exports.assets = exports.animation = exports.mouse = exports.keyboard = exports.height = exports.width = void 0;
const assets_1 = require("./assets");
const math_1 = require("./math");
const typography_1 = require("./typography");
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
        this._pos = new math_1.Vector(0, 0);
        this._ppos = new math_1.Vector(0, 0);
        this.isPressed = false;
        this.button = null;
        this.wheel = null;
        this.down = null;
        this.up = null;
        this.click = null;
        this.dblClick = null;
        this.move = null;
        this.enter = null;
        this.leave = null;
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
        this._canvas.addEventListener('mousedown', (e) => {
            this.isPressed = true;
            this.button = e.button;
            if (this.down != null) {
                this.down(e);
            }
        }, false);
        this._canvas.addEventListener('mouseup', (e) => {
            this.isPressed = false;
            this.button = null;
            if (this.up != null) {
                this.up(e);
            }
        }, false);
        this._canvas.addEventListener('click', (e) => {
            if (this.click != null) {
                this.click(e);
            }
        }, false);
        this._canvas.addEventListener('dblclick', (e) => {
            if (this.dblClick != null) {
                this.dblClick(e);
            }
        }, false);
        this._canvas.addEventListener('mouseenter', () => {
            if (typeof this.enter === 'function')
                this.enter();
        });
        this._canvas.addEventListener('mouseleave', () => {
            if (typeof this.leave === 'function')
                this.leave();
        });
    }
    _updateMousePos(canvas, e) {
        this._px = this._x;
        this._py = this._y;
        this._ppos.set(this._px, this._py);
        let bbox = canvas.getBoundingClientRect();
        this._x = (0, math_1.abs)((0, math_1.round)(e.clientX - bbox.left));
        this._y = (0, math_1.abs)((0, math_1.round)(e.clientY - bbox.top));
        this._pos.set(this._x, this._y);
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
    get pos() {
        return this._pos;
    }
    get ppos() {
        return this._ppos;
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
        this.currentFill = '#65a30d';
        this.currentStroke = '#44403c';
        this.fontStyle = 'normal';
        this.fontWeight = 'normal';
        this.fontSize = 24;
        this.fontUnit = 'px';
        this.fontFamily = 'sans-serif';
        this.lineHeight = 1.1;
        this.scaleCoefficient = 1;
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
function scaleModifier(v) {
    if (!!exports.lV) {
        exports.lV.scaleCoefficient = v;
    }
}
exports.scaleModifier = scaleModifier;
function setContextDefault() {
    if (!!exports.lV.canvas) {
        exports.lV.ctx = exports.lV.canvas.getContext('2d');
        let pxRatio = window.devicePixelRatio || 1;
        pxRatio *= exports.lV.scaleCoefficient;
        exports.lV.canvas.width = exports.lV.canvas.clientWidth * pxRatio || 300;
        exports.lV.canvas.height = exports.lV.canvas.clientHeight * pxRatio || 150;
        exports.width = exports.lV.canvas.clientWidth || 300;
        exports.height = exports.lV.canvas.clientHeight || 150;
        if (!!exports.lV.ctx) {
            exports.lV.ctx.scale(pxRatio, pxRatio);
            exports.lV.ctx.fillStyle = exports.lV.currentFill;
            exports.lV.ctx.strokeStyle = exports.lV.currentStroke;
            (0, typography_1.setFont)();
        }
    }
}
function lvStart(setup, draw, events, loadAssets) {
    exports.assets = {};
    if (typeof loadAssets == 'function')
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
            if (draw != undefined)
                draw();
            if (exports.lV.noLoop)
                exports.animation.stop();
        });
    }
    if (typeof setup == 'function')
        setup();
    if (exports.mouse == undefined)
        exports.mouse = new Mouse(exports.lV.canvas);
    if (typeof events == 'function') {
        events();
    }
    exports.animation.start();
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
    if (exports.keyboard == undefined && !!cnv)
        exports.keyboard = new Keyboard(cnv);
    if (exports.lV == undefined && !!cnv)
        exports.lV = new LV(cnv);
    setContextDefault();
}
exports.selectCanvas = selectCanvas;
function resizeCanvas(w, h, canvas = exports.lV.canvas) {
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
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
function canvas() {
    if (!!exports.lV.canvas) {
        return exports.lV.canvas;
    }
}
exports.canvas = canvas;

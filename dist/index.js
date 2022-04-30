"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.str = exports.int = exports.deg2rad = exports.dist = exports.atan2 = exports.atan = exports.acos = exports.asin = exports.tan = exports.cos = exports.sin = exports.PHI = exports.HALF_PI = exports.TWO_PI = exports.PI = exports.E = exports.thousandSep = exports.number2str = exports.textOnArc = exports.lineHeight = exports.fontFamily = exports.fontWeight = exports.fontStyle = exports.textPlacement = exports.TextBaseline = exports.TextAlign = exports.textDim = exports.textWidth = exports.textSize = exports.text = exports.canvas = exports.placeImage = exports.ImgOrigin = exports.staticDrawing = exports.restore = exports.save = exports.scale = exports.rotate = exports.translate = exports.resizeCanvas = exports.selectCanvas = exports.createCanvas = exports.lvStart = exports.cursor = exports.assets = exports.animation = exports.mouse = exports.keyboard = exports.height = exports.width = void 0;
exports.point = exports.shadow = exports.noFill = exports.fill = exports.solidLine = exports.dashLine = exports.strokeJoin = exports.JoinStyle = exports.strokeCup = exports.StrokeCupStyle = exports.noStroke = exports.strokeWidth = exports.stroke = exports.background = exports.clear = exports.fibonacci = exports.unique = exports.shuffle = exports.random = exports.choose = exports.randomInt = exports.Noise = exports.ordinalScale = exports.linearScale = exports.LinearScale = exports.svg2img = exports.print = exports.Vector = exports.stdDev = exports.dataRange = exports.iqr = exports.revCentile = exports.centile = exports.avg = exports.sum = exports.min = exports.max = exports.abs = exports.sqrt = exports.pow = exports.sq = exports.constrain = exports.ceil = exports.floor = exports.round2str = exports.round = exports.addAsset = exports.hexStr = exports.px2mm = exports.mm2px = void 0;
exports.linearGradient = exports.randomColor = exports.blend = exports.color2rgba = exports.quadraticTo = exports.bezierTo = exports.lineTo = exports.moveTo = exports.closeShape = exports.endPath = exports.beginPath = exports.bezier = exports.spline = exports.polyline = exports.polygon = exports.star = exports.rect = exports.ring = exports.ellipse = exports.circle = exports.arc = exports.line = void 0;
var limeviz_1 = require("./limeviz");
Object.defineProperty(exports, "width", { enumerable: true, get: function () { return limeviz_1.width; } });
Object.defineProperty(exports, "height", { enumerable: true, get: function () { return limeviz_1.height; } });
Object.defineProperty(exports, "keyboard", { enumerable: true, get: function () { return limeviz_1.keyboard; } });
Object.defineProperty(exports, "mouse", { enumerable: true, get: function () { return limeviz_1.mouse; } });
Object.defineProperty(exports, "animation", { enumerable: true, get: function () { return limeviz_1.animation; } });
Object.defineProperty(exports, "assets", { enumerable: true, get: function () { return limeviz_1.assets; } });
Object.defineProperty(exports, "cursor", { enumerable: true, get: function () { return limeviz_1.cursor; } });
Object.defineProperty(exports, "lvStart", { enumerable: true, get: function () { return limeviz_1.lvStart; } });
Object.defineProperty(exports, "createCanvas", { enumerable: true, get: function () { return limeviz_1.createCanvas; } });
Object.defineProperty(exports, "selectCanvas", { enumerable: true, get: function () { return limeviz_1.selectCanvas; } });
Object.defineProperty(exports, "resizeCanvas", { enumerable: true, get: function () { return limeviz_1.resizeCanvas; } });
Object.defineProperty(exports, "translate", { enumerable: true, get: function () { return limeviz_1.translate; } });
Object.defineProperty(exports, "rotate", { enumerable: true, get: function () { return limeviz_1.rotate; } });
Object.defineProperty(exports, "scale", { enumerable: true, get: function () { return limeviz_1.scale; } });
Object.defineProperty(exports, "save", { enumerable: true, get: function () { return limeviz_1.save; } });
Object.defineProperty(exports, "restore", { enumerable: true, get: function () { return limeviz_1.restore; } });
Object.defineProperty(exports, "staticDrawing", { enumerable: true, get: function () { return limeviz_1.staticDrawing; } });
Object.defineProperty(exports, "ImgOrigin", { enumerable: true, get: function () { return limeviz_1.ImgOrigin; } });
Object.defineProperty(exports, "placeImage", { enumerable: true, get: function () { return limeviz_1.placeImage; } });
Object.defineProperty(exports, "canvas", { enumerable: true, get: function () { return limeviz_1.canvas; } });
Object.defineProperty(exports, "text", { enumerable: true, get: function () { return limeviz_1.text; } });
Object.defineProperty(exports, "textSize", { enumerable: true, get: function () { return limeviz_1.textSize; } });
Object.defineProperty(exports, "textWidth", { enumerable: true, get: function () { return limeviz_1.textWidth; } });
Object.defineProperty(exports, "textDim", { enumerable: true, get: function () { return limeviz_1.textDim; } });
Object.defineProperty(exports, "TextAlign", { enumerable: true, get: function () { return limeviz_1.TextAlign; } });
Object.defineProperty(exports, "TextBaseline", { enumerable: true, get: function () { return limeviz_1.TextBaseline; } });
Object.defineProperty(exports, "textPlacement", { enumerable: true, get: function () { return limeviz_1.textPlacement; } });
Object.defineProperty(exports, "fontStyle", { enumerable: true, get: function () { return limeviz_1.fontStyle; } });
Object.defineProperty(exports, "fontWeight", { enumerable: true, get: function () { return limeviz_1.fontWeight; } });
Object.defineProperty(exports, "fontFamily", { enumerable: true, get: function () { return limeviz_1.fontFamily; } });
Object.defineProperty(exports, "lineHeight", { enumerable: true, get: function () { return limeviz_1.lineHeight; } });
Object.defineProperty(exports, "textOnArc", { enumerable: true, get: function () { return limeviz_1.textOnArc; } });
Object.defineProperty(exports, "number2str", { enumerable: true, get: function () { return limeviz_1.number2str; } });
Object.defineProperty(exports, "thousandSep", { enumerable: true, get: function () { return limeviz_1.thousandSep; } });
Object.defineProperty(exports, "E", { enumerable: true, get: function () { return limeviz_1.E; } });
Object.defineProperty(exports, "PI", { enumerable: true, get: function () { return limeviz_1.PI; } });
Object.defineProperty(exports, "TWO_PI", { enumerable: true, get: function () { return limeviz_1.TWO_PI; } });
Object.defineProperty(exports, "HALF_PI", { enumerable: true, get: function () { return limeviz_1.HALF_PI; } });
Object.defineProperty(exports, "PHI", { enumerable: true, get: function () { return limeviz_1.PHI; } });
Object.defineProperty(exports, "sin", { enumerable: true, get: function () { return limeviz_1.sin; } });
Object.defineProperty(exports, "cos", { enumerable: true, get: function () { return limeviz_1.cos; } });
Object.defineProperty(exports, "tan", { enumerable: true, get: function () { return limeviz_1.tan; } });
Object.defineProperty(exports, "asin", { enumerable: true, get: function () { return limeviz_1.asin; } });
Object.defineProperty(exports, "acos", { enumerable: true, get: function () { return limeviz_1.acos; } });
Object.defineProperty(exports, "atan", { enumerable: true, get: function () { return limeviz_1.atan; } });
Object.defineProperty(exports, "atan2", { enumerable: true, get: function () { return limeviz_1.atan2; } });
Object.defineProperty(exports, "dist", { enumerable: true, get: function () { return limeviz_1.dist; } });
Object.defineProperty(exports, "deg2rad", { enumerable: true, get: function () { return limeviz_1.deg2rad; } });
Object.defineProperty(exports, "int", { enumerable: true, get: function () { return limeviz_1.int; } });
Object.defineProperty(exports, "str", { enumerable: true, get: function () { return limeviz_1.str; } });
Object.defineProperty(exports, "mm2px", { enumerable: true, get: function () { return limeviz_1.mm2px; } });
Object.defineProperty(exports, "px2mm", { enumerable: true, get: function () { return limeviz_1.px2mm; } });
Object.defineProperty(exports, "hexStr", { enumerable: true, get: function () { return limeviz_1.hexStr; } });
var assets_1 = require("./assets");
Object.defineProperty(exports, "addAsset", { enumerable: true, get: function () { return assets_1.addAsset; } });
var math_1 = require("./math");
Object.defineProperty(exports, "round", { enumerable: true, get: function () { return math_1.round; } });
Object.defineProperty(exports, "round2str", { enumerable: true, get: function () { return math_1.round2str; } });
Object.defineProperty(exports, "floor", { enumerable: true, get: function () { return math_1.floor; } });
Object.defineProperty(exports, "ceil", { enumerable: true, get: function () { return math_1.ceil; } });
Object.defineProperty(exports, "constrain", { enumerable: true, get: function () { return math_1.constrain; } });
Object.defineProperty(exports, "sq", { enumerable: true, get: function () { return math_1.sq; } });
Object.defineProperty(exports, "pow", { enumerable: true, get: function () { return math_1.pow; } });
Object.defineProperty(exports, "sqrt", { enumerable: true, get: function () { return math_1.sqrt; } });
Object.defineProperty(exports, "abs", { enumerable: true, get: function () { return math_1.abs; } });
Object.defineProperty(exports, "max", { enumerable: true, get: function () { return math_1.max; } });
Object.defineProperty(exports, "min", { enumerable: true, get: function () { return math_1.min; } });
Object.defineProperty(exports, "sum", { enumerable: true, get: function () { return math_1.sum; } });
Object.defineProperty(exports, "avg", { enumerable: true, get: function () { return math_1.avg; } });
Object.defineProperty(exports, "centile", { enumerable: true, get: function () { return math_1.centile; } });
Object.defineProperty(exports, "revCentile", { enumerable: true, get: function () { return math_1.revCentile; } });
Object.defineProperty(exports, "iqr", { enumerable: true, get: function () { return math_1.iqr; } });
Object.defineProperty(exports, "dataRange", { enumerable: true, get: function () { return math_1.dataRange; } });
Object.defineProperty(exports, "stdDev", { enumerable: true, get: function () { return math_1.stdDev; } });
Object.defineProperty(exports, "Vector", { enumerable: true, get: function () { return math_1.Vector; } });
var helpers_1 = require("./helpers");
Object.defineProperty(exports, "print", { enumerable: true, get: function () { return helpers_1.print; } });
Object.defineProperty(exports, "svg2img", { enumerable: true, get: function () { return helpers_1.svg2img; } });
var scales_1 = require("./scales");
Object.defineProperty(exports, "LinearScale", { enumerable: true, get: function () { return scales_1.LinearScale; } });
Object.defineProperty(exports, "linearScale", { enumerable: true, get: function () { return scales_1.linearScale; } });
Object.defineProperty(exports, "ordinalScale", { enumerable: true, get: function () { return scales_1.ordinalScale; } });
var numbers_1 = require("./numbers");
Object.defineProperty(exports, "Noise", { enumerable: true, get: function () { return numbers_1.Noise; } });
Object.defineProperty(exports, "randomInt", { enumerable: true, get: function () { return numbers_1.randomInt; } });
Object.defineProperty(exports, "choose", { enumerable: true, get: function () { return numbers_1.choose; } });
Object.defineProperty(exports, "random", { enumerable: true, get: function () { return numbers_1.random; } });
Object.defineProperty(exports, "shuffle", { enumerable: true, get: function () { return numbers_1.shuffle; } });
Object.defineProperty(exports, "unique", { enumerable: true, get: function () { return numbers_1.unique; } });
Object.defineProperty(exports, "fibonacci", { enumerable: true, get: function () { return numbers_1.fibonacci; } });
var drawing_1 = require("./drawing");
Object.defineProperty(exports, "clear", { enumerable: true, get: function () { return drawing_1.clear; } });
Object.defineProperty(exports, "background", { enumerable: true, get: function () { return drawing_1.background; } });
Object.defineProperty(exports, "stroke", { enumerable: true, get: function () { return drawing_1.stroke; } });
Object.defineProperty(exports, "strokeWidth", { enumerable: true, get: function () { return drawing_1.strokeWidth; } });
Object.defineProperty(exports, "noStroke", { enumerable: true, get: function () { return drawing_1.noStroke; } });
Object.defineProperty(exports, "StrokeCupStyle", { enumerable: true, get: function () { return drawing_1.StrokeCupStyle; } });
Object.defineProperty(exports, "strokeCup", { enumerable: true, get: function () { return drawing_1.strokeCup; } });
Object.defineProperty(exports, "JoinStyle", { enumerable: true, get: function () { return drawing_1.JoinStyle; } });
Object.defineProperty(exports, "strokeJoin", { enumerable: true, get: function () { return drawing_1.strokeJoin; } });
Object.defineProperty(exports, "dashLine", { enumerable: true, get: function () { return drawing_1.dashLine; } });
Object.defineProperty(exports, "solidLine", { enumerable: true, get: function () { return drawing_1.solidLine; } });
Object.defineProperty(exports, "fill", { enumerable: true, get: function () { return drawing_1.fill; } });
Object.defineProperty(exports, "noFill", { enumerable: true, get: function () { return drawing_1.noFill; } });
Object.defineProperty(exports, "shadow", { enumerable: true, get: function () { return drawing_1.shadow; } });
Object.defineProperty(exports, "point", { enumerable: true, get: function () { return drawing_1.point; } });
Object.defineProperty(exports, "line", { enumerable: true, get: function () { return drawing_1.line; } });
Object.defineProperty(exports, "arc", { enumerable: true, get: function () { return drawing_1.arc; } });
Object.defineProperty(exports, "circle", { enumerable: true, get: function () { return drawing_1.circle; } });
Object.defineProperty(exports, "ellipse", { enumerable: true, get: function () { return drawing_1.ellipse; } });
Object.defineProperty(exports, "ring", { enumerable: true, get: function () { return drawing_1.ring; } });
Object.defineProperty(exports, "rect", { enumerable: true, get: function () { return drawing_1.rect; } });
Object.defineProperty(exports, "star", { enumerable: true, get: function () { return drawing_1.star; } });
Object.defineProperty(exports, "polygon", { enumerable: true, get: function () { return drawing_1.polygon; } });
Object.defineProperty(exports, "polyline", { enumerable: true, get: function () { return drawing_1.polyline; } });
Object.defineProperty(exports, "spline", { enumerable: true, get: function () { return drawing_1.spline; } });
Object.defineProperty(exports, "bezier", { enumerable: true, get: function () { return drawing_1.bezier; } });
Object.defineProperty(exports, "beginPath", { enumerable: true, get: function () { return drawing_1.beginPath; } });
Object.defineProperty(exports, "endPath", { enumerable: true, get: function () { return drawing_1.endPath; } });
Object.defineProperty(exports, "closeShape", { enumerable: true, get: function () { return drawing_1.closeShape; } });
Object.defineProperty(exports, "moveTo", { enumerable: true, get: function () { return drawing_1.moveTo; } });
Object.defineProperty(exports, "lineTo", { enumerable: true, get: function () { return drawing_1.lineTo; } });
Object.defineProperty(exports, "bezierTo", { enumerable: true, get: function () { return drawing_1.bezierTo; } });
Object.defineProperty(exports, "quadraticTo", { enumerable: true, get: function () { return drawing_1.quadraticTo; } });
var colors_1 = require("./colors");
Object.defineProperty(exports, "color2rgba", { enumerable: true, get: function () { return colors_1.color2rgba; } });
Object.defineProperty(exports, "blend", { enumerable: true, get: function () { return colors_1.blend; } });
Object.defineProperty(exports, "randomColor", { enumerable: true, get: function () { return colors_1.randomColor; } });
Object.defineProperty(exports, "linearGradient", { enumerable: true, get: function () { return colors_1.linearGradient; } });

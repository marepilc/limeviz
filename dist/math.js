'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.dist = exports.atan2 = exports.atan = exports.acos = exports.asin = exports.tan = exports.cos = exports.sin = exports.PHI = exports.HALF_PI = exports.TWO_PI = exports.PI = exports.E = exports.Vector = exports.stdDev = exports.dataRange = exports.iqr = exports.revCentile = exports.centile = exports.avg = exports.sum = exports.min = exports.max = exports.abs = exports.sqrt = exports.pow = exports.sq = exports.constrain = exports.ceil = exports.floor = exports.round2str = exports.round = void 0;
const helpers_1 = require("./helpers");
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
    let s = (0, helpers_1.number2str)(round(x, decimal));
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
function stdDev(data, method = 'sample') {
    let avgX = avg(data);
    let s = 0;
    for (let i = 0; i < data.length; i++) {
        s += (0, exports.pow)(data[i] - avgX, 2);
    }
    let divider = data.length - 1;
    if (method === 'population') {
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
    add2(v) {
        this._x += v.x;
        this._y += v.y;
    }
    sub(v) {
        return new Vector(this._x - v.x, this._y - v.y);
    }
    sub2(v) {
        this._x -= v.x;
        this._y -= v.y;
    }
    mult(s) {
        return new Vector(this._x * s, this._y * s);
    }
    mult2(s) {
        this._x *= s;
        this._y *= s;
    }
    div(s) {
        return new Vector(this._x / s, this._y / s);
    }
    div2(s) {
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
    norm2() {
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
exports.E = Math.E, exports.PI = Math.PI, exports.TWO_PI = Math.PI * 2, exports.HALF_PI = Math.PI / 2, exports.PHI = (1 + Math.sqrt(5)) / 2;
exports.sin = Math.sin, exports.cos = Math.cos, exports.tan = Math.tan, exports.asin = Math.asin, exports.acos = Math.acos, exports.atan = Math.atan, exports.atan2 = Math.atan2;
function dist(x1, y1, x2, y2) {
    return (0, exports.sqrt)((0, exports.pow)(x2 - x1, 2) + (0, exports.pow)(y2 - y1, 2));
}
exports.dist = dist;

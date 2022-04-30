'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.fibonacci = exports.unique = exports.shuffle = exports.random = exports.choose = exports.randomInt = exports.Noise = void 0;
const math_1 = require("./math");
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
        return (0, math_1.round)(this._value);
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

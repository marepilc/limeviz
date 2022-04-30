'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordinalScale = exports.linearScale = exports.LinearScale = void 0;
const math_1 = require("./math");
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
        result.push((0, math_1.round)(scale(i)));
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

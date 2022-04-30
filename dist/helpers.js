'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.hexStr = exports.px2mm = exports.mm2px = exports.str = exports.int = exports.deg2rad = exports.thousandSep = exports.number2str = void 0;
const math_1 = require("./math");
const limeviz_1 = require("./limeviz");
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
function deg2rad(v) {
    return v * math_1.PI / 180;
}
exports.deg2rad = deg2rad;
function int(s, radix = 10) {
    return parseInt(s, radix);
}
exports.int = int;
exports.str = String;
function mm2px(v) {
    return (0, math_1.round)(limeviz_1.lV.dpi * v / 25.4);
}
exports.mm2px = mm2px;
function px2mm(v) {
    return (0, math_1.round)(v * 25.4 / limeviz_1.lV.dpi * 10) / 10;
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

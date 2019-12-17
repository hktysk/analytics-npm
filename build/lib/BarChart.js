"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var colors_1 = __importDefault(require("colors"));
var square = '█';
function BarChartGenerate(num1, num2, label1, label2, width) {
    var blocks;
    if (num1 > 0 || num2 > 0) {
        var isNum1Large = (num1 > num2);
        var compare = isNum1Large
            ? num2 / num1 * 100 - 100
            : num1 / num2 * 100 - 100;
        compare = Math.round(compare / 10);
        if (compare <= -10)
            compare = 9;
        compare = Math.abs(compare);
        if (num1 === 0 || num2 === 0) {
            compare = 10;
        }
        var base = square.repeat(width);
        blocks = {
            num1: isNum1Large
                ? Array(10).fill(base)
                : Array(10 - compare).fill(base),
            num2: isNum1Large
                ? Array(10 - compare).fill(base)
                : Array(10).fill(base)
        };
    }
    else {
        var base = ' '.repeat(width);
        blocks = {
            num1: Array(10).fill(base),
            num2: Array(10).fill(base)
        };
    }
    var r = [];
    var max = Math.max(blocks.num1.length, blocks.num2.length);
    for (var i = 0; i < max; i++) {
        var num1_1 = i > blocks.num1.length - 1
            ? ' '.repeat(width)
            : blocks.num1[i];
        var num2_1 = i > blocks.num2.length - 1
            ? ' '.repeat(width)
            : blocks.num2[i];
        r.push(num1_1 + "  " + num2_1);
    }
    function padBoth(s, width) {
        var diff = width - s.length;
        if (diff <= 0)
            return s;
        s = ' '.repeat(Math.floor(diff / 2)) + s;
        s = s + ' '.repeat(Math.ceil(diff / 2));
        return s;
    }
    function paintCompare(s) {
        return s.indexOf('-') > -1 ? colors_1.default.magenta(s) : colors_1.default.green(s);
    }
    var resultCompare = {
        num1: num1 > 1
            ? num2 > 0 ? Math.round(num1 / num2 * 100 - 100) : 100
            : 0,
        num2: num2 > 1
            ? num1 > 0 ? Math.round(num2 / num1 * 100 - 100) : 100
            : 0
    };
    var resultCompareString = {
        num1: paintCompare(padBoth("(" + resultCompare.num1 + "%)", width)),
        num2: paintCompare(padBoth("(" + resultCompare.num2 + "%)", width))
    };
    return __spread([
        padBoth("" + num1, width) + "  " + padBoth("" + num2, width)
    ], r.reverse(), [
        padBoth("" + label1, width) + "  " + padBoth("" + label2, width),
        resultCompareString.num1 + "  " + resultCompareString.num2
    ]);
}
exports.default = BarChartGenerate;

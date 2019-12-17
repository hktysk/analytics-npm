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
var padBoth_1 = __importDefault(require("./padBoth"));
var square = '█';
var height = 10;
function BarChartGenerate(props) {
    var _a = props.numberToCompare, latest = _a.latest, old = _a.old, label = props.label, width = props.width;
    var barChart = [];
    /* initialize */
    var barBlock = {
        latest: Array(height).fill(' '.repeat(width)),
        old: Array(height).fill(' '.repeat(width))
    };
    /* Compare */
    if (latest > 0 || old > 0) {
        var isGreaterThenOld = (latest > old);
        var ratio_1 = (isGreaterThenOld ? old / latest : latest / old) * 100 - 100;
        var blockCount = Math.round(ratio_1 / height); // height means 100%
        if (blockCount <= -height)
            blockCount = height - 1;
        blockCount = Math.abs(blockCount);
        if (latest === 0 || old === 0) {
            blockCount = height;
        }
        var blocks = square.repeat(width);
        barBlock = {
            latest: Array(isGreaterThenOld ? height : height - blockCount).fill(blocks),
            old: Array(isGreaterThenOld ? height - blockCount : height).fill(blocks)
        };
    }
    /* place side by side two bar charts. */
    for (var i = 0; i < height; i++) {
        var latest_1 = i < barBlock.latest.length ? barBlock.latest[i] : ' '.repeat(width);
        var old_1 = i < barBlock.old.length ? barBlock.old[i] : ' '.repeat(width);
        barChart.push(latest_1 + "  " + old_1);
    }
    /* display to bar chart bottom that ratio only latest */
    function paintCompare(ratio) {
        return ratio.indexOf('-') > -1
            ? colors_1.default.magenta(ratio) // negative number
            : colors_1.default.green(ratio);
    }
    var ratio = latest > 1
        ? (old > 0 ? Math.round(latest / old * 100 - 100) : 100)
        : 0;
    return __spread([
        padBoth_1.default("" + latest, width) + "  " + padBoth_1.default("" + old, width)
    ], barChart.reverse(), [
        padBoth_1.default("" + label.latest, width) + "  " + padBoth_1.default("" + label.old, width),
        "" + paintCompare(padBoth_1.default("(" + ratio + "%)", width))
    ]);
}
exports.default = BarChartGenerate;

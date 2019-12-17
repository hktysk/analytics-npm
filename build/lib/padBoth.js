"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function padBoth(s, width) {
    var diff = width - s.length;
    if (diff <= 0)
        return s;
    s = ' '.repeat(Math.floor(diff / 2)) + s;
    s = s + ' '.repeat(Math.ceil(diff / 2));
    return s;
}
exports.default = padBoth;

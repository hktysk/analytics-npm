"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = __importDefault(require("./main"));
var default_1 = /** @class */ (function () {
    function default_1(s) {
        this.s = s;
        this.main = new main_1.default(this.s);
    }
    return default_1;
}());
exports.default = default_1;

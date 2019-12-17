"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var blessed_contrib_1 = __importDefault(require("blessed-contrib"));
var Main_1 = __importDefault(require("./Main"));
var default_1 = /** @class */ (function () {
    function default_1(screen) {
        this.screen = screen;
        this.grid = new blessed_contrib_1.default.grid({
            rows: 20,
            cols: 20,
            screen: this.screen
        });
        this.Main = new Main_1.default(this.screen, this.grid);
    }
    default_1.prototype.key = function (key, callback) {
        this.screen.key(key, callback);
    };
    default_1.prototype.hide = function () {
        this.Main.packages.hide();
    };
    default_1.prototype.show = function (s) {
        this.hide();
        for (var k in s) {
            if ('show' in s[k])
                s[k].show();
        }
        this.screen.render();
    };
    default_1.prototype.init = function () {
        this.hide();
        this.show(this.Main);
        this.Main.packages.focus();
    };
    default_1.prototype.render = function () {
        this.screen.render();
    };
    return default_1;
}());
exports.default = default_1;

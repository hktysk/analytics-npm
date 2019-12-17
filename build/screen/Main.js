"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var blessed_1 = __importDefault(require("blessed"));
var blessed_contrib_1 = __importDefault(require("blessed-contrib"));
var max = 20;
var packages = 8;
var height = 10;
var bar = 4;
var barHeight = 10;
var Main = /** @class */ (function () {
    function Main(screen, grid) {
        this.screen = screen;
        this.grid = grid;
        this.packages = this.grid.set(0, 0, height, packages, blessed_1.default.list, {
            keys: true,
            //mouse: true,
            parent: this.screen,
            scrollable: true,
            alwaysScroll: true,
            label: 'PACKAGE',
            width: '48%',
            height: '100%',
            selectedFg: 'black',
            selectedBg: 'white',
            align: 'left',
            //interactive: false,
            border: { type: 'line' },
            style: {
                fg: 'white',
                bg: 234,
                border: {
                    fg: 'cyan',
                    bg: 234
                },
                label: {
                    bg: 234
                }
            },
            noCellBorders: true,
            tags: true,
            wrap: false,
            vi: true,
            search: true
        });
        this.YoY = blessed_1.default.text({
            keys: true,
            //mouse: true,
            parent: this.screen,
            label: 'YoY',
            top: '0',
            left: '40%',
            width: '21%',
            height: '50%',
            border: { type: 'line' },
            style: {
                fg: 'white',
                bg: 234,
                border: {
                    fg: 'cyan',
                    bg: 234
                },
                label: {
                    bg: 234
                }
            },
            tags: true,
        });
        this.MoM = blessed_1.default.text({
            keys: true,
            //mouse: true,
            parent: this.screen,
            label: 'MoM',
            top: '0',
            left: '60%',
            width: '21%',
            height: '50%',
            border: { type: 'line' },
            style: {
                fg: 'white',
                bg: 234,
                border: {
                    fg: 'cyan',
                    bg: 234
                },
                label: {
                    bg: 234
                }
            },
            tags: true,
        });
        this.DoD = blessed_1.default.text({
            keys: true,
            //mouse: true,
            parent: this.screen,
            label: 'DoD',
            top: '0',
            left: '80.5%',
            width: '20%',
            height: '50%',
            border: { type: 'line' },
            style: {
                fg: 'white',
                bg: 234,
                border: {
                    fg: 'cyan',
                    bg: 234
                },
                label: {
                    bg: 234
                }
            },
            tags: true,
        });
        this.lineChart = this.grid.set(height, 0, height, max, blessed_contrib_1.default.line, {
            keys: true,
            parent: this.screen,
            scrollable: true,
            alwaysScroll: true,
            width: '48%',
            height: '100%',
            style: {
                line: "cyan",
                text: 'cyan',
                baseline: 'black',
                fg: 'white',
                bg: 234,
                border: {
                    fg: 'cyan',
                    bg: 234
                },
                label: {
                    bg: 234
                }
            },
            xLabelPadding: 1,
            xPadding: 2,
            showLegend: true,
            wholeNumbersOnly: false,
        });
    }
    return Main;
}());
exports.default = Main;

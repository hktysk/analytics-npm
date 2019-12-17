"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var colors_1 = __importDefault(require("colors"));
var BarChart_1 = __importDefault(require("../lib/BarChart"));
var main = /** @class */ (function () {
    function main(s) {
        var _this = this;
        this.s = s;
        this.packages = {
            addList: function (packageName) {
                _this.s.Main.packages.addItem(packageName);
                _this.s.Main.packages.setLabel(" packages ");
                _this.s.render();
            },
            updateLineChartForWeek: function (week, lastWeek) {
                week = week.map(function (v) { return ({
                    day: v.day.replace('2019-', '').replace('-', '/'),
                    downloads: v.downloads
                }); });
                lastWeek = lastWeek.map(function (v) { return ({
                    day: v.day.replace('2019-', '').replace('-', '/'),
                    downloads: v.downloads
                }); });
                var days = week.map(function (v) { return v.day; });
                _this.s.Main.lineChart.setData([
                    {
                        title: 'last week',
                        x: days,
                        y: lastWeek.map(function (v) { return v.downloads; }),
                        style: { line: 'cyan' }
                    },
                    {
                        title: 'this week',
                        x: days,
                        y: week.map(function (v) { return v.downloads; }),
                        style: { line: 'green' }
                    },
                ]);
                _this.s.render();
            },
            updateBarChart: function (screen, latest, old, label) {
                var props = {
                    numberToCompare: {
                        latest: latest,
                        old: old
                    },
                    label: label,
                    width: 11
                };
                var BarChart = BarChart_1.default(props);
                BarChart = BarChart.map(function (v, k) {
                    if (k === BarChart.length - 1)
                        return " " + v;
                    return colors_1.default.cyan(" " + v);
                });
                screen.setContent("\n" + BarChart.join('\n'));
                _this.s.render();
            }
        };
    }
    return main;
}());
exports.default = main;

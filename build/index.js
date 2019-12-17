"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var blessed_1 = __importDefault(require("blessed"));
var axios_1 = __importDefault(require("axios"));
var moment_1 = __importDefault(require("moment"));
var lodash_1 = __importDefault(require("lodash"));
var screen_1 = __importDefault(require("./screen"));
var directive_1 = __importDefault(require("./directive"));
/*******************************
* Initial setting
/******************************/
var s = new screen_1.default(blessed_1.default.screen({
    smartCSR: true,
    title: 'giv'
}));
s.init(); // Show Main screen and hide other screens
var directive = new directive_1.default(s);
directive.main.packages.addList('All');
/********************************
* Prepare state
/*******************************/
var state = {
    isMainScreen: true,
    downlodedPackages: {}
};
var dispatch = {
    cheangedMainScreen: function () { return (state.isMainScreen = false); },
    init: function () { return (state.isMainScreen = true); },
    addDownloadPackages: function (packageName, latest, old) {
        state.downlodedPackages[packageName] = { latest: latest, old: old };
    }
};
/*********************************
* Process for setting.
*********************************/
function api(range, packageName) {
    return "https://api.npmjs.org/downloads/range/" + range + "/" + packageName;
}
function updateDisplayInformation(packageName, year, lastYear) {
    var latest = [];
    var old = [];
    if (packageName === 'All') {
        for (var key in state.downlodedPackages) {
            if (latest.length > 0) {
                state.downlodedPackages[key].latest.downloads.forEach(function (v, k) { return latest[k].downloads += v.downloads; });
                state.downlodedPackages[key].old.downloads.forEach(function (v, k) { return old[k].downloads += v.downloads; });
            }
            else {
                latest = lodash_1.default.cloneDeep(state.downlodedPackages[key].latest.downloads);
                old = lodash_1.default.cloneDeep(state.downlodedPackages[key].old.downloads);
            }
        }
    }
    else {
        latest = lodash_1.default.cloneDeep(state.downlodedPackages[packageName].latest.downloads);
        old = lodash_1.default.cloneDeep(state.downlodedPackages[packageName].old.downloads);
    }
    /* year */
    var latestDownloads = latest.map(function (v) { return v.downloads; }).reduce(function (a, b) { return a + b; });
    var oldDownloads = old.map(function (v) { return v.downloads; }).reduce(function (a, b) { return a + b; });
    directive.main.packages.updateBarChart(s.Main.YoY, latestDownloads, oldDownloads, {
        latest: year,
        old: lastYear
    });
    /* month */
    var month = latest.slice(0, -2).slice(-31);
    var lastMonth = latest.slice(0, -33).slice(-31);
    var monthDownloads = month.map(function (v) { return v.downloads; }).reduce(function (a, b) { return a + b; });
    var lastMonthDownloads = lastMonth.map(function (v) { return v.downloads; }).reduce(function (a, b) { return a + b; });
    directive.main.packages.updateBarChart(s.Main.MoM, monthDownloads, lastMonthDownloads, {
        latest: 'month',
        old: 'last month'
    });
    /* day */
    var day = latest.slice(0, -2).slice(-1);
    var lastDay = latest.slice(0, -3).slice(-1);
    var dayDownloads = day.map(function (v) { return v.downloads; }).reduce(function (a, b) { return a + b; });
    var lastDayDownloads = lastDay.map(function (v) { return v.downloads; }).reduce(function (a, b) { return a + b; });
    directive.main.packages.updateBarChart(s.Main.DoD, dayDownloads, lastDayDownloads, {
        latest: 'day',
        old: 'last day'
    });
    /* week */
    var week = latest.slice(0, -2).slice(-7);
    var lastWeek = latest.slice(0, -9).slice(-7);
    directive.main.packages.updateLineChartForWeek(week, lastWeek);
}
/*********************************
* Get information from API
*********************************/
var samplePackages = [
    'react-instagram-carousel',
    'resv',
    'react-stack-gallery',
    'react-standard-carousel',
    'axios',
    'express',
    'react',
    'jest',
    'typescript',
];
var year = "" + moment_1.default.utc().year();
var lastYear = "" + (moment_1.default.utc().year() - 1);
function getInformation(year, packageName) {
    var _this = this;
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        var r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(api(year + "-01-01:" + year + "-12-31", packageName))];
                case 1:
                    r = _a.sent();
                    return [2 /*return*/, resolve(r ? r.data : null)];
            }
        });
    }); });
}
samplePackages.forEach(function (v) {
    var promises = [
        getInformation(year, v),
        getInformation(lastYear, v)
    ];
    Promise.all(promises).then(function (r) {
        var _a, _b;
        if (!((_a = r) === null || _a === void 0 ? void 0 : _a[0]) || !((_b = r) === null || _b === void 0 ? void 0 : _b[1]))
            return;
        dispatch.addDownloadPackages(v, r[0], r[1]);
        directive.main.packages.addList(v);
        updateDisplayInformation('All', year, lastYear);
    });
});
/*****************************
* Events
/****************************/
/* Main screen events */
s.Main.packages.key('d', function () { return s.Main.packages.scroll(10); });
s.Main.packages.key('u', function () { return s.Main.packages.scroll(-10); });
s.Main.packages.key('g', function () { return s.Main.packages.resetScroll(); });
s.Main.packages.on('select item', function () {
    var packageName = s.Main.packages.getItem(this.selected).content;
    updateDisplayInformation(packageName, year, lastYear);
});
/* Exit */
s.key(['escape', 'q', 'C-[', 'C-c'], function () { return process.exit(0); });

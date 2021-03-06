#!/usr/bin/env node
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
var commander_1 = __importDefault(require("commander"));
var cheerio_1 = __importDefault(require("cheerio"));
var axios_1 = __importDefault(require("axios"));
var colors_1 = __importDefault(require("colors"));
var render_1 = __importDefault(require("./render"));
/*******************************
* bin
/******************************/
commander_1.default.name('analytics-npm');
commander_1.default.on('--help', function () {
    console.log();
    console.log('For more information, see');
    console.log('https://github.com/hktysk/analytics-npm');
    console.log();
});
function bin(argv) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var packages, waitMessage, account, noneMessage;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!((_a = argv.args) === null || _a === void 0 ? void 0 : _a[0])) {
                        console.log('please specify account name to first argument.');
                        process.exit(0);
                    }
                    packages = [];
                    waitMessage = 'getting list for packages from npmjs...';
                    console.log(colors_1.default.cyan(waitMessage));
                    account = argv.args[0];
                    return [4 /*yield*/, axios_1.default.get("https://www.npmjs.com/~" + account)
                            .then(function (r) {
                            var $ = cheerio_1.default.load(r.data);
                            $('.w-80 h3').each(function () {
                                packages.push(this.children[0].data);
                                return this;
                            });
                        })
                            .catch(function (_) {
                            var errMessage = "could not get packages of " + account + " from npmjs.";
                            console.log(colors_1.default.magenta(errMessage));
                            process.exit(0);
                        })];
                case 1:
                    _b.sent();
                    /***********************************
                    * render
                    /**********************************/
                    if (packages.length === 0) {
                        noneMessage = 'There were no packages published.';
                        console.log(colors_1.default.red(noneMessage));
                        process.exit(0);
                    }
                    render_1.default(packages);
                    return [2 /*return*/];
            }
        });
    });
}
bin(commander_1.default.parse(process.argv));

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const logger_service_1 = require('./logger.service');
let BreakpointService = class BreakpointService {
    constructor(logger) {
        this.logger = logger;
        this.breakpoints = {};
        this.widths = {};
        this.debug = false;
        this.init = false;
        this.event$ = new core_1.EventEmitter();
    }
    afterViewInit() {
        let self = this;
        this.window = window;
        this.window.onresize = function (e) {
            self.update.call(self, e);
        };
        this.update(undefined);
    }
    debugMode(b) {
        this.debug = b;
        if (b)
            this.logger.log(this, 'Now in debug mode');
    }
    is(keyword) {
        return this.breakpoint && 'name' in this.breakpoint && this.breakpoint.name == keyword;
    }
    add(keyword, width) {
        if (!(keyword in this.breakpoints) && (!!width)) {
            var obj = {
                width: width
            };
            this.widths[width] = keyword;
            this.breakpoints[keyword] = obj;
        }
    }
    remove(keyword) {
        if (keyword in this.breakpoints) {
            delete this.breakpoints[keyword];
        }
        for (var i in this.widths) {
            if (this.widths[i].name == keyword)
                delete this.widths[i];
        }
    }
    emit() {
        this.event$.next(this.breakpoint);
    }
    update(evt) {
        var window = this.getWindow();
        for (var curKey in this.widths) {
            let widthKeys = Object.keys(this.widths);
            let curObjectKey = widthKeys.indexOf(curKey);
            let lastKey = widthKeys[curObjectKey - 1];
            let nextKey = widthKeys[curObjectKey + 1];
            let lastName = this.widths[lastKey];
            let curName = this.widths[curKey];
            let nextName = this.widths[nextKey];
            let lastWidth = parseInt(lastKey);
            let curWidth = parseInt(curKey);
            let nextWidth = parseInt(nextKey);
            let breakpoint = this.breakpoints[curName];
            breakpoint.name = curName;
            if (this.breakpoint && breakpoint.name == this.breakpoint.name)
                continue;
            if (!lastKey) {
                if (window.width <= curWidth) {
                    doEmit.call(this, breakpoint);
                }
            }
            else if (!nextKey) {
                if (window.width >= curWidth) {
                    doEmit.call(this, breakpoint);
                }
            }
            else {
                if (window.width > lastWidth && window.width < nextWidth) {
                    doEmit.call(this, breakpoint);
                }
            }
        }
        this.init = true;
        function doEmit(b) {
            this.breakpoint = b;
            if (this.init)
                this.emit(b);
            if (this.debug)
                this.logger.log(this, b);
        }
    }
    getWindow() {
        let w = this.window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0];
        return {
            width: w.innerWidth || e.clientWidth || g.clientWidth,
            height: w.innerHeight || e.clientHeight || g.clientHeight
        };
    }
};
BreakpointService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [logger_service_1.LoggerService])
], BreakpointService);
exports.BreakpointService = BreakpointService;

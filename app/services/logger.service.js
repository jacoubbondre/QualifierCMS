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
let LoggerService = class LoggerService {
    log(...args) {
        if (typeof args[0] === 'object' && 'arguments' in args[0]) {
            var name = args[0].arguments.name;
            args = args.splice(0, 1);
            console.log(name, args);
        }
        else {
            if (args.length == 1) {
                console.log(args[0]);
            }
            else {
                console.log(args);
            }
        }
    }
    error(...args) {
        if (typeof args[0] === 'object' && 'arguments' in args[0]) {
            var name = args[0].arguments.name;
            args = args.splice(0, 1);
            console.error(name, args);
        }
        else {
            if (args.length == 1) {
                console.error(args[0]);
            }
            else {
                console.error(args);
            }
        }
    }
};
LoggerService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], LoggerService);
exports.LoggerService = LoggerService;

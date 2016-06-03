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
let EnvironmentService = class EnvironmentService {
    constructor() {
        this.devHosts = ['localhost', '127.0.0.1'];
        this.stagingHosts = ['cuat'];
    }
    afterViewInit() {
        this.window = window;
        if (this.devHosts.indexOf(this.window.location.hostname) > -1) {
            this._environment = modes.DEVELOPMENT;
        }
        else if (this.stagingHosts.indexOf(this.window.location.hostname.split('.')[0]) > -1) {
            this._environment = modes.STAGING;
        }
        else {
            this._environment = modes.PRODUCTION;
        }
    }
    setDev() { this._environment = modes.DEVELOPMENT; }
    setDevelopment() { this.setDev(); }
    isDev() { return this._environment == modes.DEVELOPMENT; }
    isDevelopment() { return this.isDev(); }
    setStaging() { this._environment = modes.STAGING; }
    isStaging() { return this._environment == modes.STAGING; }
    setProd() { this._environment = modes.PRODUCTION; }
    setProduction() { this.setProd(); }
    isProd() { return this._environment == modes.PRODUCTION; }
    isProduction() { return this.isProd(); }
    environment() { return this._environment; }
    env() { return this.environment(); }
    mode() { return this.environment(); }
};
EnvironmentService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], EnvironmentService);
exports.EnvironmentService = EnvironmentService;
class modes {
    static get DEVELOPMENT() { return "dev"; }
    static get PRODUCTION() { return "prod"; }
    static get STAGING() { return "staging"; }
}

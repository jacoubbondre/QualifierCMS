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
const http_1 = require('@angular/http');
let I18nService = class I18nService {
    constructor(logger, http) {
        this.logger = logger;
        this.http = http;
        this.defaultLanguage = 'en';
        this.containers = {};
        this.logBuffer = [];
        this.setLanguage(this.defaultLanguage);
    }
    setLanguage(language) {
        this.container = new LanguageContainer();
        this.container.language = language;
        if (!(language in this.containers))
            this.http.get(`/app/i18n/${language}.json`).map((res) => res.json()).subscribe(res => {
                this.container.strings = res;
                this.containers[language] = this.container;
            }, err => {
                this.logger.error(this, `failed to get ${language}.json`);
            });
        else
            this.container = this.containers[language];
    }
    translate(value) {
        if (!(this.container && this.container.strings))
            return undefined;
        if (value in this.container.strings) {
            return this.container.strings[value];
        }
        else {
            if (this.logBuffer.indexOf(value) == -1) {
                this.logger.error(this, `failed to translate '${value}'`);
                this.logBuffer.push(value);
            }
            return undefined;
        }
    }
    get language() {
        return this.container && this.container.language ? this.container.language : undefined;
    }
    set language(val) {
        this.logger.error('Cannot explicitly set language, use setLanguage()');
    }
};
I18nService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [logger_service_1.LoggerService, http_1.Http])
], I18nService);
exports.I18nService = I18nService;
class LanguageContainer {
}

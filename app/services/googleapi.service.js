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
const http_1 = require('@angular/http');
require('rxjs/Rx');
const logger_service_1 = require('./logger.service');
let GoogleApiService = class GoogleApiService {
    constructor(http, logger) {
        this.http = http;
        this.logger = logger;
        this.http = http;
        this.logger = logger;
    }
    video(id, cb) {
        var params = {
            id: id,
            part: 'snippet',
            key: 'AIzaSyAzWTgldNKQqc8MPajiWHPhJ6UI6SPdaSE'
        };
        this.http.get(this.constructURL('https://www.googleapis.com/youtube/v3/videos', params))
            .map((res) => res.json())
            .subscribe(data => { cb(data, false); }, err => cb(false, err));
    }
    initialize(data) {
        data = data.items[0];
        console.log(data);
        this.description = data.snippet.description.replace(/\\n/g, '');
    }
    constructURL(url, params) {
        var r = '';
        for (var i in params) {
            r += i + '=' + params[i] + '&';
        }
        return url + '?' + r;
    }
};
GoogleApiService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http, logger_service_1.LoggerService])
], GoogleApiService);
exports.GoogleApiService = GoogleApiService;

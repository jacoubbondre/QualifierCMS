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
const logger_service_1 = require('./logger.service');
let FirebaseService = class FirebaseService {
    constructor(http, logger) {
        this.http = http;
        this.logger = logger;
        this.url = "https://qualifier-cms.firebaseio.com";
        this.onGetConfigs = new core_1.EventEmitter();
        this.onGetDefaultConfig = new core_1.EventEmitter();
        this.ref = new Firebase(this.url);
        this.endpoints = {
            restore: { uri: '/restore', ref: undefined },
            default: { uri: '/default', ref: undefined },
            latest: { uri: '/latest', ref: undefined }
        };
        for (let i in this.endpoints) {
            this.endpoints[i].ref = new Firebase(this.url + this.endpoints[i].uri);
        }
        this.getDefaultConfig();
    }
    saveConfig(configs, data, id) {
        if (typeof id === 'undefined' || !(id in configs) || !configs) {
            console.log('creating new');
            this.endpoints['restore'].ref.push({
                created: Firebase.ServerValue.TIMESTAMP,
                updated: Firebase.ServerValue.TIMESTAMP,
                data: data.data
            });
        }
        else if (id in configs) {
            console.log('updating existing', data);
            let ref = new Firebase(this.url + this.endpoints['restore'].uri + '/' + id);
            ref.set({
                created: configs[id].created,
                updated: Firebase.ServerValue.TIMESTAMP,
                data: data.data
            });
            ref = new Firebase(this.url + this.endpoints['latest'].uri);
            ref.set({
                created: configs[id].created,
                updated: Firebase.ServerValue.TIMESTAMP,
                data: data.data
            });
        }
    }
    getDefaultConfig() {
        let self = this;
        this.endpoints['default'].ref.on('value', function (snapshot) {
            self.onGetDefaultConfig.emit(snapshot.val());
        }, function (e) {
            self.logger.error(e);
        });
    }
    saveDefaultConfig(data) {
        this.endpoints['default'].ref.set({
            created: Firebase.ServerValue.TIMESTAMP,
            updated: Firebase.ServerValue.TIMESTAMP,
            data: data
        });
    }
    getConfigs() {
        let self = this;
        this.endpoints['restore'].ref.on('value', function (snapshot) {
            self.onGetConfigs.emit(snapshot.val());
        }, function (e) {
            self.logger.error(e);
        });
    }
};
FirebaseService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http, logger_service_1.LoggerService])
], FirebaseService);
exports.FirebaseService = FirebaseService;

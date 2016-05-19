System.register(['angular2/core', './logger.service', './firebase.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, logger_service_1, firebase_service_1;
    var StoreService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (logger_service_1_1) {
                logger_service_1 = logger_service_1_1;
            },
            function (firebase_service_1_1) {
                firebase_service_1 = firebase_service_1_1;
            }],
        execute: function() {
            StoreService = (function () {
                function StoreService(logger, firebase) {
                    var _this = this;
                    this.logger = logger;
                    this.firebase = firebase;
                    this.onConfigChange = new core_1.EventEmitter();
                    this.onConfigsChange = new core_1.EventEmitter();
                    this.configs = {};
                    this.firebase.onGetConfigs.subscribe(function (res) {
                        _this._onConfigsChange(res);
                    });
                    this.firebase.onGetDefaultConfig.subscribe(function (res) {
                        _this._onDefaultConfigChange(res);
                    });
                    this.firebase.getConfigs();
                }
                //inputs
                StoreService.prototype._onConfigsChange = function (configs) {
                    if (configs) {
                        this.configs = configs;
                        var keys = Object.keys(this.configs);
                        this.setConfig(this.configs[keys[0]], keys[0]);
                        this.onConfigsChange.emit(configs);
                    }
                };
                StoreService.prototype._onDefaultConfigChange = function (config) {
                    if (config) {
                        this.setDefaultConfig(config, false);
                    }
                };
                //methods
                StoreService.prototype.setDefaultConfig = function (config, propogate) {
                    if (propogate === void 0) { propogate = true; }
                    this.defaultConfig = config;
                    if (propogate)
                        this.firebase.saveDefaultConfig(config);
                };
                StoreService.prototype.setConfig = function (data, id) {
                    this.config = data;
                    this.id = id;
                    this.onConfigChange.emit(this.config);
                };
                StoreService.prototype.setConfigData = function (data) {
                    this.config.data = data;
                };
                StoreService.prototype.newConfig = function () {
                    this.setConfig({
                        data: this.defaultConfig,
                        created: undefined,
                        updated: undefined,
                        id: undefined
                    }, undefined);
                };
                StoreService.prototype.setConfigById = function (id) {
                    if (this.configs && id in this.configs) {
                        this.config = this.configs[id];
                        this.id = id;
                    }
                };
                StoreService.prototype.changeConfig = function (id) {
                    if (id in this.configs) {
                        this.config = this.configs[id];
                        this.id = id;
                    }
                };
                StoreService.prototype.saveConfig = function () {
                    console.log('save config', this.config, this.id);
                    this.firebase.saveConfig(this.configs, this.config, this.id);
                };
                StoreService.prototype.getConfig = function (id) {
                    if (typeof id !== 'undefined' && id in this.configs)
                        return this.configs[id];
                    return this.config;
                };
                StoreService.prototype.getConfigs = function () {
                    return this.configs;
                };
                StoreService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [logger_service_1.LoggerService, firebase_service_1.FirebaseService])
                ], StoreService);
                return StoreService;
            }());
            exports_1("StoreService", StoreService);
        }
    }
});
//# sourceMappingURL=store.service.js.map
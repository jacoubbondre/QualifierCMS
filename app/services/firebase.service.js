System.register(['angular2/core', 'angular2/http', './logger.service'], function(exports_1, context_1) {
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
    var core_1, http_1, logger_service_1;
    var FirebaseService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (logger_service_1_1) {
                logger_service_1 = logger_service_1_1;
            }],
        execute: function() {
            FirebaseService = (function () {
                function FirebaseService(http, logger) {
                    this.http = http;
                    this.logger = logger;
                    this.url = "https://qualifier-cms.firebaseio.com";
                    this.onGetConfigs = new core_1.EventEmitter();
                    this.onGetDefaultConfig = new core_1.EventEmitter();
                    this.ref = new Firebase(this.url);
                    this.endpoints = {
                        restore: { uri: '/restore', ref: undefined },
                        default: { uri: '/default', ref: undefined }
                    };
                    for (var i in this.endpoints) {
                        this.endpoints[i].ref = new Firebase(this.url + this.endpoints[i].uri);
                    }
                    this.getDefaultConfig();
                }
                FirebaseService.prototype.saveToFile = function (data, name) {
                    var headers = new http_1.Headers().append('Content-Type', 'application/json');
                    var tmpStr = 'data=' + (JSON.stringify(data));
                    this.http.post(name + '.php', tmpStr)
                        .subscribe(function (res) {
                        console.log(res);
                    }, function () { return console.log('Auth Complete'); });
                };
                FirebaseService.prototype.saveConfig = function (configs, data, id) {
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
                        var ref = new Firebase(this.url + this.endpoints['restore'].uri + '/' + id);
                        ref.set({
                            created: configs[id].created,
                            updated: Firebase.ServerValue.TIMESTAMP,
                            data: data.data
                        });
                    }
                    this.saveToFile(data, id);
                };
                FirebaseService.prototype.getDefaultConfig = function () {
                    var self = this;
                    this.endpoints['default'].ref.on('value', function (snapshot) {
                        self.onGetDefaultConfig.emit(snapshot.val());
                    }, function (e) {
                        self.logger.error(e);
                    });
                };
                FirebaseService.prototype.saveDefaultConfig = function (data) {
                    this.endpoints['default'].ref.set({
                        created: Firebase.ServerValue.TIMESTAMP,
                        updated: Firebase.ServerValue.TIMESTAMP,
                        data: data
                    });
                };
                FirebaseService.prototype.getConfigs = function () {
                    var self = this;
                    this.endpoints['restore'].ref.on('value', function (snapshot) {
                        self.onGetConfigs.emit(snapshot.val());
                    }, function (e) {
                        self.logger.error(e);
                    });
                };
                FirebaseService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, logger_service_1.LoggerService])
                ], FirebaseService);
                return FirebaseService;
            }());
            exports_1("FirebaseService", FirebaseService);
        }
    }
});
//# sourceMappingURL=firebase.service.js.map
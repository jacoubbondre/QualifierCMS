System.register(['angular2/core', 'angular2/http', 'rxjs/Rx', './logger.service'], function(exports_1, context_1) {
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
    var GoogleApiService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (logger_service_1_1) {
                logger_service_1 = logger_service_1_1;
            }],
        execute: function() {
            GoogleApiService = (function () {
                function GoogleApiService(http, logger) {
                    this.http = http;
                    this.logger = logger;
                    this.http = http;
                    this.logger = logger;
                }
                GoogleApiService.prototype.video = function (id, cb) {
                    var params = {
                        id: id,
                        part: 'snippet',
                        key: 'AIzaSyAzWTgldNKQqc8MPajiWHPhJ6UI6SPdaSE'
                    };
                    this.http.get(this.constructURL('https://www.googleapis.com/youtube/v3/videos', params))
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { cb(data, false); }, function (err) { return cb(false, err); });
                };
                GoogleApiService.prototype.initialize = function (data) {
                    //assumes 1 result
                    data = data.items[0];
                    console.log(data);
                    this.description = data.snippet.description.replace(/\\n/g, '');
                };
                GoogleApiService.prototype.constructURL = function (url, params) {
                    var r = '';
                    for (var i in params) {
                        r += i + '=' + params[i] + '&';
                    }
                    return url + '?' + r;
                };
                GoogleApiService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, logger_service_1.LoggerService])
                ], GoogleApiService);
                return GoogleApiService;
            }());
            exports_1("GoogleApiService", GoogleApiService);
        }
    }
});
//# sourceMappingURL=googleapi.service.js.map
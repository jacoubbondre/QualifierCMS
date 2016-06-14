System.register(['angular2/core', 'rxjs/Rx'], function(exports_1, context_1) {
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
    var core_1, Rx_1;
    var UploadService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            }],
        execute: function() {
            UploadService = (function () {
                function UploadService() {
                    var _this = this;
                    this.progress$ = Rx_1.Observable.create(function (observer) {
                        _this.progressObserver = observer;
                    }).share();
                }
                UploadService.prototype.makeFileRequest = function (url, params, files) {
                    var _this = this;
                    return Rx_1.Observable.create(function (observer) {
                        var formData = new FormData(), xhr = new XMLHttpRequest();
                        for (var i = 0; i < files.length; i++) {
                            console.log(files[i]);
                            console.log(files[i].name);
                            formData.append("image", files[i], files[i].name);
                        }
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === 4) {
                                if (xhr.status === 200) {
                                    observer.next(xhr.response);
                                    console.log(xhr.response);
                                    observer.complete();
                                }
                                else {
                                    observer.error(xhr.response);
                                }
                            }
                        };
                        xhr.upload.onprogress = function (event) {
                            _this.progress = Math.round(event.loaded / event.total * 100);
                            _this.progressObserver.next(_this.progress);
                        };
                        console.log("Sending Post Data: " + formData);
                        xhr.open('POST', url, true);
                        xhr.send(formData);
                    });
                };
                UploadService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], UploadService);
                return UploadService;
            }());
            exports_1("UploadService", UploadService);
        }
    }
});
//# sourceMappingURL=upload.service.js.map
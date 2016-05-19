///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
System.register(['angular2/platform/browser', 'angular2/http', './services/logger.service', './services/firebase.service', './services/store.service', 'angular2/core', './basicDataModifier.component', './basicDataList.component'], function(exports_1, context_1) {
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
    var browser_1, http_1, logger_service_1, firebase_service_1, store_service_1, core_1, basicDataModifier_component_1, basicDataList_component_1;
    var AppComponent;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (logger_service_1_1) {
                logger_service_1 = logger_service_1_1;
            },
            function (firebase_service_1_1) {
                firebase_service_1 = firebase_service_1_1;
            },
            function (store_service_1_1) {
                store_service_1 = store_service_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (basicDataModifier_component_1_1) {
                basicDataModifier_component_1 = basicDataModifier_component_1_1;
            },
            function (basicDataList_component_1_1) {
                basicDataList_component_1 = basicDataList_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(firebase, store, http) {
                    this.firebase = firebase;
                    this.store = store;
                    this.http = http;
                }
                AppComponent.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    this.http.get('http://findmy.maytag.ca/config/maytag-en_CA.json').subscribe(function (res) {
                        _this.firebase.saveDefaultConfig(res.json());
                    });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'main-app',
                        providers: [http_1.HTTP_PROVIDERS],
                        directives: [basicDataModifier_component_1.BasicDataModifierComponent, basicDataList_component_1.BasicDataListComponent],
                        template: "\n    \t<basic-data-list></basic-data-list>\n\t\t<basic-data-modifier></basic-data-modifier>\n\t"
                    }), 
                    __metadata('design:paramtypes', [firebase_service_1.FirebaseService, store_service_1.StoreService, http_1.Http])
                ], AppComponent);
                return AppComponent;
            }());
            browser_1.bootstrap(AppComponent, [http_1.HTTP_PROVIDERS, logger_service_1.LoggerService, firebase_service_1.FirebaseService, store_service_1.StoreService]);
        }
    }
});
//# sourceMappingURL=app.js.map
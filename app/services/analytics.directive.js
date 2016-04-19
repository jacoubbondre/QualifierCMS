System.register(['angular2/core', 'angular2/platform/browser', './services/analytics.service'], function(exports_1, context_1) {
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
    var core_1, browser_1, analytics_service_1;
    var AnalyticsOn;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (analytics_service_1_1) {
                analytics_service_1 = analytics_service_1_1;
            }],
        execute: function() {
            AnalyticsOn = (function () {
                function AnalyticsOn(elRef, analytics) {
                    this.elRef = elRef;
                    this.el = elRef.nativeElement;
                    this.analytics = analytics;
                    this.DOM = new browser_1.BrowserDomAdapter();
                }
                AnalyticsOn.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    this.DOM.on(this.el, this.analyticsOn, function (event) { return _this.eventTrack(event); });
                };
                AnalyticsOn.prototype.eventTrack = function (event) {
                    var properties = {
                        eventType: event.type
                    };
                    if (this.analyticsAction) {
                        properties.action = this.analyticsAction;
                    }
                    if (this.analyticsCategory) {
                        properties.category = this.analyticsCategory;
                    }
                    if (this.analyticsLabel) {
                        properties.label = this.analyticsLabel;
                    }
                    this.analytics.sendEvent(properties);
                };
                __decorate([
                    core_1.Input('analyticsOn'), 
                    __metadata('design:type', String)
                ], AnalyticsOn.prototype, "analyticsOn", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], AnalyticsOn.prototype, "analyticsAction", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], AnalyticsOn.prototype, "analyticsCategory", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], AnalyticsOn.prototype, "analyticsLabel", void 0);
                AnalyticsOn = __decorate([
                    core_1.Injectable(),
                    core_1.Directive({
                        selector: '[analyticsOn]'
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, (typeof (_a = typeof analytics_service_1.Analytics !== 'undefined' && analytics_service_1.Analytics) === 'function' && _a) || Object])
                ], AnalyticsOn);
                return AnalyticsOn;
                var _a;
            }());
            exports_1("AnalyticsOn", AnalyticsOn);
        }
    }
});
//# sourceMappingURL=analytics.directive.js.map
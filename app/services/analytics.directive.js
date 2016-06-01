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
const browser_adapter_1 = require('@angular/platform-browser/src/browser/browser_adapter');
const analytics_service_1 = require('./analytics.service');
let AnalyticsOn = class AnalyticsOn {
    constructor(elRef, analytics) {
        this.elRef = elRef;
        this.el = elRef.nativeElement;
        this.analytics = analytics;
        this.DOM = new browser_adapter_1.BrowserDomAdapter();
    }
    ngAfterViewInit() {
        this.DOM.on(this.el, this.analyticsOn, (event) => this.eventTrack(event));
    }
    eventTrack(event) {
        let properties = {
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
    }
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
    __metadata('design:paramtypes', [core_1.ElementRef, analytics_service_1.AnalyticsService])
], AnalyticsOn);
exports.AnalyticsOn = AnalyticsOn;

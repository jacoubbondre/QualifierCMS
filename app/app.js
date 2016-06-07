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
require('rxjs/Rx');
const platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
const http_1 = require('@angular/http');
const logger_service_1 = require('./services/logger.service');
const firebase_service_1 = require('./services/firebase.service');
const store_service_1 = require('./services/store.service');
const i18n_service_1 = require('./services/i18n.service');
const environment_service_1 = require('./services/environment.service');
const breakpoint_service_1 = require('./services/breakpoint.service');
const core_1 = require('@angular/core');
const router_deprecated_1 = require('@angular/router-deprecated');
const ui_navbar_component_1 = require('./ui.navbar.component');
const brand_edit_component_1 = require('./brand.edit.component');
const category_edit_component_1 = require('./category.edit.component');
const question_edit_component_1 = require('./question.edit.component');
let AppComponent = class AppComponent {
    constructor(firebase, store, http, router, i18n, env, breakpoint, logger) {
        this.firebase = firebase;
        this.store = store;
        this.http = http;
        this.router = router;
        this.i18n = i18n;
        this.env = env;
        this.breakpoint = breakpoint;
        this.logger = logger;
        breakpoint.add('tablet', 480);
        breakpoint.add('desktop', 481);
    }
    ngAfterViewInit() {
        this.breakpoint.afterViewInit();
        this.env.afterViewInit();
        this.i18n.setLanguage(this.env.language());
        if (this.env.isDev() || this.env.isStaging()) {
            this.breakpoint.debugMode(true);
        }
        this.logger.log(`Angular 2 app environment: ${this.env.mode()}`);
        this.http.get('http://findmy.maytag.ca/config/maytag-en_CA.json').subscribe(res => {
            this.firebase.saveDefaultConfig(res.json());
        });
    }
};
AppComponent = __decorate([
    core_1.Component({
        selector: 'main-app',
        providers: [http_1.HTTP_PROVIDERS],
        directives: [ui_navbar_component_1.UINavbar, router_deprecated_1.ROUTER_DIRECTIVES, brand_edit_component_1.BrandEdit, category_edit_component_1.CategoryEdit, question_edit_component_1.QuestionEdit],
        template: `
    	<ui-navbar></ui-navbar>
    	<router-outlet></router-outlet>
	`
    }),
    router_deprecated_1.RouteConfig([
        { path: '/', component: brand_edit_component_1.BrandEdit, name: 'BrandEdit', useAsDefault: true },
        { path: '/edit/:category', component: category_edit_component_1.CategoryEdit, name: 'EditCategory' },
        { path: '/edit/:category/:question', component: question_edit_component_1.QuestionEdit, name: 'EditQuestion' }
    ]), 
    __metadata('design:paramtypes', [firebase_service_1.FirebaseService, store_service_1.StoreService, http_1.Http, router_deprecated_1.Router, i18n_service_1.I18nService, environment_service_1.EnvironmentService, breakpoint_service_1.BreakpointService, logger_service_1.LoggerService])
], AppComponent);
platform_browser_dynamic_1.bootstrap(AppComponent, [http_1.HTTP_PROVIDERS, router_deprecated_1.ROUTER_PROVIDERS, logger_service_1.LoggerService, firebase_service_1.FirebaseService, store_service_1.StoreService, i18n_service_1.I18nService, environment_service_1.EnvironmentService, breakpoint_service_1.BreakpointService]);

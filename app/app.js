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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
const platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
const http_1 = require('@angular/http');
const logger_service_1 = require('./services/logger.service');
const firebase_service_1 = require('./services/firebase.service');
const store_service_1 = require('./services/store.service');
const core_1 = require('@angular/core');
const router_deprecated_1 = require('@angular/router-deprecated');
const ui_navbar_component_1 = require('./ui.navbar.component');
const brand_edit_component_1 = require('./brand.edit.component');
const question_edit_component_1 = require('./question.edit.component');
let AppComponent = class AppComponent {
    constructor(firebase, store, http, router) {
        this.firebase = firebase;
        this.store = store;
        this.http = http;
        this.router = router;
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        this.http.get('http://findmy.maytag.ca/config/maytag-en_CA.json').subscribe(res => {
            this.firebase.saveDefaultConfig(res.json());
        });
    }
};
AppComponent = __decorate([
    core_1.Component({
        selector: 'main-app',
        providers: [http_1.HTTP_PROVIDERS],
        directives: [ui_navbar_component_1.UINavbar, router_deprecated_1.ROUTER_DIRECTIVES],
        template: `
    	<ui-navbar></ui-navbar>
    	<router-outlet></router-outlet>
	`
    }),
    router_deprecated_1.RouteConfig([
        { path: '/', component: brand_edit_component_1.BrandEdit, name: 'Home', useAsDefault: true },
        { path: '/category/:category', component: brand_edit_component_1.BrandEdit, name: 'Category' },
        { path: '/question/:question', component: question_edit_component_1.QuestionEdit, name: 'Question' }
    ]),
    __param(0, core_1.Inject(core_1.forwardRef(() => firebase_service_1.FirebaseService))),
    __param(1, core_1.Inject(core_1.forwardRef(() => store_service_1.StoreService))),
    __param(2, core_1.Inject(core_1.forwardRef(() => http_1.Http))),
    __param(3, core_1.Inject(core_1.forwardRef(() => router_deprecated_1.Router))), 
    __metadata('design:paramtypes', [firebase_service_1.FirebaseService, store_service_1.StoreService, http_1.Http, router_deprecated_1.Router])
], AppComponent);
platform_browser_dynamic_1.bootstrap(AppComponent, [http_1.HTTP_PROVIDERS, router_deprecated_1.ROUTER_PROVIDERS, logger_service_1.LoggerService, firebase_service_1.FirebaseService, store_service_1.StoreService]);

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
const store_service_1 = require('./services/store.service');
const router_deprecated_1 = require('@angular/router-deprecated');
let Preloader = class Preloader {
    constructor(store, router) {
        this.store = store;
        this.router = router;
        this._onConfigChanged = this.store.onConfigChange
            .subscribe(config => this.onConfigChange(config));
    }
    onConfigChange(config) {
        this.router.navigate(['BrandEdit']);
    }
};
Preloader = __decorate([
    core_1.Component({
        selector: 'preloader',
        template: `
      <div class="progress-wrapper row">
          <div class="col s6 offset-s3">
              <div class="progress">
                <div class="indeterminate"></div>
              </div>
          </div>
      </div>
    `
    }), 
    __metadata('design:paramtypes', [store_service_1.StoreService, router_deprecated_1.Router])
], Preloader);
exports.Preloader = Preloader;

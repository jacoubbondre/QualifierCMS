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
const ui_brand_listcontainer_component_1 = require('./ui.brand.listcontainer.component');
const store_service_1 = require('./services/store.service');
const i18n_pipe_1 = require('./pipes/i18n.pipe');
let BrandEdit = class BrandEdit {
    constructor(store) {
        this.store = store;
        this._onConfigChanged = this.store.onConfigChange
            .subscribe(config => this.onConfigChange(config));
    }
    ngOnInit() {
        this.onConfigChange(this.store.getConfig(undefined));
    }
    onConfigChange(config) {
        if (config)
            this.brand = config.getBrand();
    }
};
BrandEdit = __decorate([
    core_1.Component({
        selector: 'brand-edit',
        template: `
    <div class="row list-header">
      <h4>{{brand}} - {{'brand' | translate}}</h4>
      <span>{{'What would you like to edit?' | translate}}</span>
    </div>
    <ui-brand-list-container></ui-brand-list-container>
    `,
        directives: [ui_brand_listcontainer_component_1.UIBrandListContainer],
        pipes: [i18n_pipe_1.InternationalizationPipe]
    }), 
    __metadata('design:paramtypes', [store_service_1.StoreService])
], BrandEdit);
exports.BrandEdit = BrandEdit;

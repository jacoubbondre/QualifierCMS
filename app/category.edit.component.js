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
const core_1 = require('@angular/core');
const ui_category_listcontainer_component_1 = require('./ui.category.listcontainer.component');
const store_service_1 = require('./services/store.service');
let CategoryEdit = class CategoryEdit {
    constructor(store) {
        this.store = store;
        this._onConfigChanged = this.store.onConfigChange
            .subscribe(config => this.onConfigChange(config));
    }
    onConfigChange(config) {
        this.brand = config.getBrand();
    }
};
CategoryEdit = __decorate([
    core_1.Component({
        selector: 'category-edit',
        template: `
    <div class="row">
      <h4>{{brand}} - brand</h4>
      <span>What would you like to edit?</span>
    </div>
    <ui-category-list-container [context]="'category'"></ui-category-list-container>
    `,
        directives: [ui_category_listcontainer_component_1.UICategoryListContainer]
    }),
    __param(0, core_1.Inject(store_service_1.StoreService)), 
    __metadata('design:paramtypes', [store_service_1.StoreService])
], CategoryEdit);
exports.CategoryEdit = CategoryEdit;

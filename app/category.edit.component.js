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
const ui_category_listcontainer_component_1 = require('./ui.category.listcontainer.component');
const store_service_1 = require('./services/store.service');
const router_deprecated_1 = require('@angular/router-deprecated');
let CategoryEdit = class CategoryEdit {
    constructor(store, params) {
        this.store = store;
        this.params = params;
        this._onConfigChanged = this.store.onConfigChange
            .subscribe(config => this.onConfigChange(config));
        this.category = this.params.get('category');
    }
    ngOnInit() {
        this.onConfigChange(this.store.getConfig(undefined));
    }
    onConfigChange(config) {
        if (config) {
            this.questions = config.getQuestionsByCategory(this.category);
            this.brand = config.getBrand();
        }
    }
};
CategoryEdit = __decorate([
    core_1.Component({
        selector: 'category-edit',
        template: `
    <div class="row list-header">
      <h4>{{brand}} - brand - {{category}}</h4>
      <span>What would you like to edit?</span>
    </div>
    <ui-category-list-container [questions]="questions" [category]="category"></ui-category-list-container>
    `,
        directives: [ui_category_listcontainer_component_1.UICategoryListContainer]
    }), 
    __metadata('design:paramtypes', [store_service_1.StoreService, router_deprecated_1.RouteParams])
], CategoryEdit);
exports.CategoryEdit = CategoryEdit;

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
const ui_brand_listitem_component_1 = require('./ui.brand.listitem.component');
const store_service_1 = require('./services/store.service');
const ng2_dnd_1 = require('ng2-dnd/ng2-dnd');
let UIBrandListContainer = class UIBrandListContainer {
    constructor(store) {
        this.store = store;
        this.categories = [];
        this._onConfigChanged = this.store.onConfigChange
            .subscribe(config => this.onConfigChange(config));
    }
    onCategoryReorder() {
        this.config.setCategories(this.categories);
        this.store.saveConfig();
    }
    onSubcategoryReorder() {
        this.config.setCategories(this.categories);
        this.store.saveConfig();
    }
    onConfigChange(config) {
        this.config = config;
        this.categories = config.getCategories();
        console.log(this.categories);
    }
};
UIBrandListContainer = __decorate([
    core_1.Component({
        selector: 'ui-brand-list-container',
        template: `
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Last Modified</th>
        </tr>
      </thead>
      <tbody dnd-sortable-container [sortableData]="categories" [dropZones]="['brand']">
        <tr>
          <div class="category-container">
            <span>General Application Settings</span>
          </div>
        </tr>
        <tr *ngFor="let category of categories; let i = index" [sortableIndex]="i" dnd-sortable (onDragSuccess)="onCategoryReorder()">
          <ui-brand-list-item [data]="category" (onOrderChange)="onSubcategoryReorder()"></ui-brand-list-item>
        </tr>
      </tbody>
    </table>
    `,
        directives: [ui_brand_listitem_component_1.UIBrandListItem, ng2_dnd_1.DND_DIRECTIVES]
    }), 
    __metadata('design:paramtypes', [store_service_1.StoreService])
], UIBrandListContainer);
exports.UIBrandListContainer = UIBrandListContainer;

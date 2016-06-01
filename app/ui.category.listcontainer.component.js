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
const ui_category_listitem_component_1 = require('./ui.category.listitem.component');
const store_service_1 = require('./services/store.service');
let UICategoryListContainer = class UICategoryListContainer {
    constructor(store) {
        this.store = store;
        this._onConfigChanged = this.store.onConfigChange
            .subscribe(config => this.onConfigChange(config));
    }
    onConfigChange(config) {
        console.log(this.categories);
        this.categories = config.getCategories();
        console.log(this.categories);
    }
    ngOnChanges(changes) {
        console.log(changes);
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], UICategoryListContainer.prototype, "categories", void 0);
UICategoryListContainer = __decorate([
    core_1.Component({
        selector: 'ui-category-list-container',
        template: `
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Last Modified</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <span>General Application Settings</span>
        </tr>
        <tr *ngFor="let category of categories">
          <ui-category-list-item [data]="category"></ui-category-list-item>
        </tr>
      </tbody>
    </table>
    `,
        directives: [ui_category_listitem_component_1.UICategoryListItem]
    }),
    __param(0, core_1.Inject(core_1.forwardRef(() => store_service_1.StoreService))), 
    __metadata('design:paramtypes', [store_service_1.StoreService])
], UICategoryListContainer);
exports.UICategoryListContainer = UICategoryListContainer;

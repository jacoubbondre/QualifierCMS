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
const router_deprecated_1 = require('@angular/router-deprecated');
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
    listColorIsAlternate(cat) {
        return this.config.listColorIsAlternate(this.categories, cat);
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
      <div class="table-head table-row">
          <div class="table-column table-title">Title</div>
          <div class="table-column table-title">Last Modified</div>
      </div>

      <div class="table-body" dnd-sortable-container [sortableData]="categories" [dropZones]="['brand']">
          <div class="table-row odd">
            <div class="table-column">
              <div class="icon folder"><i class="material-icons folder-icon">folder</i></div>
              <div class="title"><p>General Application Settings</p></div>
            </div>
            <div class="table-column">
                <div class="date"><p>Date</p></div>
            </div>
          </div>

          <div class="table-row" *ngFor="let category of categories; let i = index" [sortableIndex]="i" dnd-sortable (onDragSuccess)="onCategoryReorder()">

              <div class="table-column-wrapper category {{listColorIsAlternate(category) ? 'odd':'even'}}">
                  <div class="table-column">
                      <div class="icon"><i class="material-icons move-icon">menu</i></div>
                      <div class="icon folder-icon-wrapper"><div><i class="material-icons folder-icon">folder</i></div></div>
                      <div class="title"><p>{{category.category}}</p></div>
                      <div class="icon"><i class="material-icons hide-icon {{hidden ? 'hidden' : ''}}" (click)="hidden ? show() : hide()">visibility</i></div>
                      <a href="#" [routerLink]="['/EditCategory', {category: category.category}]">
                        <div class="icon"><i class="material-icons edit-icon">edit</i></div>
                      </a>
                  </div>

                  <div class="table-column">
                      <div class="date"><p>Date</p></div>
                  </div>
              </div>

              <div *ngIf="!!category.subcategories && category.subcategories.length" dnd-sortable-container [sortableData]="category.subcategories" [dropZones]="['test']">
                <div class="table-row" *ngFor="let subcategory of category.subcategories; let i = index" [sortableIndex]="i" dnd-sortable (onDragSuccess)="onSubcategoryReorder()">

                    <div class="table-column-wrapper subcategory {{listColorIsAlternate(subcategory) ? 'odd':'even'}}">
                        <div class="table-column">
                            <div class="icon"><i class="material-icons move-icon">menu</i></div>
                            <div class="icon folder"><i class="material-icons folder-icon">folder</i></div>
                            <div class="title category"><p>{{subcategory.category}}</p></div>
                            <a href="#" [routerLink]="['/EditCategory', {category: category.subcategories[i].category}]">
                              <div class="icon"><i class="material-icons edit-icon">edit</i></div>
                            </a>
                        </div>

                        <div class="table-column">
                            <div class="date"><p>Date</p></div>
                        </div>
                    </div>

                </div>
              </div>
          </div>
      </div>
    `,
        directives: [ui_brand_listitem_component_1.UIBrandListItem, ng2_dnd_1.DND_DIRECTIVES, router_deprecated_1.ROUTER_DIRECTIVES]
    }), 
    __metadata('design:paramtypes', [store_service_1.StoreService])
], UIBrandListContainer);
exports.UIBrandListContainer = UIBrandListContainer;

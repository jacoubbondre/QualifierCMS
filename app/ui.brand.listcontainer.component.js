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
const ng2_dnd_1 = require('ng2-dnd/ng2-dnd');
let UIBrandListContainer = class UIBrandListContainer {
    constructor(store) {
        this.store = store;
        this.categories = [];
        this._onConfigChanged = this.store.onConfigChange
            .subscribe(config => this.onConfigChange(config));
    }
    ngOnInit() {
        this.onConfigChange(this.store.getConfig(undefined));
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
        console.log(config);
        this.config = config;
        this.categories = config.getCategories();
        setTimeout(function () { $('.tooltipped').tooltip({ delay: 50 }); }, 500);
    }
};
UIBrandListContainer = __decorate([
    core_1.Component({
        selector: 'ui-brand-list-container',
        template: `
      <div class="table-head table-row">
          <div class="table-column table-title"><p>Title</p></div>
          <div class="table-column table-title"><p>Last Modified</p></div>
      </div>

      <div class="table-body" dnd-sortable-container [sortableData]="categories" [dropZones]="['brand']">
          <div class="table-row odd">
            <div class="table-column">
              <div class="icon folder-icon-wrapper"><div><i class="material-icons folder-icon">folder</i></div></div>
              <div class="title"><p>General Application Settings</p></div>

              <div class="icon-action-wrapper">
                  <a class="waves-effect tooltipped" href="#" [routerLink]="['/EditSettings']" data-position="left" data-delay="50" data-tooltip="edit">
                    <div class="icon"><i class="material-icons edit-icon">edit</i></div>
                  </a>
              </div>
            </div>
            <div class="table-column">
                <div class="date"><p>Date</p></div>
            </div>
          </div>

          <div class="table-row" *ngFor="let category of categories; let i = index" [sortableIndex]="i" dnd-sortable (onDragSuccess)="onCategoryReorder()">

              <div class="table-column-wrapper category {{listColorIsAlternate(category) ? 'odd':'even'}}">
                  <div class="table-column">
                      <div class="icon"><i class="material-icons move-icon">reorder</i></div>
                      <div class="icon folder-icon-wrapper"><div><i class="material-icons folder-icon">folder</i></div></div>
                      <div class="title"><p>{{category.category}}</p></div>

                      <div class="icon-action-wrapper">
                          <a class="waves-effect tooltipped" href="#" data-position="left" data-delay="50" [attr.data-tooltip]="hidden ? 'show':'hide'">
                              <div class="icon"><i class="material-icons hide-icon {{hidden ? 'hidden' : ''}}" (click)="hidden ? show() : hide()">visibility</i></div>
                          </a>
                          <a class="waves-effect tooltipped" href="#" [routerLink]="['/EditCategory', {category: category.category}]"  data-position="left" data-delay="50" data-tooltip="edit">
                            <div class="icon"><i class="material-icons edit-icon">edit</i></div>
                          </a>
                      </div>
                  </div>

                  <div class="table-column">
                      <div class="date"><p>Date</p></div>
                  </div>
              </div>

              <div *ngIf="!!category.subcategories && category.subcategories.length" dnd-sortable-container [sortableData]="category.subcategories" [dropZones]="['test']">
                <div class="table-row" *ngFor="let subcategory of category.subcategories; let i = index" [sortableIndex]="i" dnd-sortable (onDragSuccess)="onSubcategoryReorder()">

                    <div class="table-column-wrapper subcategory {{listColorIsAlternate(subcategory) ? 'odd':'even'}}">
                        <div class="table-column">
                            <div class="icon"><i class="material-icons move-icon">reorder</i></div>
                            <div class="icon folder-icon-wrapper"><div><i class="material-icons folder-icon">folder</i></div></div>
                            <div class="title category"><p>{{subcategory.category}}</p></div>

                            <div class="icon-action-wrapper">
                                <a class="waves-effect waves-dark tooltipped" href="#" [routerLink]="['/EditCategory', {category: category.subcategories[i].category}]" data-position="left" data-delay="50" data-tooltip="edit">
                                  <div class="icon"><i class="material-icons edit-icon">edit</i></div>
                                </a>
                            </div>
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
        directives: [ng2_dnd_1.DND_DIRECTIVES, router_deprecated_1.ROUTER_DIRECTIVES]
    }), 
    __metadata('design:paramtypes', [store_service_1.StoreService])
], UIBrandListContainer);
exports.UIBrandListContainer = UIBrandListContainer;

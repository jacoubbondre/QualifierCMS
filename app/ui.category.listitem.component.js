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
const router_deprecated_1 = require('@angular/router-deprecated');
let UICategoryListItem = class UICategoryListItem {
    constructor(router) {
        this.router = router;
        this.movable = true;
    }
    ngAfterViewInit() {
        Materialize.updateTextFields();
    }
    ngOnChanges(changes) {
        console.log(changes.data.currentValue);
    }
    navigateToCategory(category) {
        console.log(category);
        this.router.navigate(['Category', { category: category }]);
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], UICategoryListItem.prototype, "data", void 0);
UICategoryListItem = __decorate([
    core_1.Component({
        selector: 'ui-category-list-item',
        template: `
      <i class="material-icons move-icon" *ngIf="movable">menu</i>
      <div>{{data.category}}</div>

      <div class="title" *ngIf="!!data.titles && data.titles.length">
        <div *ngFor="let title of data.titles">
          <i class="material-icons move-icon" *ngIf="movable">menu</i>
          <div>{{title}}</div>
        </div>
      </div>

      <div class="subcategory" *ngIf="!!data.subcategories && data.subcategories.length">
        <div *ngFor="let subcategory of data.subcategories; let i = index">
          <a href="#" (click)="navigateToCategory(data.subcategories[i].category)">
            <div>
              <i class="material-icons move-icon" *ngIf="movable">menu</i>
              <div class="category">{{subcategory.category}}</div>
            </div>
          </a>
        </div>
      </div>
    `,
        directives: [router_deprecated_1.ROUTER_DIRECTIVES]
    }),
    __param(0, core_1.Inject(core_1.forwardRef(() => router_deprecated_1.Router))), 
    __metadata('design:paramtypes', [router_deprecated_1.Router])
], UICategoryListItem);
exports.UICategoryListItem = UICategoryListItem;

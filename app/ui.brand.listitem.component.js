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
const router_deprecated_1 = require('@angular/router-deprecated');
const ng2_dnd_1 = require('ng2-dnd/ng2-dnd');
let UIBrandListItem = class UIBrandListItem {
    constructor(router) {
        this.router = router;
        this.onOrderChange = new core_1.EventEmitter();
        this.movable = true;
        this.editable = true;
        this.hideable = true;
        this.hidden = false;
    }
    hide() {
        this.hidden = true;
    }
    show() {
        this.hidden = false;
    }
    ngAfterViewInit() {
        Materialize.updateTextFields();
    }
    onDragSuccess() {
        this.onOrderChange.emit(undefined);
    }
    navigateToCategory(category) {
        console.log(category);
        this.router.navigate(['Category', { category: category }]);
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], UIBrandListItem.prototype, "data", void 0);
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], UIBrandListItem.prototype, "onOrderChange", void 0);
UIBrandListItem = __decorate([
    core_1.Component({
        selector: 'ui-brand-list-item',
        template: `
      <div class="category-container">
        <div class="icon"><i class="material-icons move-icon" *ngIf="movable">menu</i></div>
        <div class="title">{{data.category}}</div>
        <div class="icon"><i class="material-icons hide-icon {{hidden ? 'hidden' : ''}}" *ngIf="hideable" (click)="hidden ? show() : hide()">visibility</i></div>
        <a href="#" [routerLink]="['/EditCategory', {category: data.category}]">
          <div class="icon"><i class="material-icons edit-icon" *ngIf="editable">edit</i></div>
        </a>
      </div>

      <div class="subcategory" *ngIf="!!data.subcategories && data.subcategories.length" dnd-sortable-container [sortableData]="data.subcategories" [dropZones]="['test']">
        <div class="category-container" *ngFor="let subcategory of data.subcategories; let i = index" [sortableIndex]="i" dnd-sortable (onDragSuccess)="onDragSuccess()">
              <div class="icon"><i class="material-icons move-icon" *ngIf="movable">menu</i></div>
              <div class="title category">{{subcategory.category}}</div>
              <a href="#" [routerLink]="['/EditCategory', {category: data.subcategories[i].category}]">
                <div class="icon"><i class="material-icons edit-icon" *ngIf="editable">edit</i></div>
              </a>
        </div>
      </div>
    `,
        directives: [router_deprecated_1.ROUTER_DIRECTIVES, ng2_dnd_1.DND_DIRECTIVES]
    }), 
    __metadata('design:paramtypes', [router_deprecated_1.Router])
], UIBrandListItem);
exports.UIBrandListItem = UIBrandListItem;

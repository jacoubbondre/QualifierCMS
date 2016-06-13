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
const ui_category_listitem_component_1 = require('./ui.category.listitem.component');
const ng2_dnd_1 = require('ng2-dnd/ng2-dnd');
let UICategoryListContainer = class UICategoryListContainer {
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], UICategoryListContainer.prototype, "questions", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], UICategoryListContainer.prototype, "category", void 0);
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
      <tbody dnd-sortable-container [sortableData]="questions">
        <tr *ngFor="let question of questions; let i = index" [sortableIndex]="i" dnd-sortable>
          <ui-category-list-item [title]="question" [category]="category"></ui-category-list-item>
        </tr>
      </tbody>
    </table>
    `,
        directives: [ui_category_listitem_component_1.UICategoryListItem, ng2_dnd_1.DND_DIRECTIVES]
    }), 
    __metadata('design:paramtypes', [])
], UICategoryListContainer);
exports.UICategoryListContainer = UICategoryListContainer;

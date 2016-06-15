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
let UICategoryListContainer = class UICategoryListContainer {
    constructor(store) {
        this.store = store;
        this.questions = [];
        this._onConfigChanged = this.store.onConfigChange
            .subscribe(config => this.onConfigChange(config));
        this.config = this.store.getConfig(undefined);
    }
    onQuestionReorder() {
    }
    ngOnChanges(changes) {
        console.log(changes);
    }
    onConfigChange(config) {
        this.config = config;
        this.questions = config.getQuestions();
    }
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
    <a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></a>
    <div class="table-head table-row">
        <div class="table-column table-title"><p>Question</p></div>
        <div class="table-column table-title"><p>Type</p></div>
        <div class="table-column table-title"><p>Feature Group</p></div>
        <div class="table-column table-title"><p>Last Modified</p></div>
    </div>
    <div class="table-body" dnd-sortable-container [sortableData]="questions" [dropZones]="['brand']">

          <div class="table-row" *ngFor="let question of questions; let i = index; let o = odd" [sortableIndex]="i" dnd-sortable (onDragSuccess)="onQuestionReorder()">

              <div class="table-column-wrapper question {{o ? 'odd':'even'}}">
                  <div class="table-column">
                      <div class="icon"><i class="material-icons move-icon">reorder</i></div>
                      <div class="icon folder-icon-wrapper"><div><i class="material-icons folder-icon">description</i></div></div>
                      <div class="title truncate"><p class="truncate">{{question.question}}</p></div>
                  </div>

                  <div class="table-column">
                    <div class="type"><p>{{question.type}}</p></div>
                  </div>

                  <div class="table-column">
                    <div class="type"><p>{{question.feature}}</p></div>

                    <div class="icon-action-wrapper">
                          <a class="waves-effect" href="#">
                              <div class="icon"><i class="material-icons hide-icon {{hidden ? 'hidden' : ''}}" (click)="hidden ? show() : hide()">visibility</i></div>
                          </a>
                          <a class="waves-effect" href="#">
                            <div class="icon"><i class="material-icons delete-icon">delete</i></div>
                          </a>
                          <a class="waves-effect" href="#" [routerLink]="['/EditQuestion', {category: category, question: question}]">
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
    `,
        directives: [ng2_dnd_1.DND_DIRECTIVES, router_deprecated_1.ROUTER_DIRECTIVES]
    }), 
    __metadata('design:paramtypes', [store_service_1.StoreService])
], UICategoryListContainer);
exports.UICategoryListContainer = UICategoryListContainer;

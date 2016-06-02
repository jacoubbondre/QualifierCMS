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
let UIQuestionListContainer = class UIQuestionListContainer {
    constructor(store) {
        this.store = store;
    }
    save() {
        console.log(this.data);
        var config = this.store.getConfig(undefined);
        config.setQuestionByCategoryName(this.category, this.question, this.data);
        this.store.saveConfig();
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], UIQuestionListContainer.prototype, "data", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], UIQuestionListContainer.prototype, "question", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], UIQuestionListContainer.prototype, "category", void 0);
UIQuestionListContainer = __decorate([
    core_1.Component({
        selector: 'ui-question-list-container',
        template: `
  <div class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s6" *ngIf="!!data.text[0].question">
          <textarea id="question" class="materialize-textarea" [(ngModel)]="data.text[0].question"></textarea>
          <label for="question">Question</label>
        </div>
        <div *ngIf="!!data.text[0].sub_question" class="input-field col s6">
          <textarea id="subQuestion" class="materialize-textarea" [(ngModel)]="data.text[0].sub_question"></textarea>
          <label for="subQuestion">Sub-Question</label>
        </div>
      </div>
      <div class="row" *ngIf="!!data.text[0].explanation_title">
        <div class="input-field col s6">
          <textarea id="explain_title" type="text" class="materialize-textarea" [(ngModel)]="data.text[0].explanation_title"></textarea>
          <label for="explain_title">Why are you asking title</label>
        </div>
        <div class="input-field col s6" *ngIf="!!data.text[0].explanation">
          <textarea id="explain_ans" class="materialize-textarea" [(ngModel)]="data.text[0].explanation"></textarea>
          <label for="explain_ans">Why are you asking explanation</label>
        </div>
      </div>
      <!--<div class="row">
            <div class="input-field col s12">
    <select>
      <option value="" disabled selected>Choose your category</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </select>
    <label>What question category does this question score against?</label>
  </div>
      </div>-->
      <div class="row">
        <a (click)="save()" class="waves-effect waves-light btn-large" type="submit" name="action"><i class="material-icons left">save</i>commit changes</a>
        <a class="waves-effect waves-light btn-large"><i class="material-icons left">reply</i>revert changes</a>
      </div>
    </form>
  </div>
    `
    }), 
    __metadata('design:paramtypes', [store_service_1.StoreService])
], UIQuestionListContainer);
exports.UIQuestionListContainer = UIQuestionListContainer;

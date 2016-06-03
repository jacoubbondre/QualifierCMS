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
const ui_question_listcontainer_component_1 = require('./ui.question.listcontainer.component');
const store_service_1 = require('./services/store.service');
const router_deprecated_1 = require('@angular/router-deprecated');
const i18n_pipe_1 = require('./pipes/i18n.pipe');
let QuestionEdit = class QuestionEdit {
    constructor(store, params) {
        this.store = store;
        this.params = params;
        this._onConfigChanged = this.store.onConfigChange
            .subscribe(config => this.onConfigChange(config));
        this.category = params.get('category');
        this.question = params.get('question');
    }
    ngOnInit() {
        this.onConfigChange(this.store.getConfig(undefined));
    }
    onConfigChange(config) {
        this.brand = config.getBrand();
        this.questionData = config.getQuestionByCategoryName(this.category, this.question);
        console.log(this.questionData);
    }
};
QuestionEdit = __decorate([
    core_1.Component({
        selector: 'question-edit',
        template: `
    <div class="row list-header">
      <h4>{{brand}} - {{'brand' | translate}} - {{category}} - {{question}}</h4>
      <span>{{'Please enter the required information.' | translate}}</span>
    </div>
    <ui-question-list-container [data]="questionData" [category]="category" [question]="questions"></ui-question-list-container>
    `,
        directives: [ui_question_listcontainer_component_1.UIQuestionListContainer],
        pipes: [i18n_pipe_1.InternationalizationPipe]
    }), 
    __metadata('design:paramtypes', [store_service_1.StoreService, router_deprecated_1.RouteParams])
], QuestionEdit);
exports.QuestionEdit = QuestionEdit;

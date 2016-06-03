import {Component, Input, Inject} from '@angular/core'
import {UIQuestionListContainer} from './ui.question.listcontainer.component'
import {StoreService} from './services/store.service'
import {RouteParams} from '@angular/router-deprecated'
import {InternationalizationPipe} from './pipes/i18n.pipe'

declare var Materialize;

@Component({
  selector: 'question-edit',
  template: `
    <div class="row list-header">
      <h4>{{brand}} - {{'brand' | translate}} - {{category}} - {{question}}</h4>
      <span>{{'Please enter the required information.' | translate}}</span>
    </div>
    <ui-question-list-container [data]="questionData" [category]="category" [question]="questions"></ui-question-list-container>
    `,
  directives: [UIQuestionListContainer],
  pipes: [InternationalizationPipe]
})
export class QuestionEdit {
  private _onConfigChanged: any
  private brand: string
  private category: string
  private question: string
  private questionData: any

  constructor( private store: StoreService, private params: RouteParams) {
    this._onConfigChanged = this.store.onConfigChange
      .subscribe(config => this.onConfigChange(config))

    this.category = params.get('category')
    this.question = params.get('question')
  }

  ngOnInit() {
    this.onConfigChange(this.store.getConfig(undefined))
  }

  onConfigChange(config) {
    this.brand = config.getBrand()
    this.questionData = config.getQuestionByCategoryName(this.category, this.question)
    console.log(this.questionData)
  }
}
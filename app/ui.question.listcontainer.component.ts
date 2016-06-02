import {Component, Input, Inject} from '@angular/core'
import { NgForm }    from '@angular/common'
import {StoreService} from './services/store.service'

declare var Materialize

@Component({
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
})
export class UIQuestionListContainer {
  private _onConfigChanged: any
  @Input() data
  @Input() question
  @Input() category
  private config

  constructor(private store:StoreService) {}

  save() {
    console.log(this.data)
    var config = this.store.getConfig(undefined)
    config.setQuestionByCategoryName(this.category, this.question, this.data)
    this.store.saveConfig()
  }
}
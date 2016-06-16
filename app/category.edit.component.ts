import {Component, Input, Inject} from '@angular/core'
import {UICategoryListContainer} from './ui.category.listcontainer.component'
import {StoreService} from './services/store.service'
import {RouteParams} from '@angular/router-deprecated'

declare var Materialize;

@Component({
  selector: 'category-edit',
  template: `
    <div class="row list-header">
      <h4>{{brand}} - brand - {{category}}</h4>
      <span>What would you like to edit?</span>
    </div>
    <ui-category-list-container [questions]="questions" [category]="category"></ui-category-list-container>
    `,
    directives: [UICategoryListContainer],
})
export class CategoryEdit {
  private _onConfigChanged: any
  private questions: string
  private category: string
  private brand: string

  constructor( private store: StoreService, private params: RouteParams) {
    this._onConfigChanged = this.store.onConfigChange
      .subscribe(config => this.onConfigChange(config))

    this.category = this.params.get('category')
  }

  ngOnInit() {
    this.onConfigChange(this.store.getConfig(undefined))
  }

  onConfigChange(config) {
    if (config) {
      this.questions = config.getQuestionsByCategory(this.category)
      this.brand = config.getBrand()
    }
  }
}
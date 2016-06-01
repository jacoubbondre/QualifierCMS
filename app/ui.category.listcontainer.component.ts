import {Component, Input, Inject, forwardRef} from '@angular/core'
import {UICategoryListItem} from './ui.category.listitem.component'
import {StoreService} from './services/store.service'

declare var Materialize

@Component({
  selector: 'ui-category-list-container',
  template: `
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Last Modified</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <span>General Application Settings</span>
        </tr>
        <tr *ngFor="let category of categories">
          <ui-category-list-item [data]="category"></ui-category-list-item>
        </tr>
      </tbody>
    </table>
    `,
  directives: [UICategoryListItem]
})
export class UICategoryListContainer {
  private _onConfigChanged: any
  @Input() categories

  constructor( @Inject(forwardRef(() => StoreService)) private store: StoreService) {
    this._onConfigChanged = this.store.onConfigChange
      .subscribe(config => this.onConfigChange(config))
  }

  onConfigChange(config) {
    console.log(this.categories)
    this.categories = config.getCategories()

    console.log(this.categories)
  }

  ngOnChanges(changes) {
    console.log(changes)
  }
}
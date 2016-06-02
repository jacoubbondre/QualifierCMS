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
        <tr *ngFor="let question of questions">
          <ui-category-list-item [title]="question" [category]="category"></ui-category-list-item>
        </tr>
      </tbody>
    </table>
    `,
  directives: [UICategoryListItem]
})
export class UICategoryListContainer {
  private _onConfigChanged: any
  @Input() questions
  @Input() category
}
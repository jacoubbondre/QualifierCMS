import {Component, Input, Inject, forwardRef} from '@angular/core'
import {UICategoryListItem} from './ui.category.listitem.component'
import {StoreService} from './services/store.service'
import {DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd'

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
      <tbody dnd-sortable-container [sortableData]="questions">
        <tr *ngFor="let question of questions; let i = index" [sortableIndex]="i" dnd-sortable>
          <ui-category-list-item [title]="question" [category]="category"></ui-category-list-item>
        </tr>
      </tbody>
    </table>
    `,
  directives: [UICategoryListItem, DND_DIRECTIVES]
})
export class UICategoryListContainer {
  private _onConfigChanged: any
  @Input() questions
  @Input() category
}
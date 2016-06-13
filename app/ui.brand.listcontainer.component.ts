import {Component, Input, Inject, forwardRef} from '@angular/core'
import {UIBrandListItem} from './ui.brand.listitem.component'
import {StoreService} from './services/store.service'
import {DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd'

declare var Materialize

@Component({
  selector: 'ui-brand-list-container',
  template: `
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Last Modified</th>
        </tr>
      </thead>
      <tbody dnd-sortable-container [sortableData]="categories" [dropZones]="['brand']">
        <tr>
          <div class="category-container">
            <span>General Application Settings</span>
          </div>
        </tr>
        <tr *ngFor="let category of categories; let i = index" [sortableIndex]="i" dnd-sortable (onDragSuccess)="onCategoryReorder()">
          <ui-brand-list-item [data]="category" (onOrderChange)="onSubcategoryReorder()"></ui-brand-list-item>
        </tr>
      </tbody>
    </table>
    `,
  directives: [UIBrandListItem, DND_DIRECTIVES]
})
export class UIBrandListContainer {
  private _onConfigChanged: any
  private config
  private categories

  constructor(private store: StoreService) {
    this.categories = []
    this._onConfigChanged = this.store.onConfigChange
      .subscribe(config => this.onConfigChange(config))
  }

  onCategoryReorder() {
    this.config.setCategories(this.categories)
    this.store.saveConfig()
  }

  onSubcategoryReorder() {
    this.config.setCategories(this.categories)
    this.store.saveConfig()
  }

  onConfigChange(config) {
    this.config = config
    this.categories = config.getCategories()
    console.log(this.categories)
  }
}
import {Component, Input, Inject, forwardRef} from '@angular/core'
import {UIBrandListItem} from './ui.brand.listitem.component'
import {StoreService} from './services/store.service'

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
      <tbody>
        <tr>
          <div class="category-container">
            <span>General Application Settings</span>
          </div>
        </tr>
        <tr *ngFor="let category of categories">
          <ui-brand-list-item [data]="category"></ui-brand-list-item>
        </tr>
      </tbody>
    </table>
    `,
  directives: [UIBrandListItem]
})
export class UIBrandListContainer {
  private _onConfigChanged: any
  @Input() categories

  constructor(private store: StoreService) {
    this._onConfigChanged = this.store.onConfigChange
      .subscribe(config => this.onConfigChange(config))
  }

  onConfigChange(config) {
    this.categories = config.getCategories()
    console.log(this.categories)
  }
}
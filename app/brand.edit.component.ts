import {Component, Input, Inject} from '@angular/core'
import {UICategoryListContainer} from './ui.category.listcontainer.component'
import {StoreService} from './services/store.service'

declare var Materialize;

@Component({
  selector: 'brand-edit',
  template: `
    <div class="row">
      <h4>{{brand}} - brand</h4>
      <span>What would you like to edit?</span>
    </div>
    <ui-category-list-container></ui-category-list-container>
    `,
  directives: [UICategoryListContainer]
})
export class BrandEdit {
  private _onConfigChanged: any
  private brand: string

  constructor( @Inject(StoreService) private store: StoreService) {
    this._onConfigChanged = this.store.onConfigChange
      .subscribe(config => this.onConfigChange(config))
  }

  onConfigChange(config) {
    this.brand = config.getBrand()
  }
}
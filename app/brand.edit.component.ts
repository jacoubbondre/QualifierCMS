import {Component, Input, Inject} from '@angular/core'
import {UIBrandListContainer} from './ui.brand.listcontainer.component'
import {StoreService} from './services/store.service'
import {InternationalizationPipe} from './pipes/i18n.pipe'

declare var Materialize;

@Component({
  selector: 'brand-edit',
  template: `
    <div class="row list-header">
      <h4>{{brand}} - {{'brand' | translate}}</h4>
      <span>{{'What would you like to edit?' | translate}}</span>
    </div>
    <ui-brand-list-container></ui-brand-list-container>
    `,
  directives: [UIBrandListContainer],
  pipes: [InternationalizationPipe]
})
export class BrandEdit {
  private _onConfigChanged: any
  private brand: string

  constructor(private store: StoreService) {
    this._onConfigChanged = this.store.onConfigChange
      .subscribe(config => this.onConfigChange(config))
  }

  ngOnInit() {
    this.onConfigChange(this.store.getConfig(undefined))
  }

  onConfigChange(config) {
    if (config) this.brand = config.getBrand()
  }
}
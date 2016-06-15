import {Component, Input, Inject} from '@angular/core'
import {UIAppSettings} from './ui.app-settings.component'
import {StoreService} from './services/store.service'
import {RouteParams} from '@angular/router-deprecated'
import {InternationalizationPipe} from './pipes/i18n.pipe'

declare var Materialize;

@Component({
  selector: 'settings-edit',
  template: `
    <div class="row list-header">
      <h4>{{brand}} - {{'brand' | translate}} - General Application Settings</h4>
      <span>{{'What would you like to edit?' | translate}}</span>
    </div>
    <ui-app-settings [settings]="settings"></ui-app-settings>
    `,
    directives: [UIAppSettings],
    pipes: [InternationalizationPipe]
})
export class SettingsEdit {
  private _onConfigChanged: any
  private settings: any
  private brand: string

  constructor( private store: StoreService, private params: RouteParams) {
    this.settings = []
    this._onConfigChanged = this.store.onConfigChange
      .subscribe(config => this.onConfigChange(config))
  }

  ngOnInit() {
    this.onConfigChange(this.store.getConfig(undefined))
  }

  onConfigChange(config) {
    if (config) {
      this.settings = config.getAppText()
      this.brand = config.getBrand()
    }
  }
}
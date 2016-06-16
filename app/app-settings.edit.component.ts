import {Component, Input, Inject} from '@angular/core'
import {UIAppSettings} from './ui.app-settings.component'
import {StoreService} from './services/store.service'
import {RouteParams} from '@angular/router-deprecated'
import {InternationalizationPipe} from './pipes/i18n.pipe'
import * as _ from 'lodash'

declare var Materialize;

@Component({
  selector: 'settings-edit',
  template: `
    <div class="row list-header">
      <h4>{{brand}} - {{'brand' | translate}} - General Application Settings</h4>
      <span>{{'What would you like to edit?' | translate}}</span>
    </div>
    <ui-app-settings [settings]="settings" [dirty]="dirty" (isDirty)="gotDirty()"></ui-app-settings>
    <div class="row list-footer">
      <a class="btn-large {{dirty ? '' : 'disabled waves-effect waves-light'}}" (click)="onCommit()"><i class="material-icons left">arrow_downward</i>commit changes</a>
      <a class="btn-large {{dirty ? '' : 'disabled waves-effect waves-light'}}" (click)="onRevert()"><i class="material-icons left">undo</i>revert changes</a>
    </div>
    `,
    directives: [UIAppSettings],
    pipes: [InternationalizationPipe]
})
export class SettingsEdit {
  private config
  private _onConfigChanged: any
  private settings: any
  private cleanSettings: any
  private dirty:boolean
  private brand: string

  constructor( private store: StoreService, private params: RouteParams) {
    this.dirty = false
    this.settings = []
    this.cleanSettings = []
    this._onConfigChanged = this.store.onConfigChange
      .subscribe(config => this.onConfigChange(config))
    this.config = this.store.getConfig(undefined)
  }

  ngOnInit() {
    this.onConfigChange(this.store.getConfig(undefined))
  }

  onCommit() {
    if (this.dirty) {
      console.log(this.settings)
      this.config.setAppText(this.settings)
      this.store.saveConfig()
    }
  }

  onRevert() {
    if (this.dirty) {
      this.settings = _.map(this.cleanSettings, _.clone)
      this.dirty = false
    }
  }

  gotDirty() {
    this.dirty = true
  }

  onConfigChange(config) {
    if (config) {
      this.config = config
      this.cleanSettings = config.getAppText()
      this.settings = _.map(this.cleanSettings, _.clone)
      this.brand = config.getBrand()
      this.dirty = false
    }
  }
}
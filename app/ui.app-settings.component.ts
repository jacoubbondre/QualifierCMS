import {Component, Input, Inject, Pipe, PipeTransform, Injectable, Output, EventEmitter} from '@angular/core'
import {EditableSettingsPipe} from './pipes/settingsFilter.pipe'
import {DisplayNameTranslator} from './settings'

declare var Materialize

@Component({
  selector: 'ui-app-settings',
  template: `
    <form class="col s12">
      <div *ngFor="let setting of settings | editableSettings">
          <div class="row">
            <div class="input-field col s10 offset-s1 l6 offset-l3">
              <input id="{{setting.name}}" (ngModelChange)="setAsDirty()" [(ngModel)]="setting.value" type="text">
              <label class="active" [attr.data-for]="setting.name">{{displayName.getApplicationSetting(setting.name)}}</label>
            </div>
          </div>
      </div>
    </form>
    `,
  pipes: [EditableSettingsPipe]
})
export class UIAppSettings {
  private _onConfigChanged: any
  private displayName = new DisplayNameTranslator()
  @Input() settings
  @Input() dirty
  @Output() isDirty = new EventEmitter

  ngAfterViewInit() {
    Materialize.updateTextFields()
  }

  setAsDirty() {
    console.log('dirty')
    this.isDirty.emit(undefined)
  }
}

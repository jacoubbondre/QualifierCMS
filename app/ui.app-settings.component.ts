import {Component, Input, Inject, Pipe, PipeTransform, Injectable} from '@angular/core'
import {SettingsFilterPipe} from './pipes/settingsFilter.pipe'

declare var Materialize

@Component({
  selector: 'ui-app-settings',
  template: `
      <div class="row">
    <form class="col s12">

      <div class="row" *ngFor="let setting of settings | settingsFilter">
        <div class="input-field col s6">
          <input placeholder="{{setting.value}}" id="{{setting.name}}" type="text" class="validate">
          <label [attr.data-for]="setting.name">{{translation.get(setting.name)}}</label>
        </div>
      </div>

    </form>
  </div>
    `,
  pipes: [SettingsFilterPipe]
})
export class UIAppSettings {
  private _onConfigChanged: any
  private translation = new Translator()
  @Input() settings

  ngAfterViewInit() {
    Materialize.updateTextFields()
  }
}

class Translator {
  private translations = {
    "appdescription": "Application description",
    "apptitle": "Application title",
    "backtoresults": "'Back to results'"
  }

  public get(val:string) {
    if (val in this.translations) {
      return this.translations[val]
    }
    return val
  }
}
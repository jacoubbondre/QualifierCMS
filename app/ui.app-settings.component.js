"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const settingsFilter_pipe_1 = require('./pipes/settingsFilter.pipe');
let UIAppSettings = class UIAppSettings {
    constructor() {
        this.translation = new Translator();
    }
    ngAfterViewInit() {
        Materialize.updateTextFields();
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], UIAppSettings.prototype, "settings", void 0);
UIAppSettings = __decorate([
    core_1.Component({
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
        pipes: [settingsFilter_pipe_1.SettingsFilterPipe]
    }), 
    __metadata('design:paramtypes', [])
], UIAppSettings);
exports.UIAppSettings = UIAppSettings;
class Translator {
    constructor() {
        this.translations = {
            "appdescription": "Application description",
            "apptitle": "Application title",
            "backtoresults": "'Back to results'"
        };
    }
    get(val) {
        if (val in this.translations) {
            return this.translations[val];
        }
        return val;
    }
}

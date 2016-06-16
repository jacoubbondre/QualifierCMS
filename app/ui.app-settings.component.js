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
const settings_1 = require('./settings');
let UIAppSettings = class UIAppSettings {
    constructor() {
        this.displayName = new settings_1.DisplayNameTranslator();
        this.isDirty = new core_1.EventEmitter;
    }
    ngAfterViewInit() {
        Materialize.updateTextFields();
    }
    setAsDirty() {
        console.log('dirty');
        this.isDirty.emit(undefined);
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], UIAppSettings.prototype, "settings", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], UIAppSettings.prototype, "dirty", void 0);
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], UIAppSettings.prototype, "isDirty", void 0);
UIAppSettings = __decorate([
    core_1.Component({
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
        pipes: [settingsFilter_pipe_1.EditableSettingsPipe]
    }), 
    __metadata('design:paramtypes', [])
], UIAppSettings);
exports.UIAppSettings = UIAppSettings;

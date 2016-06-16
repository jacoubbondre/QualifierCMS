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
const ui_app_settings_component_1 = require('./ui.app-settings.component');
const store_service_1 = require('./services/store.service');
const router_deprecated_1 = require('@angular/router-deprecated');
const i18n_pipe_1 = require('./pipes/i18n.pipe');
const _ = require('lodash');
let SettingsEdit = class SettingsEdit {
    constructor(store, params) {
        this.store = store;
        this.params = params;
        this.dirty = false;
        this.settings = [];
        this.cleanSettings = [];
        this._onConfigChanged = this.store.onConfigChange
            .subscribe(config => this.onConfigChange(config));
        this.onConfigChange(this.store.getConfig(undefined));
    }
    onCommit() {
        if (this.dirty) {
            console.log(this.settings);
            this.config.setAppText(this.settings);
            this.store.saveConfig();
        }
    }
    onRevert() {
        if (this.dirty) {
            this.settings = _.map(this.cleanSettings, _.clone);
            this.dirty = false;
        }
    }
    gotDirty() {
        this.dirty = true;
    }
    onConfigChange(config) {
        if (config) {
            this.config = config;
            this.cleanSettings = config.getAppText();
            this.settings = _.map(this.cleanSettings, _.clone);
            this.brand = config.getBrand();
            this.dirty = false;
        }
    }
};
SettingsEdit = __decorate([
    core_1.Component({
        selector: 'settings-edit',
        template: `
    <div class="row list-header">
      <h4>{{brand}} - {{'brand' | translate}} - General Application Settings</h4>
      <span>{{'What would you like to edit?' | translate}}</span>
    </div>
    <ui-app-settings [settings]="settings" [dirty]="dirty" (isDirty)="gotDirty()"></ui-app-settings>
    <div class="row list-footer">
      <a class="btn-large {{dirty ? 'waves-effect waves-light' : 'disabled'}}" (click)="onCommit()"><i class="material-icons left">arrow_downward</i>commit changes</a>
      <a class="btn-large {{dirty ? 'waves-effect waves-light' : 'disabled'}}" (click)="onRevert()"><i class="material-icons left">undo</i>revert changes</a>
    </div>
    `,
        directives: [ui_app_settings_component_1.UIAppSettings],
        pipes: [i18n_pipe_1.InternationalizationPipe]
    }), 
    __metadata('design:paramtypes', [store_service_1.StoreService, router_deprecated_1.RouteParams])
], SettingsEdit);
exports.SettingsEdit = SettingsEdit;

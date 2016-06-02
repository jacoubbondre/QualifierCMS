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
const store_service_1 = require('./services/store.service');
const core_1 = require('@angular/core');
let BasicDataModifierComponent = class BasicDataModifierComponent {
    constructor(store) {
        this.store = store;
        this._onDataChanged = this.store.onConfigChange
            .subscribe(data => this.onConfigChange(data));
    }
    onSave() {
        this.store.setConfigData(JSON.parse(this.text));
        this.store.saveConfig();
    }
    onNew() {
        this.store.newConfig();
    }
    onConfigChange(data) {
        this.text = JSON.stringify(data.data, null, 4);
        console.log('set config', data);
        this.id = data.id;
    }
};
BasicDataModifierComponent = __decorate([
    core_1.Component({
        selector: 'basic-data-modifier',
        template: `
    	<form>
			<textarea type="textbox" [(ngModel)]="text"></textarea>
			<button class="submit" (click)="onSave()">Save</button>
			<button class="new" (click)="onNew()">New</button>
		</form>
	`
    }), 
    __metadata('design:paramtypes', [(typeof (_a = typeof store_service_1.StoreService !== 'undefined' && store_service_1.StoreService) === 'function' && _a) || Object])
], BasicDataModifierComponent);
exports.BasicDataModifierComponent = BasicDataModifierComponent;
var _a;

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
let BasicDataListComponent = class BasicDataListComponent {
    constructor(store) {
        this.store = store;
        this.selectedItem = 0;
        this._onConfigsDataChanged = this.store.onConfigsChange
            .subscribe(configs => this.onConfigsChange(configs));
        this._onConfigChanged = this.store.onConfigChange
            .subscribe(config => this.onConfigChange(config));
    }
    onConfigsChange(configs) {
        let tempArr = [];
        for (let i in configs) {
            let temp = configs[i];
            configs[i].id = i;
            tempArr.push(temp);
        }
        this.configs = tempArr;
        this.ids = Object.keys(configs);
    }
    onConfigChange(config) {
        if (this.ids && config.id) {
            let index = this.ids.indexOf(config.id);
            this.selectItem(index, undefined, false);
        }
    }
    selectItem(index, config, propagate) {
        console.log('select', index, config, propagate);
        this.selectedItem = index;
        if (propagate)
            this.store.setConfigById(config.id);
    }
};
BasicDataListComponent = __decorate([
    core_1.Component({
        selector: 'basic-data-list',
        template: `
    	<ul>
    		<li *ngFor="let config of configs; let i = index" class="{{i == selectedItem ? 'selected' : ''}}" (click)="selectItem(i,config,true)">
    			{{config.id}}
    		</li>
    	</ul>
    	<button class="load">Load</button>
	`
    }), 
    __metadata('design:paramtypes', [store_service_1.StoreService])
], BasicDataListComponent);
exports.BasicDataListComponent = BasicDataListComponent;

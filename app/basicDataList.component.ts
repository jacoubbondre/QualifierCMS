import {LoggerService} from './services/logger.service'
import {StoreService} from './services/store.service'
import {Component} from 'angular2/core'
import { NgForm } from 'angular2/common'

@Component({
	selector: 'basic-data-list',
    template: `
    	<ul>
    		<li *ngFor="#config of configs; #i = index" class="{{i == selectedItem ? 'selected' : ''}}" (click)="selectItem(i,config)">
    			{{config.updated}}
    		</li>
    	</ul>
    	<button class="load">Load</button>
	`
})
export class BasicDataListComponent {
	private text
	private configs
	private selectedItem

	constructor(private store: StoreService) {
		this.selectedItem = 0
		this._onConfigsDataChanged = this.store.onConfigsChange
			.subscribe(configs => this.onConfigsChange(configs))
	}

	//inputs
	private _onConfigsDataChanged

	//outputs

	//methods
	onConfigsChange(configs) {
		let tempArr = []

		//normalize data for ngFor
		for (let i in configs) {
			let temp = configs[i]
			configs[i].id = i
			tempArr.push(temp)
		}

		this.configs = tempArr
	}

	selectItem(index, config) {
		this.selectedItem = index
		this.store.setConfigById(config.id)
	}
}
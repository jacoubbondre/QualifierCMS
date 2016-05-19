import {LoggerService} from './services/logger.service'
import {StoreService} from './services/store.service'
import {Component} from 'angular2/core'
import { NgForm } from 'angular2/common'

@Component({
	selector: 'basic-data-list',
    template: `
    	<ul>
    		<li *ngFor="#config of configs; #i = index" class="{{i == selectedItem ? 'selected' : ''}}" (click)="selectItem(i,config,true)">
    			{{config.id}}
    		</li>
    	</ul>
    	<button class="load">Load</button>
	`
})
export class BasicDataListComponent {
	private text
	private configs
	private ids
	private selectedItem

	constructor(private store: StoreService) {
		this.selectedItem = 0
		this._onConfigsDataChanged = this.store.onConfigsChange
			.subscribe(configs => this.onConfigsChange(configs))

		this._onConfigChanged = this.store.onConfigChange
			.subscribe(config => this.onConfigChange(config))
	}

	//inputs
	private _onConfigsDataChanged
	private _onConfigChanged

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
		this.ids = Object.keys(configs)
	}

	onConfigChange(config) {
		if (this.ids && config.id) {
			let index = this.ids.indexOf(config.id)
			this.selectItem(index, undefined, false)
		}
	}

	selectItem(index: number, config: any, propagate: boolean) {
		console.log('select', index, config, propagate)
		this.selectedItem = index
		if (propagate) this.store.setConfigById(config.id)
	}
}
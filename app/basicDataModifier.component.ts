import {LoggerService} from './services/logger.service'
import {StoreService} from './services/store.service'
import {Component} from '@angular/core'
import { NgForm } from '@angular/common'

@Component({
	selector: 'basic-data-modifier',
    template: `
    	<form>
			<textarea type="textbox" [(ngModel)]="text"></textarea>
			<button class="submit" (click)="onSave()">Save</button>
			<button class="new" (click)="onNew()">New</button>
		</form>
	`
})
export class BasicDataModifierComponent {
	private text
	private id

	constructor(private store: StoreService) {
		this._onDataChanged = this.store.onConfigChange
			.subscribe(data => this.onConfigChange(data))
	}

	//inputs
	private _onDataChanged

	//outputs

	//methods
	onSave() {
		this.store.setConfigData(JSON.parse(this.text))
		this.store.saveConfig()
	}

	onNew() {
		this.store.newConfig()
	}

	onConfigChange(data) {
		this.text = JSON.stringify(data.data, null, 4)
		console.log('set config', data)
		this.id = data.id
	}
}
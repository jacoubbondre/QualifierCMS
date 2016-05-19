///<reference path="../node_modules/angular2/typings/browser.d.ts"/>

import {bootstrap}    from 'angular2/platform/browser'
import { Http, Headers, HTTP_PROVIDERS } from 'angular2/http'
import {LoggerService} from './services/logger.service'
import {FirebaseService} from './services/firebase.service'
import {StoreService} from './services/store.service'
import {Component} from 'angular2/core'

import {BasicDataModifierComponent} from './basicDataModifier.component'
import {BasicDataListComponent} from './basicDataList.component'

@Component({
	selector: 'main-app',
	providers: [HTTP_PROVIDERS],
	directives: [BasicDataModifierComponent, BasicDataListComponent],
    template: `
    	<basic-data-list></basic-data-list>
		<basic-data-modifier></basic-data-modifier>
	`
})
class AppComponent {
	constructor(private firebase: FirebaseService, private store: StoreService, private http: Http) {
		
	}

	ngAfterViewInit() {
		this.http.get('http://findmy.maytag.ca/config/maytag-en_CA.json').subscribe(res => {
			this.firebase.saveDefaultConfig(res.json())
		});
	}
 }

bootstrap(AppComponent, [HTTP_PROVIDERS, LoggerService, FirebaseService, StoreService])
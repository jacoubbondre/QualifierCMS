///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap}    from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Logger} from './services/logger.service';
import {GoogleApi} from './services/googleapi.service';
import {Component} from 'angular2/core';

//import {VideoPlayer} from './landing.video-player';

@Component({
	selector: 'main-app',
    template: `
	<!-- Put your HTML HERE -->
	<h1>{{appName}}</h1>
	`,
	directives: []
})
class AppComponent {
    appName:string;
	firebaseUrl: string;
	messagesRef: Firebase;
	
	constructor() {
		this.appName = "Basic Firebase App"
		this.firebaseUrl = "https://luminous-inferno-5792.firebaseio.com/test";
		this.messagesRef = new Firebase(this.firebaseUrl);
		this.messagesRef.set({
			name: 'bob',
			text: 'newString'
		});
	}
 }

bootstrap(AppComponent, [HTTP_PROVIDERS, Logger, GoogleApi])
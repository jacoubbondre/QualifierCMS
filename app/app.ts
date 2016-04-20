///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap}    from 'angular2/platform/browser';
import {HTTP_PROVIDERS, Http } from 'angular2/http';
import {Logger} from './services/logger.service';
import {GoogleApi} from './services/googleapi.service';
import {Component} from 'angular2/core';

//import {VideoPlayer} from './landing.video-player';

@Component({
	selector: 'main-app',
	providers: [HTTP_PROVIDERS],
    template: `
	<!-- Put your HTML HERE -->
	<h1>{{appName}}</h1>
	`,
	directives: []
})
class AppComponent {
	dataSnap:string;
    appName:string;
	firebaseUrl: string;
	messagesRef: Firebase;
	
	constructor(http:Http) {
		http.get('http://findmy.maytag.ca/config/maytag-en_CA.json').subscribe(res => {
			this.dataSnap = res.json();
			console.log("first = : " +  this.dataSnap);
			this.setFire(this.dataSnap);
		});
		
	}
	
	private setFire(d:any){
		this.appName = "Basic Firebase App"
		this.firebaseUrl = "https://luminous-inferno-5792.firebaseio.com/restore";
		this.messagesRef = new Firebase(this.firebaseUrl);
		console.log("second = : " +  d);
		this.messagesRef.push(
			d
		);
	}
 }

bootstrap(AppComponent, [HTTP_PROVIDERS, Logger, GoogleApi])
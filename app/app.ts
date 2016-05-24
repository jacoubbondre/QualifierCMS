///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap}    from 'angular2/platform/browser';
import { Http, Headers, HTTP_PROVIDERS } from 'angular2/http';
import {Logger} from './services/logger.service';
import {GoogleApi} from './services/googleapi.service';
import {Component} from 'angular2/core';

import {SingleAnswerEdit} from './question.edit.single.ans';

@Component({
	selector: 'main-app',
	providers: [HTTP_PROVIDERS],
    template: `
	<!-- Put your HTML HERE -->
	<question-single-answer-edit></question-single-answer-edit>
	`,
	directives: [SingleAnswerEdit]
})
class AppComponent {
	
	/* dataSnap:string;
    appName:string;
	firebaseUrl: string;
	messagesRef: Firebase;
	
	constructor(public http:Http) {
		this.http.get('http://findmy.maytag.ca/config/maytag-en_CA.json').subscribe(res => {
			this.dataSnap = res.json();
			console.log("first = : " +  this.dataSnap);
			this.setFire(this.dataSnap);
		});
	}
	
	private setFire(d:any){
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let tmpStr = 'data=' + (JSON.stringify(d));
		this.http.post('save.php', tmpStr)
		.subscribe(
			res => {
			console.log(res);
			},
			() => console.log('Authentication Complete')
		);
		this.appName = "Basic Firebase App"
		this.firebaseUrl = "https://luminous-inferno-5792.firebaseio.com/restore";
		this.messagesRef = new Firebase(this.firebaseUrl);
		console.log("second = : " +  d);
		this.messagesRef.set(
			d
		);
		
	} */
 }

bootstrap(AppComponent, [HTTP_PROVIDERS, Logger, GoogleApi])
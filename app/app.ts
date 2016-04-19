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
	<h1>Eat it biatch!</h1>
	`,
	directives: []
})
class AppComponent {
    
 }

bootstrap(AppComponent, [HTTP_PROVIDERS, Logger, GoogleApi])
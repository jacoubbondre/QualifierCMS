import {bootstrap} from '@angular/platform-browser-dynamic'
import { Http, Headers, HTTP_PROVIDERS } from '@angular/http'
import {LoggerService} from './services/logger.service'
import {FirebaseService} from './services/firebase.service'
import {StoreService} from './services/store.service'
import {Component, Inject, forwardRef} from '@angular/core'
import { RouteConfig, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated'

import {UINavbar} from './ui.navbar.component'
import {BrandEdit} from './brand.edit.component'
import {CategoryEdit} from './category.edit.component'
import {QuestionEdit} from './question.edit.component'


@Component({
	selector: 'main-app',
	providers: [HTTP_PROVIDERS],
	directives: [UINavbar, ROUTER_DIRECTIVES],
    template: `
    	<ui-navbar></ui-navbar>
    	<router-outlet></router-outlet>
	`
})
@RouteConfig([
	{ path: '/', component: BrandEdit, name: 'Home', useAsDefault: true },
	{ path: '/category/:category', component: BrandEdit, name: 'Category' },
	{ path: '/question/:question', component: QuestionEdit, name: 'Question' }
])
class AppComponent {
	private _onConfigChanged

	constructor(
		@Inject(forwardRef(() => FirebaseService)) private firebase: FirebaseService,
		@Inject(forwardRef(() => StoreService)) private store: StoreService,
		@Inject(forwardRef(() => Http)) private http: Http,
		@Inject(forwardRef(() => Router)) private router: Router) {

	}

	ngOnInit() {
	}

	ngAfterViewInit() {
		this.http.get('http://findmy.maytag.ca/config/maytag-en_CA.json').subscribe(res => {
			this.firebase.saveDefaultConfig(res.json())
		});
	}
 }

bootstrap(AppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS, LoggerService, FirebaseService, StoreService])
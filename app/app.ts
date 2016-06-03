import 'rxjs/Rx'
import {bootstrap} from '@angular/platform-browser-dynamic'
import { Http, Headers, HTTP_PROVIDERS } from '@angular/http'
import {LoggerService} from './services/logger.service'
import {FirebaseService} from './services/firebase.service'
import {StoreService} from './services/store.service'
import {I18nService} from './services/i18n.service'
import {Component, Inject, forwardRef} from '@angular/core'
import { RouteConfig, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated'

import {UINavbar} from './ui.navbar.component'
import {BrandEdit} from './brand.edit.component'
import {CategoryEdit} from './category.edit.component'
import {QuestionEdit} from './question.edit.component'


@Component({
	selector: 'main-app',
	providers: [HTTP_PROVIDERS],
	directives: [UINavbar, ROUTER_DIRECTIVES, BrandEdit, CategoryEdit, QuestionEdit],
    template: `
    	<ui-navbar></ui-navbar>
    	<router-outlet></router-outlet>
	`
})
@RouteConfig([
	{ path: '/', component: BrandEdit, name: 'BrandEdit', useAsDefault: true },
	{ path: '/edit/:category', component: CategoryEdit, name: 'EditCategory' },
	{ path: '/edit/:category/:question', component: QuestionEdit, name: 'EditQuestion' }
])
class AppComponent {
	private _onConfigChanged

	constructor(
		private firebase: FirebaseService,
		private store: StoreService,
		private http: Http,
		private router: Router,
		private i18n: I18nService) {

		i18n.setLanguage('en')
	}

	ngOnInit() {
	}

	ngAfterViewInit() {
		this.http.get('http://findmy.maytag.ca/config/maytag-en_CA.json').subscribe(res => {
			this.firebase.saveDefaultConfig(res.json())
		});
	}
 }

bootstrap(AppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS, LoggerService, FirebaseService, StoreService, I18nService])
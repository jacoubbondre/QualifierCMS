import 'rxjs/Rx'
import {bootstrap} from '@angular/platform-browser-dynamic'
import { Http, Headers, HTTP_PROVIDERS } from '@angular/http'
import {LoggerService} from './services/logger.service'
import {FirebaseService} from './services/firebase.service'
import {StoreService} from './services/store.service'
import {I18nService} from './services/i18n.service'
import {EnvironmentService} from './services/environment.service'
import {BreakpointService} from './services/breakpoint.service'
import {Component, Inject} from '@angular/core'
import { RouteConfig, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated'
import {DND_PROVIDERS, DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd';

import {UINavbar} from './ui.navbar.component'
import {BrandEdit} from './brand.edit.component'
import {CategoryEdit} from './category.edit.component'
import {QuestionEdit} from './question.edit.component'
import {SettingsEdit} from './app-settings.edit.component'


@Component({
	selector: 'main-app',
	providers: [HTTP_PROVIDERS],
	directives: [UINavbar, ROUTER_DIRECTIVES, DND_DIRECTIVES, BrandEdit, CategoryEdit, QuestionEdit, SettingsEdit],
    template: `
    	<ui-navbar></ui-navbar>
    	<router-outlet></router-outlet>
	`
})
@RouteConfig([
	{ path: '/', component: BrandEdit, name: 'BrandEdit', useAsDefault: true },
	{ path: '/edit/:category', component: CategoryEdit, name: 'EditCategory' },
	{ path: '/edit/:category/:question', component: QuestionEdit, name: 'EditQuestion' },
	{ path: '/edit/settings', component: SettingsEdit, name: 'EditSettings'}
])
class AppComponent {
	private _onConfigChanged

	constructor(
		private firebase: FirebaseService,
		private store: StoreService,
		private http: Http,
		private router: Router,
		private i18n: I18nService,
		private env: EnvironmentService,
		private breakpoint: BreakpointService,
		private logger: LoggerService) {

		breakpoint.add('tablet', 480)
        breakpoint.add('desktop', 481)
	}

	ngAfterViewInit() {
		this.breakpoint.afterViewInit()
		this.env.afterViewInit()

		this.i18n.setLanguage(this.env.language())

		if (this.env.isDev() || this.env.isStaging()) {
			this.breakpoint.debugMode(true)
    	}

        this.logger.log(`Angular 2 app environment: ${this.env.mode()}`)

		this.http.get('http://findmy.maytag.ca/config/maytag-en_CA.json').subscribe(res => {
			this.firebase.saveDefaultConfig(res.json())
		});
	}
 }

bootstrap(AppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS, DND_PROVIDERS, LoggerService, FirebaseService, StoreService, I18nService, EnvironmentService, BreakpointService])
import {Directive, Injectable, Input, ElementRef} from 'angular2/core';
import {BrowserDomAdapter} from 'angular2/platform/browser'
import {Analytics} from './services/analytics.service'

@Injectable()
@Directive({
	selector: '[analyticsOn]'
})
export class AnalyticsOn {
	@Input('analyticsOn') analyticsOn: string
	@Input() analyticsAction: string
	@Input() analyticsCategory: string
	@Input() analyticsLabel: string

	private elRef: ElementRef
	private el: any
	private analytics: Analytics
	private DOM: BrowserDomAdapter;

	constructor(elRef: ElementRef, analytics: Analytics) {
		this.elRef = elRef
		this.el = elRef.nativeElement
		this.analytics = analytics
		this.DOM = new BrowserDomAdapter()
	}

	ngAfterViewInit() {
		this.DOM.on(this.el, this.analyticsOn, (event: any) => this.eventTrack(event))
	}

	eventTrack(event: any) {
		let properties: any = {
			eventType: event.type
		};

		if (this.analyticsAction) {
			properties.action = this.analyticsAction
		}

		if (this.analyticsCategory) {
			properties.category = this.analyticsCategory
		}

		if (this.analyticsLabel) {
			properties.label = this.analyticsLabel
		}

		this.analytics.sendEvent(properties)
	}
}
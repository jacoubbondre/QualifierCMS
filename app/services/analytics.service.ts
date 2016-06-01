import {Injectable} from '@angular/core';
import {LoggerService} from './logger.service';

declare var ga;

@Injectable()
export class AnalyticsService {
	public enabled: boolean
	private logger: LoggerService
	private debug: boolean
	private bindings

	constructor(logger: LoggerService) {
		this.logger = logger
		this.enabled = this.gaObjectExists()
		this.debug = false
		this.bindings = []
	}

	ngAfterViewInit() {
		if (!this.enabled) this.enabled = this.gaObjectExists()
	}

	public sendEvent(props) {
		this.enabled = this.gaObjectExists()

		props = this.fillBindings(props)

		if (this.propsAreEmpty(props)) {
			this.logger.error(`Analytics: ignored a ${props.eventType} event because all of it's properties are empty!`)
			return
		}

		if (this.debug) {
			this.logger.log(`Analytics: got a ${props.eventType} event, c:${props.category}, a:${props.action}, l:${props.label}`)
		} else {
			if (this.enabled) {
				ga('send', 'event',
					props.category ? props.category : '',
					props.action ? props.action : '',
					props.label ? props.label : '')
			} else {
				this.logger.error(`Analytics: ignored a ${props.eventType} event with the name ${props.action} because ga hasn't loaded yet!`)
			}
		}
	}

	public bind(keyword, fn) {
		if (typeof fn !== 'function') return
		this.bindings.push({ 'keyword': keyword, 'function': fn })
	}

	public debugMode(val: boolean) {
		if (val) this.logger.log(`Analytics: now in debug mode`)
		this.debug = val;
	}

	private propsAreEmpty(props) {
		if (Object.keys(props).length == 1) return true
		for (var i in props) {
			if (i == 'eventType') continue
			if (typeof props[i] === 'string' && props[i].length) return false
		}
		return true
	}

	private gaObjectExists() {
		return 'ga' in window && typeof window.ga !== 'undefined' && window.ga
	}

	private fillBindings(arr) {
		for (var i in arr) {
			arr[i] = this.fillBinding(arr[i])
		}
		return arr
	}

	private fillBinding(str) {
		if (!str || typeof str === 'undefined' || !str.length) return false

		for (var i in this.bindings) {
			if (str.indexOf(`@${this.bindings[i].keyword}`) > -1) {
				//matched keyword
				var replace = this.bindings[i]['function'].call(this, str)
				str = str.replace(`@${this.bindings[i].keyword}`, replace)
				if (!replace) this.logger.log(`Analytics: ${this.bindings[i].keyword} bind callback returned an empty string`)
			}
		}

		if (str.indexOf('@') > -1) {
			this.logger.error(`Analytics: unrecognized binding in ${str}, ignoring`)
			return false
		}

		return str
	}
}
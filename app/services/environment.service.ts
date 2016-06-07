import {Injectable} from '@angular/core';

@Injectable()
export class EnvironmentService {
	private _environment
	private _language
	private devHosts = ['localhost', '127.0.0.1']
	private stagingHosts = ['cuat']
	private window

	constructor() {}

	public afterViewInit() {
		this.window = window

		//set env
		if (this.devHosts.indexOf(this.window.location.hostname) > -1) {
			this._environment = modes.DEVELOPMENT
		} else if (this.stagingHosts.indexOf(this.window.location.hostname.split('.')[0]) > -1) {
			this._environment = modes.STAGING
		} else {
			this._environment = modes.PRODUCTION
		}

		//set language
		this.setEnglish()
	}

	public setEnglish() { this._language = languages.ENGLISH }
	public setEN() { this.setEnglish() }
	public isEnglish() {return this._language == languages.ENGLISH}

	public language() {return this._language}
	public locale() {return this.language()}

	public setFrench() { this._language = languages.FRENCH }
	public setFR() { this.setFrench() }
	public isFrench() {return this._language == languages.FRENCH}

	public setDev() { this._environment = modes.DEVELOPMENT }
	public setDevelopment() { this.setDev() }

	public isDev() { return this._environment == modes.DEVELOPMENT }
	public isDevelopment() { return this.isDev() }

	public setStaging() { this._environment = modes.STAGING }

	public isStaging() { return this._environment == modes.STAGING }

	public setProd() { this._environment = modes.PRODUCTION }
	public setProduction() { this.setProd() }

	public isProd() { return this._environment == modes.PRODUCTION }
	public isProduction() { return this.isProd() }

	public environment() { return this._environment }
	public env() { return this.environment() }
	public mode() { return this.environment() }
}

class modes {
	public static get DEVELOPMENT(): string { return "dev" }
	public static get PRODUCTION(): string { return "prod" }
	public static get STAGING(): string { return "staging" }
}

class languages {
	public static get ENGLISH(): string {return "en"}
	public static get FRENCH(): string {return "fr"}
}
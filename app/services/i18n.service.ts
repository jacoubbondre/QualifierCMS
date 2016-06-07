import {Injectable, EventEmitter} from '@angular/core'
import {LoggerService} from './logger.service'
import { Http, Response } from '@angular/http'

@Injectable()
export class I18nService {
	private container:LanguageContainer
	private containers:any
	private logBuffer: any

	private defaultLanguage = 'en'

	constructor(private logger: LoggerService, private http:Http) {
		this.containers = {}
		this.logBuffer = []
		this.setLanguage(this.defaultLanguage)
	}

	setLanguage(language:string) {
		this.container = new LanguageContainer()
		this.container.language = language

		if (!(language in this.containers)) this.http.get(`/app/i18n/${language}.json`).map(
			(res: Response) => res.json()).subscribe(res => {
				this.container.strings = res
				this.containers[language] = this.container
			}, err => {
				this.logger.error(this, `failed to get ${language}.json`)
			})
		else this.container = this.containers[language]
	}

	translate(value:string) {
		if (!(this.container && this.container.strings)) return undefined
		if (value in this.container.strings) {
			return this.container.strings[value]
		} else {
			if (this.logBuffer.indexOf(value) == -1) {
				this.logger.error(this, `failed to translate '${value}'`)
				this.logBuffer.push(value)
			}
			return undefined
		}
	}

	get language() {
		return this.container && this.container.language ? this.container.language : undefined
	}

	set language(val:string) {
		this.logger.error('Cannot explicitly set language, use setLanguage()')
	}
}

class LanguageContainer {
	public language:string
	public strings:Object
}

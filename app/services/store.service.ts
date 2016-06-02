import {Injectable, EventEmitter} from '@angular/core'
import {LoggerService} from './logger.service'
import {FirebaseService} from './firebase.service'

@Injectable()
export class StoreService {
	private config: any //the current config being edited
	private configs: any //list of all configs from db
	private defaultConfig:any

	constructor(private logger: LoggerService, private firebase: FirebaseService) {
		this.onConfigChange = new EventEmitter()
		this.onConfigsChange = new EventEmitter()
		this.configs = {}

		this.firebase.onGetConfigs.subscribe(res => {
			this._onConfigsChange(res)
		})

		this.firebase.onGetDefaultConfig.subscribe(res => {
			this._onDefaultConfigChange(res)
		})

		this.firebase.getConfigs()
	}

	//inputs
	_onConfigsChange(configs) {
		if (configs) {
			this.configs = configs
			let keys = Object.keys(this.configs)
			this.setConfig(this.configs[keys[0]], keys[0])
			this.onConfigsChange.emit(configs)
		}
	}

	_onDefaultConfigChange(config) {
		if (config) {
			this.setDefaultConfig(config, false)
		}
	}

	//outputs
	public onConfigChange: EventEmitter<any>
	public onConfigsChange: EventEmitter<any>

	//methods
	setDefaultConfig(config: any, propogate: boolean = true) {
		this.defaultConfig = config
		if (propogate) this.firebase.saveDefaultConfig(config)
	}

	setConfig(data, id) {
		if (!this.config) this.config = new Config(data, id)
		else {
			this.config.set(data, id)
		}
		this.onConfigChange.emit(this.config)
	}

	setConfigData(data) {
		this.config.setData(data)
	}

	newConfig() {
		this.setConfig({
			data: this.defaultConfig.data,
			created: undefined,
			updated: undefined,
			id: undefined
		}, undefined)
	}

	setConfigById(id) {
		if (this.configs && id in this.configs) {
			this.config.set(this.configs[id], id)
			this.onConfigChange.emit(this.config.get())
		}
	}

	changeConfig(id) {
		if (id in this.configs) {
			this.config.set(this.configs[id], id)
		}
	}

	saveConfig() {
		console.log('save config', this.config.get(), this.config.id)
		this.firebase.saveConfig(this.configs, this.config.get(), this.config.id)
	}

	getConfig(id) {
		if (typeof id !== 'undefined' && id in this.configs) return this.configs[id]
		return this.config
	}

	getConfigs() {
		return this.configs
	}

	preview() {
		window.open('http://localhost/qualifier-preview/build', '_blank')
	}
}

class Config {
	public id: string
	private config: any
	private categories: any

	constructor(config, id) {
		this.set(config,id)
	}

	set(config, id) {
		this.config = config
		if (typeof id !== 'undefined' && id) this.id = id
		this._parseCategories()
	}

	get() {return this.config}

	setData(data) {this.config.data = data}
	getData() {return this.config.data}

	setQuestions(questions) {this.config.questions = questions}
	getQuestions() {return this.config.questions}
	getQuestionsByCategory(category) { return this._parseQuestions(category) }
	getQuestionByCategoryName(category, name) {return this._parseQuestion(category, name)}
	setQuestionByCategoryName(category, name, data) {this._setQuestion(category, name, data)}
	setQuestionByName(name, question) {if (name in this.config.questions) this.config.questions[name] = question}
	getQuestionByName(name) {return name in this.config.questions ? this.config.questions[name] : false}

	setAppText(apptext) {this.config.apptext = apptext}
	getAppText() {return this.config.apptext}

	setAppTextByName(name, val) {if (name in this.config.apptext) this.config.apptext[name] = val}
	getAppTextByName(name) {return name in this.config.apptext ? this.config.apptext[name] : false}

	getBrand() {return this.config.data.brand}
	setBrand(brand) {if (brand) this.config.data.brand = brand }

	getCategories() {return this.categories}

	_parseQuestion(cat, tit) {
		let question;

		for (var str in this.config.data.questions) {
			let arr = str.split(" - ")
			let category = arr[0]
			let subcategory, title
			if (arr.length > 2) {
				subcategory = arr[1]
				title = arr[2]
			} else {
				title = arr[1]
			}

			if (((subcategory && subcategory.indexOf(cat) > -1) || category.indexOf(cat) > -1) && title.indexOf(tit) > -1) {
				question = this.config.data.questions[str]
				break;
			}
		}

		return question ? question : false
	}

	_setQuestion(cat, tit, data) {
		for (var str in this.config.data.questions) {
			let arr = str.split(" - ")
			let category = arr[0]
			let subcategory, title
			if (arr.length > 2) {
				subcategory = arr[1]
				title = arr[2]
			} else {
				title = arr[1]
			}

			if (((subcategory && subcategory.indexOf(cat) > -1) || category.indexOf(cat) > -1) && title.indexOf(tit) > -1) {
				this.config.data.questions[str] = data
			}
		}
	}

	_parseQuestions(cat) {
		//gets a list of relevant questions based on the category
		let questions = []

		for (var str in this.config.data.questions) {
			let arr = str.split(" - ")
			let category = arr[0]
			let subcategory, title
			if (arr.length > 2) {
				subcategory = arr[1]
				title = arr[2]
			} else {
				title = arr[1]
			}

			if ((subcategory && subcategory.indexOf(cat) > -1) || category.indexOf(cat) > -1) {
				questions.push(title)
			}
		}
		return questions
	}

	_parseCategories() {
		//parses list of category strings from config into an array format for *ngFor
		//thanks kyle

		let categories = [], subcategoryIndex = {}

		for (var str in this.config.data.questions) {
			let arr = str.split(" - ")
			let category = arr[0]
			let subcategory, title
			if (arr.length > 2) {
				subcategory = arr[1]
				title = arr[2]
			} else {
				title = arr[1]
			}

			if (!(category in categories)) {
				categories[category] = {
					category: category
				}
				if (!subcategory && title) categories[category].titles = []
			}
			if (!subcategory && title) categories[category].titles.push(title)

			if (subcategory) {
				if (!('subcategories' in categories[category])) {
					categories[category].subcategories = []
				}

				if (!(subcategory in subcategoryIndex)) {
					categories[category].subcategories.push({
						category: subcategory,
						titles: [title]
					})
					subcategoryIndex[subcategory] = categories[category].subcategories.length - 1
				} else {
					let index = subcategoryIndex[subcategory]
					categories[category].subcategories[index].titles.push(title)
				}
			}
		}

		this.categories = []
		for (var category in categories) {

			if (category !== 'Appliance') this.categories.push(categories[category])
		}
	}
}
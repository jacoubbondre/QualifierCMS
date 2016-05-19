import {Injectable, EventEmitter} from 'angular2/core'
import {LoggerService} from './logger.service'
import {FirebaseService} from './firebase.service'

@Injectable()
export class StoreService {
	private config: any //the current config being edited
	private id: string //the current config id
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
		this.config = data
		this.id = id
		this.onConfigChange.emit(this.config)
	}

	setConfigData(data) {
		this.config.data = data
	}

	newConfig() {
		this.setConfig({
			data: this.defaultConfig,
			created: undefined,
			updated: undefined,
			id: undefined
		}, undefined)
	}

	setConfigById(id) {
		if (this.configs && id in this.configs) {
			this.config = this.configs[id]
			this.id = id
		}
	}

	changeConfig(id) {
		if (id in this.configs) {
			this.config = this.configs[id]
			this.id = id
		}
	}

	saveConfig() {
		console.log('save config', this.config, this.id)
		this.firebase.saveConfig(this.configs, this.config, this.id)
	}

	getConfig(id) {
		if (typeof id !== 'undefined' && id in this.configs) return this.configs[id]
		return this.config
	}

	getConfigs() {
		return this.configs
	}
}
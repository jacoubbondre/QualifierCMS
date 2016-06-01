"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const logger_service_1 = require('./logger.service');
const firebase_service_1 = require('./firebase.service');
let StoreService = class StoreService {
    constructor(logger, firebase) {
        this.logger = logger;
        this.firebase = firebase;
        this.onConfigChange = new core_1.EventEmitter();
        this.onConfigsChange = new core_1.EventEmitter();
        this.configs = {};
        this.firebase.onGetConfigs.subscribe(res => {
            this._onConfigsChange(res);
        });
        this.firebase.onGetDefaultConfig.subscribe(res => {
            this._onDefaultConfigChange(res);
        });
        this.firebase.getConfigs();
    }
    _onConfigsChange(configs) {
        if (configs) {
            this.configs = configs;
            let keys = Object.keys(this.configs);
            this.setConfig(this.configs[keys[0]], keys[0]);
            this.onConfigsChange.emit(configs);
        }
    }
    _onDefaultConfigChange(config) {
        if (config) {
            this.setDefaultConfig(config, false);
        }
    }
    setDefaultConfig(config, propogate = true) {
        this.defaultConfig = config;
        if (propogate)
            this.firebase.saveDefaultConfig(config);
    }
    setConfig(data, id) {
        if (!this.config)
            this.config = new Config(data, id);
        else {
            this.config.set(data, id);
        }
        this.onConfigChange.emit(this.config);
    }
    setConfigData(data) {
        this.config.setData(data);
    }
    newConfig() {
        this.setConfig({
            data: this.defaultConfig.data,
            created: undefined,
            updated: undefined,
            id: undefined
        }, undefined);
    }
    setConfigById(id) {
        if (this.configs && id in this.configs) {
            this.config.set(this.configs[id], id);
            this.onConfigChange.emit(this.config.get());
        }
    }
    changeConfig(id) {
        if (id in this.configs) {
            this.config.set(this.configs[id], id);
        }
    }
    saveConfig() {
        console.log('save config', this.config.get(), this.config.id);
        this.firebase.saveConfig(this.configs, this.config.get(), this.config.id);
    }
    getConfig(id) {
        if (typeof id !== 'undefined' && id in this.configs)
            return this.configs[id];
        return this.config;
    }
    getConfigs() {
        return this.configs;
    }
};
StoreService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [logger_service_1.LoggerService, firebase_service_1.FirebaseService])
], StoreService);
exports.StoreService = StoreService;
class Config {
    constructor(config, id) {
        this.set(config, id);
    }
    set(config, id) {
        this.config = config;
        if (typeof id !== 'undefined' && id)
            this.id = id;
        this._parseCategories();
    }
    get() { return this.config; }
    setData(data) { this.config.data = data; }
    getData() { return this.config.data; }
    setQuestions(questions) { this.config.questions = questions; }
    getQuestions() { return this.config.questions; }
    setQuestionByName(name, question) { if (name in this.config.questions)
        this.config.questions[name] = question; }
    getQuestionByName(name) { return name in this.config.questions ? this.config.questions[name] : false; }
    setAppText(apptext) { this.config.apptext = apptext; }
    getAppText() { return this.config.apptext; }
    setAppTextByName(name, val) { if (name in this.config.apptext)
        this.config.apptext[name] = val; }
    getAppTextByName(name) { return name in this.config.apptext ? this.config.apptext[name] : false; }
    getBrand() { return this.config.data.brand; }
    setBrand(brand) { if (brand)
        this.config.data.brand = brand; }
    getCategories() { return this.categories; }
    _parseCategories() {
        let categories = [], subcategoryIndex = {};
        for (var str in this.config.data.questions) {
            let arr = str.split(" - ");
            let category = arr[0];
            let subcategory, title;
            if (arr.length > 2) {
                subcategory = arr[1];
                title = arr[2];
            }
            else {
                title = arr[1];
            }
            if (!(category in categories)) {
                categories[category] = {
                    category: category
                };
                if (!subcategory && title)
                    categories[category].titles = [];
            }
            if (!subcategory && title)
                categories[category].titles.push(title);
            if (subcategory) {
                if (!('subcategories' in categories[category])) {
                    categories[category].subcategories = [];
                }
                if (!(subcategory in subcategoryIndex)) {
                    categories[category].subcategories.push({
                        category: subcategory,
                        titles: [title]
                    });
                    subcategoryIndex[subcategory] = categories[category].subcategories.length - 1;
                }
                else {
                    let index = subcategoryIndex[subcategory];
                    categories[category].subcategories[index].titles.push(title);
                }
            }
        }
        this.categories = [];
        for (var category in categories) {
            if (category !== 'Appliance')
                this.categories.push(categories[category]);
        }
    }
}

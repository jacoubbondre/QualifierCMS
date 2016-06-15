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
    preview() {
        window.open('http://localhost/qualifier-preview/build', '_blank');
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
    getQuestionsByCategory(category) { return this._parseQuestions(category); }
    getQuestionByCategoryName(category, name) { return this._parseQuestion(category, name); }
    setQuestionByCategoryName(category, name, data) { this._setQuestion(category, name, data); }
    setQuestionByName(name, question) { if (name in this.config.questions)
        this.config.questions[name] = question; }
    getQuestionByName(name) { return name in this.config.questions ? this.config.questions[name] : false; }
    setAppText(apptext) { this.config.apptext = apptext; }
    getAppText() { return this._parseSettings(); }
    setAppTextByName(name, val) { if (name in this.config.apptext)
        this.config.apptext[name] = val; }
    getAppTextByName(name) { return name in this.config.apptext ? this.config.apptext[name] : false; }
    getBrand() { return this.config.data.brand; }
    setBrand(brand) { if (brand)
        this.config.data.brand = brand; }
    getCategories() { return this.categories; }
    setCategories(data) { this._setCategories(data); }
    listColorIsAlternate(categories, category) {
        var b = false;
        for (var cat in categories) {
            b = !b;
            if (categories[cat].category == category.category) {
                console.log(category.category, b);
                return b;
            }
            if ('subcategories' in categories[cat]) {
                for (var kitten in categories[cat].subcategories) {
                    b = !b;
                    if (categories[cat].subcategories[kitten].category == category.category) {
                        console.log(category.category, b, 'sub');
                        return b;
                    }
                }
            }
        }
        return b;
    }
    _parseSettings() {
        var arr = [];
        for (var i in this.config.data.apptext) {
            arr.push({
                name: i,
                value: this.config.data.apptext[i]
            });
        }
        return arr;
    }
    _parseQuestion(cat, tit) {
        let question;
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
            if (((subcategory && subcategory.indexOf(cat) > -1) || category.indexOf(cat) > -1) && title.indexOf(tit) > -1) {
                question = this.config.data.questions[str];
                break;
            }
        }
        return question ? question : false;
    }
    _setQuestion(cat, tit, data) {
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
            if (((subcategory && subcategory.indexOf(cat) > -1) || category.indexOf(cat) > -1) && title.indexOf(tit) > -1) {
                this.config.data.questions[str] = data;
            }
        }
    }
    _parseQuestions(cat) {
        let questions = [];
        for (var str in this.config.data.questions) {
            let arr = str.split(" - ");
            let question = this.config.data.questions[str];
            let category = arr[0];
            let subcategory, title;
            if (arr.length > 2) {
                subcategory = arr[1];
                title = arr[2];
            }
            else {
                title = arr[1];
            }
            if ((subcategory && subcategory.indexOf(cat) > -1) || category.indexOf(cat) > -1) {
                questions.push({
                    question: question.text[0].question,
                    feature: title,
                    type: question.text[0].type
                });
            }
        }
        return questions;
    }
    _parseCategories() {
        let categories = [], subcategories = [];
        for (var i in this.config.data.questions['Appliance'].text[0].answers) {
            let category = this.config.data.questions['Appliance'].text[0].answers[i].next.split(' - ')[0];
            if (category == "Cooking") {
                for (var j in this.config.data.questions['Cooking - Pre-Qualifier 1'].text[0].answers) {
                    let subcategory = this.config.data.questions['Cooking - Pre-Qualifier 1'].text[0].answers[j].next.split(' - ')[1];
                    subcategories.push({
                        category: subcategory
                    });
                }
            }
            let obj = { category: category };
            if (subcategories.length)
                obj['subcategories'] = subcategories;
            categories.push(obj);
            subcategories = [];
        }
        this.categories = categories;
    }
    _setCategories(categoryArr) {
        let categoryAnswers = [], subcategoryAnswers = [];
        for (var i in categoryArr) {
            var title1 = categoryArr[i].category;
            for (var j in this.config.data.questions['Appliance'].text[0].answers) {
                var title = this.config.data.questions['Appliance'].text[0].answers[j].next.split(' - ')[0];
                if (title1 == title) {
                    categoryAnswers.push(this.config.data.questions['Appliance'].text[0].answers[j]);
                }
            }
            if (title1 == 'Cooking') {
                for (var k in categoryArr[i].subcategories) {
                    var subtitle = categoryArr[i].subcategories[k].category;
                    for (var j in this.config.data.questions['Cooking - Pre-Qualifier 1'].text[0].answers) {
                        var subtitle1 = this.config.data.questions['Cooking - Pre-Qualifier 1'].text[0].answers[j].next.split(' - ')[1];
                        if (subtitle1 == subtitle) {
                            subcategoryAnswers.push(this.config.data.questions['Cooking - Pre-Qualifier 1'].text[0].answers[j]);
                        }
                    }
                }
            }
        }
        if (categoryAnswers.length == this.config.data.questions['Appliance'].text[0].answers.length) {
            this.config.data.questions['Appliance'].text[0].answers = categoryAnswers;
        }
        if (subcategoryAnswers.length == this.config.data.questions['Cooking - Pre-Qualifier 1'].text[0].answers.length) {
            this.config.data.questions['Cooking - Pre-Qualifier 1'].text[0].answers = subcategoryAnswers;
        }
        console.log(this.config);
    }
}

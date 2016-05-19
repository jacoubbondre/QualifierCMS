System.register(['./services/store.service', 'angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var store_service_1, core_1;
    var BasicDataListComponent;
    return {
        setters:[
            function (store_service_1_1) {
                store_service_1 = store_service_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            BasicDataListComponent = (function () {
                function BasicDataListComponent(store) {
                    var _this = this;
                    this.store = store;
                    this.selectedItem = 0;
                    this._onConfigsDataChanged = this.store.onConfigsChange
                        .subscribe(function (configs) { return _this.onConfigsChange(configs); });
                }
                //outputs
                //methods
                BasicDataListComponent.prototype.onConfigsChange = function (configs) {
                    var tempArr = [];
                    //normalize data for ngFor
                    for (var i in configs) {
                        var temp = configs[i];
                        configs[i].id = i;
                        tempArr.push(temp);
                    }
                    this.configs = tempArr;
                };
                BasicDataListComponent.prototype.selectItem = function (index, config) {
                    this.selectedItem = index;
                    this.store.setConfigById(config.id);
                };
                BasicDataListComponent = __decorate([
                    core_1.Component({
                        selector: 'basic-data-list',
                        template: "\n    \t<ul>\n    \t\t<li *ngFor=\"#config of configs; #i = index\" class=\"{{i == selectedItem ? 'selected' : ''}}\" (click)=\"selectItem(i,config)\">\n    \t\t\t{{config.updated}}\n    \t\t</li>\n    \t</ul>\n    \t<button class=\"load\">Load</button>\n\t"
                    }), 
                    __metadata('design:paramtypes', [store_service_1.StoreService])
                ], BasicDataListComponent);
                return BasicDataListComponent;
            }());
            exports_1("BasicDataListComponent", BasicDataListComponent);
        }
    }
});
//# sourceMappingURL=basicDataList.component.js.map
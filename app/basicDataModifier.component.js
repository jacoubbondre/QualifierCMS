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
    var BasicDataModifierComponent;
    return {
        setters:[
            function (store_service_1_1) {
                store_service_1 = store_service_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            BasicDataModifierComponent = (function () {
                function BasicDataModifierComponent(store) {
                    var _this = this;
                    this.store = store;
                    this._onDataChanged = this.store.onConfigChange
                        .subscribe(function (data) { return _this.onConfigChange(data); });
                }
                //outputs
                //methods
                BasicDataModifierComponent.prototype.onSave = function () {
                    this.store.setConfigData(JSON.parse(this.text));
                    this.store.saveConfig();
                };
                BasicDataModifierComponent.prototype.onNew = function () {
                    this.store.newConfig();
                };
                BasicDataModifierComponent.prototype.onConfigChange = function (data) {
                    this.text = JSON.stringify(data.data, null, 4);
                    console.log('set config', data);
                    this.id = data.id;
                };
                BasicDataModifierComponent = __decorate([
                    core_1.Component({
                        selector: 'basic-data-modifier',
                        template: "\n    \t<form>\n\t\t\t<textarea type=\"textbox\" [(ngModel)]=\"text\"></textarea>\n\t\t\t<button class=\"submit\" (click)=\"onSave()\">Save</button>\n\t\t\t<button class=\"new\" (click)=\"onNew()\">New</button>\n\t\t</form>\n\t"
                    }), 
                    __metadata('design:paramtypes', [store_service_1.StoreService])
                ], BasicDataModifierComponent);
                return BasicDataModifierComponent;
            }());
            exports_1("BasicDataModifierComponent", BasicDataModifierComponent);
        }
    }
});
//# sourceMappingURL=basicDataModifier.component.js.map
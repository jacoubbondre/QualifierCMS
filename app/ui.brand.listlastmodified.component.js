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
const router_deprecated_1 = require('@angular/router-deprecated');
let UIBrandListLastModified = class UIBrandListLastModified {
    constructor(router) {
        this.router = router;
        this.onOrderChange = new core_1.EventEmitter();
        this.movable = true;
        this.editable = true;
        this.hideable = true;
        this.hidden = false;
    }
    hide() {
        this.hidden = true;
    }
    show() {
        this.hidden = false;
    }
    ngAfterViewInit() {
        Materialize.updateTextFields();
    }
    onDragSuccess() {
        this.onOrderChange.emit(undefined);
    }
    getListColor(category) {
        return this.config.listColorIsAlternate(this.categories, category);
    }
    navigateToCategory(category) {
        console.log(category);
        this.router.navigate(['Category', { category: category }]);
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], UIBrandListLastModified.prototype, "categories", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], UIBrandListLastModified.prototype, "config", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], UIBrandListLastModified.prototype, "data", void 0);
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], UIBrandListLastModified.prototype, "onOrderChange", void 0);
UIBrandListLastModified = __decorate([
    core_1.Component({
        selector: 'ui-brand-list-lastmodified',
        template: `
      <lol></lol>
    `,
        directives: [router_deprecated_1.ROUTER_DIRECTIVES]
    }), 
    __metadata('design:paramtypes', [router_deprecated_1.Router])
], UIBrandListLastModified);
exports.UIBrandListLastModified = UIBrandListLastModified;

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
const core_2 = require('@angular/core');
const dnd_component_1 = require('./dnd.component');
const dnd_config_1 = require('./dnd.config');
const dnd_service_1 = require('./dnd.service');
let DraggableComponent = class DraggableComponent extends dnd_component_1.AbstractComponent {
    constructor(elemRef, dragDropService, config, cdr) {
        super(elemRef, dragDropService, config, cdr);
        this.onDragSuccessCallback = new core_2.EventEmitter();
        this._defaultCursor = this._elem.style.cursor;
        this.dragEnabled = true;
    }
    set draggable(value) {
        this.dragEnabled = !!value;
    }
    set dropzones(value) {
        this.dropZones = value;
    }
    set effectallowed(value) {
        this.effectAllowed = value;
    }
    set effectcursor(value) {
        this.effectCursor = value;
    }
    _onDragStartCallback(event) {
        this._dragDropService.isDragged = true;
        this._dragDropService.dragData = this.dragData;
        this._dragDropService.onDragSuccessCallback = this.onDragSuccessCallback;
        this._elem.classList.add(this._config.onDragStartClass);
    }
    _onDragEndCallback(event) {
        this._dragDropService.isDragged = false;
        this._dragDropService.dragData = null;
        this._dragDropService.onDragSuccessCallback = null;
        this._elem.classList.remove(this._config.onDragStartClass);
    }
};
__decorate([
    core_2.Input("dragEnabled"), 
    __metadata('design:type', Boolean), 
    __metadata('design:paramtypes', [Boolean])
], DraggableComponent.prototype, "draggable", null);
__decorate([
    core_2.Input(), 
    __metadata('design:type', Object)
], DraggableComponent.prototype, "dragData", void 0);
__decorate([
    core_2.Output("onDragSuccess"), 
    __metadata('design:type', core_2.EventEmitter)
], DraggableComponent.prototype, "onDragSuccessCallback", void 0);
__decorate([
    core_2.Input("dropZones"), 
    __metadata('design:type', Array), 
    __metadata('design:paramtypes', [Array])
], DraggableComponent.prototype, "dropzones", null);
__decorate([
    core_2.Input("effectAllowed"), 
    __metadata('design:type', String), 
    __metadata('design:paramtypes', [String])
], DraggableComponent.prototype, "effectallowed", null);
__decorate([
    core_2.Input("effectCursor"), 
    __metadata('design:type', String), 
    __metadata('design:paramtypes', [String])
], DraggableComponent.prototype, "effectcursor", null);
DraggableComponent = __decorate([
    core_2.Directive({ selector: '[dnd-draggable]' }), 
    __metadata('design:paramtypes', [core_2.ElementRef, dnd_service_1.DragDropService, dnd_config_1.DragDropConfig, core_1.ChangeDetectorRef])
], DraggableComponent);
exports.DraggableComponent = DraggableComponent;

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
let SortableContainer = class SortableContainer extends dnd_component_1.AbstractComponent {
    constructor(elemRef, dragDropService, config, cdr, _sortableDataService) {
        super(elemRef, dragDropService, config, cdr);
        this._sortableDataService = _sortableDataService;
        this._sortableData = [];
        this.dragEnabled = false;
    }
    set draggable(value) {
        this.dragEnabled = !!value;
    }
    set sortableData(sortableData) {
        this._sortableData = sortableData;
        this.dropEnabled = this._sortableData.length === 0;
    }
    get sortableData() {
        return this._sortableData;
    }
    set dropzones(value) {
        this.dropZones = value;
    }
    _onDragEnterCallback(event) {
        if (this._sortableDataService.isDragged) {
            let item = this._sortableDataService.sortableData[this._sortableDataService.index];
            if (this._sortableData.indexOf(item) === -1) {
                this._sortableDataService.sortableData.splice(this._sortableDataService.index, 1);
                this._sortableData.push(item);
                this._sortableDataService.sortableData = this._sortableData;
                this._sortableDataService.index = 0;
            }
            this.detectChanges();
        }
    }
};
__decorate([
    core_2.Input("dragEnabled"), 
    __metadata('design:type', Boolean), 
    __metadata('design:paramtypes', [Boolean])
], SortableContainer.prototype, "draggable", null);
__decorate([
    core_2.Input(), 
    __metadata('design:type', Array), 
    __metadata('design:paramtypes', [Array])
], SortableContainer.prototype, "sortableData", null);
__decorate([
    core_2.Input("dropZones"), 
    __metadata('design:type', Array), 
    __metadata('design:paramtypes', [Array])
], SortableContainer.prototype, "dropzones", null);
SortableContainer = __decorate([
    core_2.Directive({ selector: '[dnd-sortable-container]' }), 
    __metadata('design:paramtypes', [core_2.ElementRef, dnd_service_1.DragDropService, dnd_config_1.DragDropConfig, core_1.ChangeDetectorRef, dnd_service_1.DragDropSortableService])
], SortableContainer);
exports.SortableContainer = SortableContainer;
let SortableComponent = class SortableComponent extends dnd_component_1.AbstractComponent {
    constructor(elemRef, dragDropService, config, _sortableContainer, _sortableDataService, cdr) {
        super(elemRef, dragDropService, config, cdr);
        this._sortableContainer = _sortableContainer;
        this._sortableDataService = _sortableDataService;
        this.onDragSuccessCallback = new core_2.EventEmitter();
        this.onDragStartCallback = new core_2.EventEmitter();
        this.onDragOverCallback = new core_2.EventEmitter();
        this.onDragEndCallback = new core_2.EventEmitter();
        this.onDropSuccessCallback = new core_2.EventEmitter();
        this.dropZones = this._sortableContainer.dropZones;
        this.dragEnabled = true;
        this.dropEnabled = true;
    }
    set draggable(value) {
        this.dragEnabled = !!value;
    }
    set droppable(value) {
        this.dropEnabled = !!value;
    }
    set effectallowed(value) {
        this.effectAllowed = value;
    }
    set effectcursor(value) {
        this.effectCursor = value;
    }
    _onDragStartCallback(event) {
        this._sortableDataService.isDragged = true;
        this._sortableDataService.sortableData = this._sortableContainer.sortableData;
        this._sortableDataService.index = this.index;
        this._sortableDataService.markSortable(this._elem);
        this._dragDropService.isDragged = true;
        this._dragDropService.dragData = this.dragData;
        this._dragDropService.onDragSuccessCallback = this.onDragSuccessCallback;
    }
    _onDragOverCallback(event) {
        if (this._sortableDataService.isDragged && this._elem != this._sortableDataService.elem) {
            this._sortableDataService.sortableData = this._sortableContainer.sortableData;
            this._sortableDataService.index = this.index;
            this._sortableDataService.markSortable(this._elem);
            this.onDragOverCallback.emit(this._dragDropService.dragData);
        }
    }
    _onDragEndCallback(event) {
        this._sortableDataService.isDragged = false;
        this._sortableDataService.sortableData = null;
        this._sortableDataService.index = null;
        this._sortableDataService.markSortable(null);
        this._dragDropService.isDragged = false;
        this._dragDropService.dragData = null;
        this._dragDropService.onDragSuccessCallback = null;
        this.onDragEndCallback.emit(this._dragDropService.dragData);
    }
    _onDragEnterCallback(event) {
        if (this._sortableDataService.isDragged) {
            this._sortableDataService.markSortable(this._elem);
            if ((this.index !== this._sortableDataService.index) ||
                (this._sortableDataService.sortableData != this._sortableContainer.sortableData)) {
                let item = this._sortableDataService.sortableData[this._sortableDataService.index];
                this._sortableDataService.sortableData.splice(this._sortableDataService.index, 1);
                this._sortableContainer.sortableData.splice(this.index, 0, item);
                this._sortableDataService.sortableData = this._sortableContainer.sortableData;
                this._sortableDataService.index = this.index;
            }
        }
    }
    _onDropCallback(event) {
        if (this._sortableDataService.isDragged) {
            this.onDropSuccessCallback.emit(this._dragDropService.dragData);
            if (this._dragDropService.onDragSuccessCallback) {
                this._dragDropService.onDragSuccessCallback.emit(this._dragDropService.dragData);
            }
            this._sortableContainer.detectChanges();
        }
    }
};
__decorate([
    core_2.Input('sortableIndex'), 
    __metadata('design:type', Number)
], SortableComponent.prototype, "index", void 0);
__decorate([
    core_2.Input("dragEnabled"), 
    __metadata('design:type', Boolean), 
    __metadata('design:paramtypes', [Boolean])
], SortableComponent.prototype, "draggable", null);
__decorate([
    core_2.Input("dropEnabled"), 
    __metadata('design:type', Boolean), 
    __metadata('design:paramtypes', [Boolean])
], SortableComponent.prototype, "droppable", null);
__decorate([
    core_2.Input(), 
    __metadata('design:type', Object)
], SortableComponent.prototype, "dragData", void 0);
__decorate([
    core_2.Input("effectAllowed"), 
    __metadata('design:type', String), 
    __metadata('design:paramtypes', [String])
], SortableComponent.prototype, "effectallowed", null);
__decorate([
    core_2.Input("effectCursor"), 
    __metadata('design:type', String), 
    __metadata('design:paramtypes', [String])
], SortableComponent.prototype, "effectcursor", null);
__decorate([
    core_2.Output("onDragSuccess"), 
    __metadata('design:type', core_2.EventEmitter)
], SortableComponent.prototype, "onDragSuccessCallback", void 0);
__decorate([
    core_2.Output("onDragStart"), 
    __metadata('design:type', core_2.EventEmitter)
], SortableComponent.prototype, "onDragStartCallback", void 0);
__decorate([
    core_2.Output("onDragOver"), 
    __metadata('design:type', core_2.EventEmitter)
], SortableComponent.prototype, "onDragOverCallback", void 0);
__decorate([
    core_2.Output("onDragEnd"), 
    __metadata('design:type', core_2.EventEmitter)
], SortableComponent.prototype, "onDragEndCallback", void 0);
__decorate([
    core_2.Output("onDropSuccess"), 
    __metadata('design:type', core_2.EventEmitter)
], SortableComponent.prototype, "onDropSuccessCallback", void 0);
SortableComponent = __decorate([
    core_2.Directive({ selector: '[dnd-sortable]' }), 
    __metadata('design:paramtypes', [core_2.ElementRef, dnd_service_1.DragDropService, dnd_config_1.DragDropConfig, SortableContainer, dnd_service_1.DragDropSortableService, core_1.ChangeDetectorRef])
], SortableComponent);
exports.SortableComponent = SortableComponent;

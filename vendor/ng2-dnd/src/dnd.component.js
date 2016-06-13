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
const dnd_config_1 = require('./dnd.config');
const dnd_service_1 = require('./dnd.service');
let AbstractComponent = class AbstractComponent {
    constructor(elemRef, _dragDropService, _config, _cdr) {
        this._dragDropService = _dragDropService;
        this._config = _config;
        this._cdr = _cdr;
        this._dragEnabled = false;
        this.dropEnabled = false;
        this.dropZones = [];
        this._elem = elemRef.nativeElement;
        this.dragEnabled = true;
        this._elem.ondragenter = (event) => {
            this._onDragEnter(event);
        };
        this._elem.ondragover = (event) => {
            this._onDragOver(event);
            if (event.dataTransfer != null) {
                event.dataTransfer.dropEffect = this._config.dropEffect.name;
            }
            return false;
        };
        this._elem.ondragleave = (event) => {
            this._onDragLeave(event);
        };
        this._elem.ondrop = (event) => {
            this._onDrop(event);
        };
        this._elem.ondragstart = (event) => {
            this._onDragStart(event);
            if (event.dataTransfer != null) {
                event.dataTransfer.setData('text', '');
                event.dataTransfer.effectAllowed = this.effectAllowed || this._config.dragEffect.name;
                if (this._config.dragImage != null) {
                    let dragImage = this._config.dragImage;
                    event.dataTransfer.setDragImage(dragImage.imageElement, dragImage.x_offset, dragImage.y_offset);
                }
                if (this._dragEnabled) {
                    this._elem.style.cursor = this.effectCursor ? this.effectCursor : this._config.dragCursor;
                }
                else {
                    this._elem.style.cursor = this._defaultCursor;
                }
            }
        };
        this._elem.ondragend = (event) => {
            this._onDragEnd(event);
            this._elem.style.cursor = this._defaultCursor;
        };
    }
    set dragEnabled(enabled) {
        this._dragEnabled = !!enabled;
        this._elem.draggable = this._dragEnabled;
    }
    get dragEnabled() {
        return this._dragEnabled;
    }
    detectChanges() {
        setTimeout(() => {
            this._cdr.detectChanges();
        }, 250);
    }
    _onDragEnter(event) {
        if (this._isDropAllowed) {
            this._onDragEnterCallback(event);
        }
        event.stopPropagation();
    }
    _onDragOver(event) {
        event.stopPropagation();
        if (this._isDropAllowed) {
            if (event.preventDefault) {
                event.preventDefault();
            }
            this._onDragOverCallback(event);
        }
    }
    _onDragLeave(event) {
        event.stopPropagation();
        if (this._isDropAllowed) {
            this._onDragLeaveCallback(event);
        }
    }
    _onDrop(event) {
        event.stopPropagation();
        if (this._isDropAllowed) {
            if (event.preventDefault) {
                event.preventDefault();
            }
            if (event.stopPropagation) {
                event.stopPropagation();
            }
            this._onDropCallback(event);
            this.detectChanges();
        }
    }
    get _isDropAllowed() {
        if (this._dragDropService.isDragged && this.dropEnabled) {
            if (this.allowDrop) {
                return this.allowDrop(this._dragDropService.dragData);
            }
            if (this.dropZones.length === 0 && this._dragDropService.allowedDropZones.length === 0) {
                return true;
            }
            for (let i = 0; i < this._dragDropService.allowedDropZones.length; i++) {
                let dragZone = this._dragDropService.allowedDropZones[i];
                if (this.dropZones.indexOf(dragZone) !== -1) {
                    return true;
                }
            }
        }
        return false;
    }
    _onDragStart(event) {
        event.stopPropagation();
        if (this._dragEnabled) {
            this._dragDropService.allowedDropZones = this.dropZones;
            this._onDragStartCallback(event);
        }
    }
    _onDragEnd(event) {
        event.stopPropagation();
        this._dragDropService.allowedDropZones = [];
        this._onDragEndCallback(event);
    }
    _onDragEnterCallback(event) { }
    _onDragOverCallback(event) { }
    _onDragLeaveCallback(event) { }
    _onDropCallback(event) { }
    _onDragStartCallback(event) { }
    _onDragEndCallback(event) { }
};
AbstractComponent = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [core_2.ElementRef, dnd_service_1.DragDropService, dnd_config_1.DragDropConfig, core_1.ChangeDetectorRef])
], AbstractComponent);
exports.AbstractComponent = AbstractComponent;

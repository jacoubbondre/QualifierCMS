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
let DataTransferEffect_1;
let DataTransferEffect = DataTransferEffect_1 = class DataTransferEffect {
    constructor(name) {
        this.name = name;
    }
};
DataTransferEffect.COPY = new DataTransferEffect('copy');
DataTransferEffect.LINK = new DataTransferEffect('link');
DataTransferEffect.MOVE = new DataTransferEffect('move');
DataTransferEffect.NONE = new DataTransferEffect('none');
DataTransferEffect = DataTransferEffect_1 = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [String])
], DataTransferEffect);
exports.DataTransferEffect = DataTransferEffect;
let DragImage = class DragImage {
    constructor(imageElement, x_offset = 0, y_offset = 0) {
        this.imageElement = imageElement;
        this.x_offset = x_offset;
        this.y_offset = y_offset;
    }
};
DragImage = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [HTMLElement, Number, Number])
], DragImage);
exports.DragImage = DragImage;
let DragDropConfig = class DragDropConfig {
    constructor() {
        this.onDragStartClass = "dnd-drag-start";
        this.onDragEnterClass = "dnd-drag-enter";
        this.onDragOverClass = "dnd-drag-over";
        this.onSortableDragClass = "dnd-sortable-drag";
        this.dragEffect = DataTransferEffect.MOVE;
        this.dropEffect = DataTransferEffect.MOVE;
        this.dragCursor = "move";
    }
};
DragDropConfig = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], DragDropConfig);
exports.DragDropConfig = DragDropConfig;

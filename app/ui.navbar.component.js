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
let UINavbar = class UINavbar {
    constructor() {
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], UINavbar.prototype, "data", void 0);
UINavbar = __decorate([
    core_1.Component({
        selector: 'ui-navbar',
        template: `
    <div class="navbar-fixed">
       <nav>
         <div class="nav-wrapper">
           <ul class="left">
             <li><a class="waves-effect waves-light"><i class="material-icons">menu</i></a></li>
             <li><a class="waves-effect waves-light"><i class="material-icons left">visibility</i>Preview Application</a></li>
             <li><a class="waves-effect waves-light"><i class="material-icons left">arrow_downward</i>Publish Application</a></li>
           </ul>
           <ul class="right">
             <li><a class="waves-effect waves-light"><i class="material-icons">more_vert</i></a></li>
           </ul>
         </div>
       </nav>
    </div>
    `,
        directives: []
    }), 
    __metadata('design:paramtypes', [])
], UINavbar);
exports.UINavbar = UINavbar;

System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var GlobalNav;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            GlobalNav = (function () {
                function GlobalNav() {
                }
                GlobalNav.prototype.ngAfterViewInit = function () {
                    $('.button-collapse').sideNav('show');
                    $('.button-collapse').sideNav({
                        menuWidth: 300,
                        edge: 'left',
                        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
                    });
                    $(".dropdown-button").dropdown();
                };
                GlobalNav = __decorate([
                    core_1.Component({
                        selector: 'global-nav',
                        template: "<div class=\"row\">\n    <nav>\n    <ul id=\"slide-out\" class=\"side-nav\">\n      <li><a href=\"#!\">First Sidebar Link</a></li>\n      <li><a href=\"#!\">Second Sidebar Link</a></li>\n    </ul>\n    <a href=\"#\" data-activates=\"slide-out\" class=\"button-collapse show-on-large\"><i class=\"material-icons\">menu</i></a>\n</nav>\n",
                        directives: []
                    }), 
                    __metadata('design:paramtypes', [])
                ], GlobalNav);
                return GlobalNav;
            }());
            exports_1("GlobalNav", GlobalNav);
        }
    }
});
//# sourceMappingURL=global.navigation.js.map
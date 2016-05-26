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
    var SingleAnswerEdit;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            SingleAnswerEdit = (function () {
                function SingleAnswerEdit() {
                }
                SingleAnswerEdit.prototype.ngAfterViewInit = function () {
                    Materialize.updateTextFields();
                    $('select').material_select();
                    $(".sortable").sortable({});
                    $(".sortable").disableSelection();
                    $('#line01').mouseup(function () {
                        setTimeout(function () { console.log($('#line01').index()); }, 500);
                    });
                    $('.button-collapse').sideNav('show');
                    $('.button-collapse').sideNav({
                        menuWidth: 300,
                        edge: 'left',
                        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
                    });
                };
                SingleAnswerEdit = __decorate([
                    core_1.Component({
                        selector: 'question-single-answer-edit',
                        template: "\n    <div class=\"row\">\n    <nav>\n    <ul id=\"slide-out\" class=\"side-nav\">\n      <li><a href=\"#!\">First Sidebar Link</a></li>\n      <li><a href=\"#!\">Second Sidebar Link</a></li>\n      <li class=\"no-padding\">\n        <ul class=\"collapsible collapsible-accordion\">\n          <li>\n            <a class=\"collapsible-header\">Dropdown<i class=\"mdi-navigation-arrow-drop-down\"></i></a>\n            <div class=\"collapsible-body\">\n              <ul>\n                <li><a href=\"#!\">First</a></li>\n                <li><a href=\"#!\">Second</a></li>\n                <li><a href=\"#!\">Third</a></li>\n                <li><a href=\"#!\">Fourth</a></li>\n              </ul>\n            </div>\n          </li>\n        </ul>\n      </li>\n    </ul>\n    <ul class=\"right hide-on-med-and-down\">\n      <li><a href=\"#!\">First Sidebar Link</a></li>\n      <li><a href=\"#!\">Second Sidebar Link</a></li>\n      <li><a class=\"dropdown-button\" href=\"#!\" data-activates=\"dropdown1\">Dropdown<i class=\"mdi-navigation-arrow-drop-down right\"></i></a></li>\n      <ul id='dropdown1' class='dropdown-content'>\n        <li><a href=\"#!\">First</a></li>\n        <li><a href=\"#!\">Second</a></li>\n        <li><a href=\"#!\">Third</a></li>\n        <li><a href=\"#!\">Fourth</a></li>\n      </ul>\n    </ul>\n    <a href=\"#\" data-activates=\"slide-out\" class=\"button-collapse\"><i class=\"mdi-navigation-menu\">hello</i></a>\n</nav>\n  </div>\n  <div class=\"row\">\n    <form class=\"col s12\">\n    <p>What would you like to edit</p>\n    <h2>Question</h2>\n      <div class=\"row\">\n        <div class=\"input-field col s6\">\n          <textarea id=\"question\" class=\"materialize-textarea\">For the Edit view, this will be pre-filled with the current question</textarea>\n          <label for=\"question\">Question</label>\n        </div>\n        <div class=\"input-field col s6\">\n          <textarea id=\"subQuestion\" class=\"materialize-textarea\">For the Edit view, this will be pre-filled with the current subquestion</textarea>\n          <label for=\"subQuestion\">Sub-Question</label>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"input-field col s6\">\n          <textarea id=\"explain_title\" type=\"text\" class=\"materialize-textarea\">For the Edit view, this will be pre-filled with the Why are you asking title</textarea>\n          <label for=\"explain_title\">Why are you asking title</label>\n        </div>\n        <div class=\"input-field col s6\">\n          <textarea id=\"explain_ans\" class=\"materialize-textarea\">For the Edit view, this will be pre-filled with the current explination</textarea>\n          <label for=\"explain_ans\">Why are you asking explination</label>\n        </div>\n      </div>\n      <div class=\"row\">\n            <div class=\"input-field col s12\">\n    <select>\n      <option value=\"\" disabled selected>Choose your category</option>\n      <option value=\"1\">Option 1</option>\n      <option value=\"2\">Option 2</option>\n      <option value=\"3\">Option 3</option>\n    </select>\n    <label>What question category does this question scor against?</label>\n  </div>\n      </div>\n      <div class=\"row\">\n      <h2>Answers</h2>\n  <ul class=\"sortable\">\n    <li id=\"line01\">\n        <div class=\"card-panel white\">\n          <textarea id=\"answer_00\" class=\"materialize-textarea\">For the Edit view, this will be pre-filled with the current question</textarea>\n        </div></li>\n    <li>\n        <div class=\"card-panel white\">\n          <textarea id=\"answer_01\" class=\"materialize-textarea\">For the Edit view, this will be pre-filled with the current question</textarea>\n        </div></li>\n        <li>\n        <div class=\"card-panel white\">\n          <textarea id=\"answer_02\" class=\"materialize-textarea\">For the Edit view, this will be pre-filled with the current question</textarea>\n        </div></li>\n        <li>\n        <div class=\"card-panel white\">\n          <textarea id=\"answer_03\" class=\"materialize-textarea\">For the Edit view, this will be pre-filled with the current question</textarea>\n        </div></li>\n        <li>\n        <div class=\"card-panel white\">\n          <textarea id=\"answer_04\" class=\"materialize-textarea\">For the Edit view, this will be pre-filled with the current question</textarea>\n        </div></li>\n  </ul>\n  </div>\n    </form>\n  </div>\n    ",
                        directives: []
                    }), 
                    __metadata('design:paramtypes', [])
                ], SingleAnswerEdit);
                return SingleAnswerEdit;
            }());
            exports_1("SingleAnswerEdit", SingleAnswerEdit);
        }
    }
});
//# sourceMappingURL=question.edit.single.ans.js.map
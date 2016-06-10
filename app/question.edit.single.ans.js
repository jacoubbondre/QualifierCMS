System.register(['angular2/core', './global.navigation'], function(exports_1, context_1) {
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
    var core_1, global_navigation_1;
    var SingleAnswerEdit;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (global_navigation_1_1) {
                global_navigation_1 = global_navigation_1_1;
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
                    $("#uploadForm").on('submit', (function (e) {
                        e.preventDefault();
                        $.ajax({
                            url: "upload.php",
                            type: "POST",
                            data: new FormData(this),
                            contentType: false,
                            cache: false,
                            processData: false,
                            beforeSend: function () {
                                //$("#preview").fadeOut();
                                console.log(this);
                                $("#err").fadeOut();
                            },
                            success: function (data) {
                                if (data == 'invalid file') {
                                    // invalid file format.
                                    $("#err").html("Invalid File !").fadeIn();
                                }
                                else {
                                    // view uploaded file.
                                    $("#preview").html(data).fadeIn();
                                    $("#uploadForm")[0].reset();
                                }
                            },
                            error: function (e) {
                                $("#err").html(e).fadeIn();
                            }
                        });
                    }));
                };
                SingleAnswerEdit = __decorate([
                    core_1.Component({
                        selector: 'question-single-answer-edit',
                        template: "\n    <div class=\"container\">\n    <global-nav></global-nav>\n  <div class=\"row\">\n    <form id=\"uploadForm\" action=\"upload.php\" method=\"post\" class=\"col s12\">\n    <p>What would you like to edit</p>\n    \n    <div class=\"file-field input-field\">\n      <div class=\"btn\">\n        <span>File</span>\n        <input type=\"file\">\n      </div>\n      <div class=\"file-path-wrapper\">\n        <input class=\"file-path validate\" type=\"text\">\n      </div>\n    </div>\n    \n    \n  <div><input id=\"clickme\" type=\"submit\"></div>\n    </form>\n  </div>\n  </div>\n    ",
                        directives: [global_navigation_1.GlobalNav]
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
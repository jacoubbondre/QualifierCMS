System.register(['angular2/core', './services/upload.service'], function(exports_1, context_1) {
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
    var core_1, upload_service_1;
    var SingleAnswerEdit;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (upload_service_1_1) {
                upload_service_1 = upload_service_1_1;
            }],
        execute: function() {
            SingleAnswerEdit = (function () {
                function SingleAnswerEdit(service) {
                    this.service = service;
                    this.service.progress$.subscribe(function (data) {
                        console.log('progress = ' + data);
                    });
                }
                SingleAnswerEdit.prototype.onChange = function (event) {
                    console.log('onChange');
                    var files = event.srcElement.files;
                    console.log(files);
                    this.service.makeFileRequest('/QualifierCMS/uploads', [], files).subscribe(function () {
                        console.log('sent');
                    });
                };
                SingleAnswerEdit = __decorate([
                    core_1.Component({
                        selector: 'question-single-answer-edit',
                        template: "\n\t  <div>\n\t    <input type=\"file\" (change)=\"onChange($event)\"/>\n\t  </div>\n\t",
                        providers: [upload_service_1.UploadService]
                    }), 
                    __metadata('design:paramtypes', [upload_service_1.UploadService])
                ], SingleAnswerEdit);
                return SingleAnswerEdit;
            }());
            exports_1("SingleAnswerEdit", SingleAnswerEdit);
        }
    }
});
//# sourceMappingURL=question.edit.single.ans.js.map
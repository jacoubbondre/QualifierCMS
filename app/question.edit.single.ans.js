System.register(['angular2/core', './services/upload.service', 'angular2/common'], function(exports_1, context_1) {
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
    var core_1, upload_service_1, common_1;
    var SingleAnswerEdit;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (upload_service_1_1) {
                upload_service_1 = upload_service_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            SingleAnswerEdit = (function () {
                function SingleAnswerEdit(fb) {
                    this.loginForm = fb.group({
                        file: [""]
                    });
                }
                SingleAnswerEdit.prototype.upload = function () {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        var formData = new FormData(), xhr = new XMLHttpRequest();
                        formData = _this.loginForm.file.value;
                        console.log("Form Data = " + formData);
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === 4) {
                                if (xhr.status === 200) {
                                    resolve(xhr.response);
                                }
                                else {
                                    reject(xhr.response);
                                }
                            }
                        };
                        FileUploadService.setUploadUpdateInterval(500);
                        xhr.upload.onprogress = function (event) {
                            _this.progress = Math.round(event.loaded / event.total * 100);
                            _this.progressObserver.next(_this.progress);
                        };
                        xhr.open('POST', 'http://localhost:8888/QualifierCMS/upload.php', true);
                        xhr.send(formData);
                    });
                };
                SingleAnswerEdit.prototype.ngAfterViewInit = function () {
                    $('#clickMe').click(this.upload());
                };
                SingleAnswerEdit = __decorate([
                    core_1.Component({
                        selector: 'question-single-answer-edit',
                        template: "\n\t  <div>\n    <form [ngFormModel]=\"loginForm\" >\n    <input ngControl=\"file\" type=\"file\">\n    <button id=\"clickMe\">Click</button>\n    </form>\n    </div>\n\t",
                        providers: [upload_service_1.UploadService]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder])
                ], SingleAnswerEdit);
                return SingleAnswerEdit;
            }());
            exports_1("SingleAnswerEdit", SingleAnswerEdit);
        }
    }
});
//# sourceMappingURL=question.edit.single.ans.js.map
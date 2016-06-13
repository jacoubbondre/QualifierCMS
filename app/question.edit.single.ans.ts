import {Component, Input, Inject} from 'angular2/core'
import {GlobalNav} from './global.navigation'
import {UploadService} from './services/upload.service'
import { FormBuilder, Validators } from 'angular2/common';

declare var Materialize;

@Component({
    selector: 'question-single-answer-edit',
    template: `
	  <div>
    <form [ngFormModel]="loginForm" >
    <input ngControl="file" type="file">
    <button id="clickMe">Click</button>
    </form>
    </div>
	`,
	providers: [ UploadService ]
})
export class SingleAnswerEdit {
  constructor(fb: FormBuilder) {
    this.loginForm = fb.group({
      file: [""]
    });
  }

  public upload (): Promise<any> {
    return new Promise((resolve, reject) => {
        let formData: FormData = new FormData(),
            xhr: XMLHttpRequest = new XMLHttpRequest();

        
            formData = this.loginForm.file.value;
            console.log("Form Data = " + formData);
                   

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.response);
                }
            }
        };

        FileUploadService.setUploadUpdateInterval(500);

        xhr.upload.onprogress = (event) => {
            this.progress = Math.round(event.loaded / event.total * 100);

            this.progressObserver.next(this.progress);
        };

        xhr.open('POST', 'http://localhost:8888/QualifierCMS/upload.php', true);
        xhr.send(formData);
    });
}
private ngAfterViewInit() {
        $('#clickMe').click(this.upload());
    }

}
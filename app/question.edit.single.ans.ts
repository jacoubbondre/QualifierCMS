import {Component, Input, Inject} from 'angular2/core'
import {GlobalNav} from './global.navigation'
import {UploadService} from './services/upload.service'
import { FormBuilder, Validators } from 'angular2/common';
import {Http, URLSearchParams, Headers} from 'angular2/http';

declare var Materialize;

@Component({
    selector: 'question-single-answer-edit',
    template: `
	  <div>
    <form  #imageFrom="ngForm" >
    <input ngControl="file" type="file">
    <input type="file" (change)="onChange($event)"/>
    <input type="submit" value="Submit">
    </form>
    </div>
	`,
	providers: [ UploadService ]
})
export class SingleAnswerEdit {
  
  constructor(private service:UploadService) {
    this.service.progress$.subscribe(
      data => {
        console.log('progress = '+data);
      });
  }
  
  onChange(event) {
    console.log('onChange');
    var files = event.srcElement.files;
    console.log(files);
    this.service.makeFileRequest('http://localhost:8888/QualifierCMS/upload.php', [], files).subscribe(() => {
      console.log('sent');
    });
  }
}

/* 

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

 */
import {Component, Input, Inject} from 'angular2/core'
import {GlobalNav} from './global.navigation'
import {UploadService} from './services/upload.service'

declare var Materialize;

@Component({
    selector: 'question-single-answer-edit',
    template: `
	  <div>
	    <input type="file" (change)="onChange($event)"/>
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
    this.service.makeFileRequest('/QualifierCMS/uploads', [], files).subscribe(() => {
      console.log('sent');
    });
  }
}
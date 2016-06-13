import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {Http, HTTP_PROVIDERS} from 'angular2/http'

@Injectable()
export class UploadService {
  constructor () {
    this.progress$ = Observable.create(observer => {
        this.progressObserver = observer
    }).share();
  }

  private makeFileRequest (url: string, params: string[], files: File[]): Observable {
    return Observable.create(observer => {
        let formData: FormData = new FormData(),
            xhr: XMLHttpRequest = new XMLHttpRequest();

        for (let i = 0; i < files.length; i++) {
            formData.append("uploads[]", files[i], files[i].name);
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    observer.next(xhr.response);
                    console.log(xhr.response);
                    observer.complete();
                } else {
                    observer.error(xhr.response);
                }
            }
        };

        xhr.upload.onprogress = (event) => {
            this.progress = Math.round(event.loaded / event.total * 100);

            this.progressObserver.next(this.progress);
        };
        console.log("Sending Post Data: " + formData);
        xhr.open('POST', 'http://localhost:8888/QualifierCMS/upload.php', true);
        xhr.send(formData);
    });
  }
}
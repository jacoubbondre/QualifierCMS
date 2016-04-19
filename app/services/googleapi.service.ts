
import {Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS, Response} from 'angular2/http';
import 'rxjs/Rx'
import {Logger} from './logger.service'

@Injectable()
export class GoogleApi {
	public description: string

	constructor(private http: Http, private logger: Logger) {
		this.http = http
		this.logger = logger
	}
	video(id, cb) {
		var params = {
			id: id,
			part: 'snippet',
			key: 'AIzaSyAzWTgldNKQqc8MPajiWHPhJ6UI6SPdaSE'
		}

		this.http.get(this.constructURL('https://www.googleapis.com/youtube/v3/videos', params))
			.map((res: Response) => res.json())
			.subscribe(
				data => { cb(data, false) },
				err => cb(false, err)
			)
	}

	initialize(data) {
		//assumes 1 result
		data = data.items[0];
		console.log(data);
		this.description = data.snippet.description.replace(/\\n/g, '');
	}

	constructURL(url, params) {
		var r: string = '';
		for (var i in params) {
			r += i + '=' + params[i] + '&'
		}
		return url + '?' + r
	}
}
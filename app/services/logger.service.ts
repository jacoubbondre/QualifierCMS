
import {Injectable} from 'angular2/core';

@Injectable()
export class LoggerService {
	log(s) {
		console.log(s)
	}

	error(s) {
		console.error(s)
	}
}
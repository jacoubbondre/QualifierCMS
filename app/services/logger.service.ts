
import {Injectable} from 'angular2/core';

@Injectable()
export class Logger {
	log(s) {
		console.log(s)
	}

	error(s) {
		console.error(s)
	}
}
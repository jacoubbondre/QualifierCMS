
import {Injectable} from '@angular/core';

@Injectable()
export class LoggerService {
	log(s) {
		console.log(s)
	}

	error(s) {
		console.error(s)
	}
}
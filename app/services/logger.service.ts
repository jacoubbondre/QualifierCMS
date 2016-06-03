import {Injectable} from '@angular/core';

@Injectable()
export class LoggerService {
	log(...args) {
		if (typeof args[0] === 'object' && 'arguments' in args[0]) {
			//passed the caller object
			var name = args[0].arguments.name
			args = args.splice(0,1)
			console.log(name, args)
		} else {
			if (args.length == 1) {
				console.log(args[0])
			} else {
				console.log(args)
			}
		}
	}

	error(...args) {
		if (typeof args[0] === 'object' && 'arguments' in args[0]) {
			//passed the caller object
			var name = args[0].arguments.name
			args = args.splice(0, 1)
			console.error(name, args)
		} else {
			if (args.length == 1) {
				console.error(args[0])
			} else {
				console.error(args)
			}
		}
	}
}
import {Injectable, provide, EventEmitter} from '@angular/core'
import {LoggerService} from './logger.service'

@Injectable()
export class BreakpointService {
	public breakpoints
	public breakpoint
	private widths
	private debug
	private init
	private window

	public event$: EventEmitter<any>

	constructor(private logger: LoggerService) {
		this.breakpoints = {}
		this.widths = {}
		this.debug = false
		this.init = false

		this.event$ = new EventEmitter()
	}

	public afterViewInit() {
		let self = this
		this.window = window
		this.window.onresize = function(e) {
			self.update.call(self, e)
		}
		this.update(undefined)
	}

	public debugMode(b:boolean) {
		this.debug = b
		if (b) this.logger.log(this, 'Now in debug mode')
	}

	public is(keyword: string) {
		return this.breakpoint && 'name' in this.breakpoint && this.breakpoint.name == keyword
	}

	public add(keyword: string, width: number) {
		if (!(keyword in this.breakpoints) && (!!width)) {
			var obj = {
				width: width
			}
			this.widths[width] = keyword
			this.breakpoints[keyword] = obj
		}
	}

	public remove(keyword:string) {
		if (keyword in this.breakpoints) {
			delete this.breakpoints[keyword]
		}
		for (var i in this.widths) {
			if (this.widths[i].name == keyword) delete this.widths[i]
		}
	}

	private emit() {
		this.event$.next(
			this.breakpoint
		)
	}

	private update(evt) {
		var window = this.getWindow()
		for (var curKey in this.widths) {
			let widthKeys = Object.keys(this.widths)
			let curObjectKey = widthKeys.indexOf(curKey)
			let lastKey = widthKeys[curObjectKey - 1]
			let nextKey = widthKeys[curObjectKey + 1]

			let lastName = this.widths[lastKey]
			let curName = this.widths[curKey]
			let nextName = this.widths[nextKey]

			let lastWidth = parseInt(lastKey)
			let curWidth = parseInt(curKey)
			let nextWidth = parseInt(nextKey)

			let breakpoint = this.breakpoints[curName]
			breakpoint.name = curName

			if (this.breakpoint && breakpoint.name == this.breakpoint.name) continue

			if (!lastKey) {
				if (window.width <= curWidth) {
					doEmit.call(this, breakpoint)
				}
			} else if (!nextKey) {
				if (window.width >= curWidth) {
					doEmit.call(this, breakpoint)
				}
			} else {
				if (window.width > lastWidth && window.width < nextWidth) {
					doEmit.call(this, breakpoint)
				}
			}
		}

		this.init = true

		function doEmit(b) {
			this.breakpoint = b
			if (this.init) this.emit(b)
			if (this.debug) this.logger.log(this, b)
		}
	}

	private getWindow() {
		let w = this.window,
			d = document,
			e = d.documentElement,
			g = d.getElementsByTagName('body')[0];

		return {
			width: w.innerWidth || e.clientWidth || g.clientWidth,
			height: w.innerHeight || e.clientHeight || g.clientHeight
		}
	}
}
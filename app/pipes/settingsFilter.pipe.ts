import {Pipe, PipeTransform, Injectable} from '@angular/core'

@Pipe({
	name: 'settingsFilter'
})
@Injectable()
export class SettingsFilterPipe implements PipeTransform {
	private ignoredSettings = ['backtoresults']

	transform(items) {
		return items.filter(item => this.ignoredSettings.indexOf(item.name) == -1)
	}
}
import {Pipe, PipeTransform, Injectable} from '@angular/core'
import {Settings} from '../settings'

@Pipe({
	name: 'editableSettings'
})
@Injectable()
export class EditableSettingsPipe implements PipeTransform {
	private settings = Settings.get()
	transform(items) {
		return items.filter(item => this.settings['application_settings'].uneditable.indexOf(item.name) == -1)
	}
}
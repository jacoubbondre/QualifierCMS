import { Pipe, PipeTransform } from '@angular/core'
import {I18nService} from '../services/i18n.service'

@Pipe({
	name: 'translate',
	pure: false		//enable execution on every component change detection cycle, since i18n data relies on an async request
})
export class InternationalizationPipe implements PipeTransform {
  constructor(private i18n: I18nService) {}

  transform(value:string): string {
    return this.i18n.translate(value.toLowerCase()) || value
  }
}
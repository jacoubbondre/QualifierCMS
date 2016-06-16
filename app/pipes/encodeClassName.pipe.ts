import {Pipe, PipeTransform, Injectable} from '@angular/core'

@Pipe({
	name: 'encodeClassName'
})
@Injectable()
export class EncodeClassNamePipe implements PipeTransform {
	transform(item:string) {
		return item.replace(/ /g, '-').replace(/[^\w\s]/g, '').toLowerCase()
	}
}
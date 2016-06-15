import {Component, Input, Inject, forwardRef, Output, EventEmitter} from '@angular/core'
import {Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated'


declare var Materialize;

@Component({
  selector: 'ui-brand-list-lastmodified',
  template: `
      <lol></lol>
    `,
  directives: [ROUTER_DIRECTIVES]
})
export class UIBrandListLastModified {
  @Input() categories
  @Input() config
  @Input() data
  @Output() onOrderChange = new EventEmitter()
  private _onConfigChanged: any

  private movable
  private editable
  private hideable
  private hidden

  constructor(private router: Router) {
    this.movable = true
    this.editable = true
    this.hideable = true
    this.hidden = false
  }

  private hide() {
    this.hidden = true
  }

  private show() {
    this.hidden = false
  }

  private ngAfterViewInit() {
    Materialize.updateTextFields();
  }

  private onDragSuccess() {
    this.onOrderChange.emit(undefined)
  }

  private getListColor(category) {
    return this.config.listColorIsAlternate(this.categories, category)
  }

  private navigateToCategory(category: string) {
    console.log(category)
    this.router.navigate(['Category', { category: category }])
  }
}
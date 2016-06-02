import {Component, Input, Inject, forwardRef} from '@angular/core'
import {Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated'

declare var Materialize;

@Component({
  selector: 'ui-category-list-item',
  template: `
      <div class="category-container">
        <div class="icon"><i class="material-icons move-icon" *ngIf="movable">menu</i></div>
        <div class="title">{{title}}</div>
        <a href="#" [routerLink]="['/EditQuestion', {category: category, question: title}]">
          <div class="icon"><i class="material-icons edit-icon" *ngIf="editable">edit</i></div>
        </a>
      </div>
    `,
  directives: [ROUTER_DIRECTIVES]
})
export class UICategoryListItem {
  @Input() title
  @Input() category
  private movable
  private editable

  constructor( private router: Router) {
    this.movable = true
    this.editable = true
  }

  private ngAfterViewInit() {
    Materialize.updateTextFields();
  }
}
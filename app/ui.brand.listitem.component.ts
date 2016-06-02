import {Component, Input, Inject, forwardRef} from '@angular/core'
import {Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated'

declare var Materialize;

@Component({
  selector: 'ui-brand-list-item',
  template: `
      <div class="category-container">
        <div class="icon"><i class="material-icons move-icon" *ngIf="movable">menu</i></div>
        <div class="title">{{data.category}}</div>
        <a href="#" [routerLink]="['/EditCategory', {category: data.category}]">
          <div class="icon"><i class="material-icons edit-icon" *ngIf="editable">edit</i></div>
        </a>
      </div>

      <div class="subcategory" *ngIf="!!data.subcategories && data.subcategories.length">
        <div class="category-container" *ngFor="let subcategory of data.subcategories; let i = index">
              <div class="icon"><i class="material-icons move-icon" *ngIf="movable">menu</i></div>
              <div class="title category">{{subcategory.category}}</div>
              <a href="#" [routerLink]="['/EditCategory', {category: data.subcategories[i].category}]">
                <div class="icon"><i class="material-icons edit-icon" *ngIf="editable">edit</i></div>
              </a>
        </div>
      </div>
    `,
  directives: [ROUTER_DIRECTIVES]
})
export class UIBrandListItem {
  @Input() data
  private movable
  private editable

  constructor( private router: Router) {
    this.movable = true
    this.editable = true
  }

  private ngAfterViewInit() {
    Materialize.updateTextFields();
  }

  private navigateToCategory(category: string) {
    console.log(category)
    this.router.navigate(['Category', {category: category}])
  }
}
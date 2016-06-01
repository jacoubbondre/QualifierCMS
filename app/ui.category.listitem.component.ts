import {Component, Input, Inject, forwardRef} from '@angular/core'
import {Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated'

declare var Materialize;

@Component({
  selector: 'ui-category-list-item',
  template: `
      <i class="material-icons move-icon" *ngIf="movable">menu</i>
      <div>{{data.category}}</div>

      <div class="title" *ngIf="!!data.titles && data.titles.length">
        <div *ngFor="let title of data.titles">
          <i class="material-icons move-icon" *ngIf="movable">menu</i>
          <div>{{title}}</div>
        </div>
      </div>

      <div class="subcategory" *ngIf="!!data.subcategories && data.subcategories.length">
        <div *ngFor="let subcategory of data.subcategories; let i = index">
          <a href="#" (click)="navigateToCategory(data.subcategories[i].category)">
            <div>
              <i class="material-icons move-icon" *ngIf="movable">menu</i>
              <div class="category">{{subcategory.category}}</div>
            </div>
          </a>
        </div>
      </div>
    `,
  directives: [ROUTER_DIRECTIVES]
})
export class UICategoryListItem {
  @Input() data
  private movable

  constructor( @Inject(forwardRef(() => Router)) private router: Router) {
    this.movable = true
  }

  private ngAfterViewInit() {
    Materialize.updateTextFields();
  }



  ngOnChanges(changes) {
    console.log(changes.data.currentValue)
  }

  private navigateToCategory(category: string) {
    console.log(category)
    this.router.navigate(['Category', {category: category}])
  }
}
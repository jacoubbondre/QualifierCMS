import {Component, Input, Inject, forwardRef, Output, EventEmitter} from '@angular/core'
import {Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated'
import {DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd'

declare var Materialize;

@Component({
  selector: 'ui-brand-list-item',
  template: `
      <div class="category-container">
        <div class="icon"><i class="material-icons move-icon" *ngIf="movable">menu</i></div>
        <div class="title">{{data.category}}</div>
        <div class="icon"><i class="material-icons hide-icon {{hidden ? 'hidden' : ''}}" *ngIf="hideable" (click)="hidden ? show() : hide()">visibility</i></div>
        <a href="#" [routerLink]="['/EditCategory', {category: data.category}]">
          <div class="icon"><i class="material-icons edit-icon" *ngIf="editable">edit</i></div>
        </a>
      </div>

      <div class="subcategory" *ngIf="!!data.subcategories && data.subcategories.length" dnd-sortable-container [sortableData]="data.subcategories" [dropZones]="['test']">
        <div class="category-container {{listColorIsAlternate(subcategory) ? 'odd':'even'}}" *ngFor="let subcategory of data.subcategories; let i = index" [sortableIndex]="i" dnd-sortable (onDragSuccess)="onDragSuccess()">
              <div class="icon"><i class="material-icons move-icon" *ngIf="movable">menu</i></div>
              <div class="title category">{{subcategory.category}}</div>
              <a href="#" [routerLink]="['/EditCategory', {category: data.subcategories[i].category}]">
                <div class="icon"><i class="material-icons edit-icon" *ngIf="editable">edit</i></div>
              </a>
        </div>
      </div>
    `,
  directives: [ROUTER_DIRECTIVES, DND_DIRECTIVES]
})
export class UIBrandListItem {
  @Input() data
  @Input() categories
  @Input() config
  @Output() onOrderChange = new EventEmitter()

  private movable
  private editable
  private hideable
  private hidden

  constructor( private router: Router) {
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

  private navigateToCategory(category: string) {
    console.log(category)
    this.router.navigate(['Category', {category: category}])
  }

  listColorIsAlternate(cat) {
    return this.config.listColorIsAlternate(this.categories, cat)
  }
}
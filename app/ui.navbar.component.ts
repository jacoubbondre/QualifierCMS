import {Component, Input, Inject} from '@angular/core'
import {StoreService} from './services/store.service'

declare var Materialize;

@Component({
  selector: 'ui-navbar',
  template: `
    <div class="navbar-fixed">
       <nav>
         <div class="nav-wrapper">
           <ul class="left">
             <li><a class="waves-effect waves-light" href="/"><i class="material-icons">menu</i></a></li>
             <li><a class="waves-effect waves-light" (click)="store.preview()"><i class="material-icons left">visibility</i>Preview Application</a></li>
             <li><a class="waves-effect waves-light"><i class="material-icons left">arrow_downward</i>Publish Application</a></li>
           </ul>
           <ul class="right">
             <li><a class="waves-effect waves-light"><i class="material-icons">more_vert</i></a></li>
           </ul>
         </div>
       </nav>
    </div>
    `,
  directives: []
})
export class UINavbar {
  @Input() data

  constructor(private store: StoreService) {

  }
}
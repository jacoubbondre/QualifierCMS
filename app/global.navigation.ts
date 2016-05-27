import {Component, Input, Inject} from 'angular2/core'

declare var Materialize;

@Component({
    selector: 'global-nav',
    template: `<div class="row">
    <nav>
    <ul id="slide-out" class="side-nav">
      <li><a href="#!">First Sidebar Link</a></li>
      <li><a href="#!">Second Sidebar Link</a></li>
    </ul>
    <a href="#" data-activates="slide-out" class="button-collapse show-on-large"><i class="material-icons">menu</i></a>
</nav>
`,
    directives: []
})
export class GlobalNav {
    
    private ngAfterViewInit() {
        $('.button-collapse').sideNav('show');
        $('.button-collapse').sideNav({
          menuWidth: 300, // Default is 240
          edge: 'left', // Choose the horizontal origin
          closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
        }
      );
       $(".dropdown-button").dropdown();
    }
	
}

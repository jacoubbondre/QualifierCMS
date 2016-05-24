import {Component, Input, Inject} from 'angular2/core'

declare var Materialize;

@Component({
    selector: 'question-single-answer-edit',
    template: `
     <nav>
    <div class="nav-wrapper">
      <a href="#" class="brand-logo">Qualifier CMS - Single Answer Edit</a>
    </div>
  </nav>
        
    	<div class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s6">
          <input id="first_name" value="Jacoub" type="text" class="validate" maxlength="255">
          <label for="first_name">First Name</label>
        </div>
        <div class="input-field col s6">
          <input id="last_name" type="text" class="validate">
          <label for="last_name">Last Name</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="password" type="password" class="validate">
          <label for="password">Password</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="email" type="email" class="validate">
          <label for="email">Email</label>
        </div>
      </div>
    </form>
  </div>
    `,
    directives: []
})
export class SingleAnswerEdit {
    
    private ngAfterViewInit() {
        Materialize.updateTextFields();
   }
	
}
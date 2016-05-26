import {Component, Input, Inject} from 'angular2/core'

declare var Materialize;

@Component({
    selector: 'question-single-answer-edit',
    template: `
     <div class="container">
    <div class="row">
    <nav>
    <div class="nav-wrapper">
      <a href="#" class="brand-logo">Qualifier CMS - Single Answer Edit</a>
    </div>
  </nav>
  </div>
  <div class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s6">
          <textarea id="question" class="materialize-textarea">For the Edit view, this will be pre-filled with the current question</textarea>
          <label for="question">Question</label>
        </div>
        <div class="input-field col s6">
          <textarea id="subQuestion" class="materialize-textarea">For the Edit view, this will be pre-filled with the current subquestion</textarea>
          <label for="subQuestion">Sub-Question</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <textarea id="explain_title" type="text" class="materialize-textarea">For the Edit view, this will be pre-filled with the Why are you asking title</textarea>
          <label for="explain_title">Why are you asking title</label>
        </div>
        <div class="input-field col s6">
          <textarea id="explain_ans" class="materialize-textarea">For the Edit view, this will be pre-filled with the current explination</textarea>
          <label for="explain_ans">Why are you asking explination</label>
        </div>
      </div>
      <div class="row">
            <div class="input-field col s12">
    <select>
      <option value="" disabled selected>Choose your category</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </select>
    <label>What question category does this question scor against?</label>
  </div>
      </div>
      <div class="row">
  <ul class="sortable">
    <li id="line01">
        <div class="card-panel teal">
          <span class="white-text">I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively. I am similar to what is called a panel in other frameworks.
          </span>
        </div></li>
    <li>
        <div class="card-panel teal">
          <span class="white-text">I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively. I am similar to what is called a panel in other frameworks.
          </span>
        </div></li>
        <li>
        <div class="card-panel teal">
          <span class="white-text">I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively. I am similar to what is called a panel in other frameworks.
          </span>
        </div></li>
        <li>
        <div class="card-panel teal">
          <span class="white-text">I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively. I am similar to what is called a panel in other frameworks.
          </span>
        </div></li>
        <li>
        <div class="card-panel teal">
          <span class="white-text">I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively. I am similar to what is called a panel in other frameworks.
          </span>
        </div></li>
  </ul>
  </div>
    </form>
  </div>
  
  </div>
    `,
    directives: []
})
export class SingleAnswerEdit {
    
    private ngAfterViewInit() {
        Materialize.updateTextFields();
        $('select').material_select();
        $( ".sortable" ).sortable();
        $( ".sortable" ).disableSelection();
        
        $('#line01').mouseup(function(){
            console.log($('#line01').index());
        });
   }
	
}
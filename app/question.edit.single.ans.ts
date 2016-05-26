import {Component, Input, Inject} from 'angular2/core'

declare var Materialize;

@Component({
    selector: 'question-single-answer-edit',
    template: `
    <div class="row">
    <nav>
    <ul id="slide-out" class="side-nav">
      <li><a href="#!">First Sidebar Link</a></li>
      <li><a href="#!">Second Sidebar Link</a></li>
      <li class="no-padding">
        <ul class="collapsible collapsible-accordion">
          <li>
            <a class="collapsible-header">Dropdown<i class="mdi-navigation-arrow-drop-down"></i></a>
            <div class="collapsible-body">
              <ul>
                <li><a href="#!">First</a></li>
                <li><a href="#!">Second</a></li>
                <li><a href="#!">Third</a></li>
                <li><a href="#!">Fourth</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </li>
    </ul>
    <ul class="right hide-on-med-and-down">
      <li><a href="#!">First Sidebar Link</a></li>
      <li><a href="#!">Second Sidebar Link</a></li>
      <li><a class="dropdown-button" href="#!" data-activates="dropdown1">Dropdown<i class="mdi-navigation-arrow-drop-down right"></i></a></li>
      <ul id='dropdown1' class='dropdown-content'>
        <li><a href="#!">First</a></li>
        <li><a href="#!">Second</a></li>
        <li><a href="#!">Third</a></li>
        <li><a href="#!">Fourth</a></li>
      </ul>
    </ul>
    <a href="#" data-activates="slide-out" class="button-collapse"><i class="mdi-navigation-menu">hello</i></a>
</nav>
  </div>
  <div class="row">
    <form class="col s12">
    <p>What would you like to edit</p>
    <h2>Question</h2>
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
      <h2>Answers</h2>
  <ul class="sortable">
    <li id="line01">
        <div class="card-panel white">
          <textarea id="answer_00" class="materialize-textarea">For the Edit view, this will be pre-filled with the current question</textarea>
        </div></li>
    <li>
        <div class="card-panel white">
          <textarea id="answer_01" class="materialize-textarea">For the Edit view, this will be pre-filled with the current question</textarea>
        </div></li>
        <li>
        <div class="card-panel white">
          <textarea id="answer_02" class="materialize-textarea">For the Edit view, this will be pre-filled with the current question</textarea>
        </div></li>
        <li>
        <div class="card-panel white">
          <textarea id="answer_03" class="materialize-textarea">For the Edit view, this will be pre-filled with the current question</textarea>
        </div></li>
        <li>
        <div class="card-panel white">
          <textarea id="answer_04" class="materialize-textarea">For the Edit view, this will be pre-filled with the current question</textarea>
        </div></li>
  </ul>
  </div>
    </form>
  </div>
    `,
    directives: []
})
export class SingleAnswerEdit {
    
    private ngAfterViewInit() {
        Materialize.updateTextFields();
        $('select').material_select();
        $( ".sortable" ).sortable({});
        $( ".sortable" ).disableSelection();
        
        $('#line01').mouseup(function(){
            setTimeout(function(){console.log($('#line01').index())},500)
        });
        $('.button-collapse').sideNav('show');
        $('.button-collapse').sideNav({
          menuWidth: 300, // Default is 240
          edge: 'left', // Choose the horizontal origin
          closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
        }
      );
    }
	
}
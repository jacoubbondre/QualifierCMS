import {Component, Input, Inject} from 'angular2/core'
import {GlobalNav} from './global.navigation'

declare var Materialize;

@Component({
    selector: 'question-single-answer-edit',
    template: `
    <div class="container">
    <global-nav></global-nav>
  <div class="row">
    <form id="uploadForm" action="upload.php" method="post" class="col s12">
    <p>What would you like to edit</p>
    
    <div class="file-field input-field">
      <div class="btn">
        <span>File</span>
        <input type="file">
      </div>
      <div class="file-path-wrapper">
        <input class="file-path validate" type="text">
      </div>
    </div>
    
    
  <div><input id="clickme" type="submit"></div>
    </form>
  </div>
  </div>
    `,
    directives: [GlobalNav]
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

        $("#uploadForm").on('submit',(function(e) {
          e.preventDefault();
          $.ajax({
                url: "upload.php",
          type: "POST",
          data:  new FormData(this),
          contentType: false,
                cache: false,
          processData:false,
          beforeSend : function()
          {
            //$("#preview").fadeOut();
            console.log(this);
            $("#err").fadeOut();
          },
          success: function(data)
              {
            if(data=='invalid file')
            {
            // invalid file format.
            $("#err").html("Invalid File !").fadeIn();
            }
            else
            {
            // view uploaded file.
            $("#preview").html(data).fadeIn();
            $("#uploadForm")[0].reset(); 
            }
              },
            error: function(e) 
              {
            $("#err").html(e).fadeIn();
              }          
            });
        }));
    }
	
}
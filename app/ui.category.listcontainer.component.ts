import {Component, Input, Inject, forwardRef} from '@angular/core'
import {StoreService} from './services/store.service'
import {Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated'
import {DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd'
import {EncodeClassNamePipe} from './pipes/encodeClassName.pipe'

declare var Materialize

@Component({
  selector: 'ui-category-list-container',
  template: `
    <a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></a>
    <div class="table-head table-row">
        <div class="table-column table-title"><p>Question</p></div>
        <div class="table-column table-title"><p>Type</p></div>
        <div class="table-column table-title"><p>Feature Group</p></div>
        <div class="table-column table-title"><p>Last Modified</p></div>
    </div>
    <div class="table-body" dnd-sortable-container [sortableData]="questions" [dropZones]="['brand']">

          <div class="table-row" *ngFor="let question of questions; let i = index; let o = odd" [sortableIndex]="i" dnd-sortable (onDragSuccess)="onQuestionReorder()">

              <div class="table-column-wrapper question {{o ? 'odd':'even'}}">
                  <div class="table-column">
                      <div class="icon"><i class="material-icons move-icon">reorder</i></div>
                      <div class="icon folder-icon-wrapper"><div><i class="material-icons folder-icon">description</i></div></div>
                      <div class="title truncate"><p class="truncate">{{question.question}}</p></div>
                  </div>

                  <div class="table-column">
                    <div class="type"><p>{{question.type}}</p></div>
                  </div>

                  <div class="table-column">
                    <div class="type"><p>{{question.feature}}</p></div>

                    <div class="icon-action-wrapper">
                          <a class="waves-effect tooltipped" href="#" data-position="left" data-delay="50" [attr.data-tooltip]="hidden ? 'show' : 'hide'">
                              <div class="icon"><i class="material-icons hide-icon {{hidden ? 'hidden' : ''}}" (click)="hidden ? show() : hide()">visibility</i></div>
                          </a>
                          <a class="waves-effect tooltipped" href="#modal-{{question.feature | encodeClassName}}" (click)="onDelete($event,question)" data-position="left" data-delay="50" data-tooltip="delete">
                            <div class="icon"><i class="material-icons delete-icon">delete</i></div>
                          </a>
                          <a class="waves-effect tooltipped" href="#" [routerLink]="['/EditQuestion', {category: category, question: question}]" data-position="left" data-delay="50" data-tooltip="edit">
                            <div class="icon"><i class="material-icons edit-icon">edit</i></div>
                          </a>
                      </div>
                  </div>

                  <div class="table-column">
                      <div class="date"><p>Date</p></div>
                  </div>

                  <div id="modal-{{question.feature | encodeClassName}}" class="modal">
                      <div class="modal-content">
                          <h4>Are you sure?</h4>
                          <p>Are you sure you want to delete the question titled "{{question.question}}" from {{category}}?</p>
                      </div>
                      <div class="modal-footer">
                        <a href="#!" (click)="$event.preventDefault()" class="modal-action modal-close waves-effect waves-red btn-flat">Cancel</a>
                        <a href="#!" (click)="onDeleteConfirm($event,question)" class="modal-action modal-close waves-effect waves-green btn-flat">Yes, delete it</a>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    `,
  directives: [DND_DIRECTIVES, ROUTER_DIRECTIVES],
  pipes: [EncodeClassNamePipe],
  providers: [EncodeClassNamePipe]
})
export class UICategoryListContainer {
  private _onConfigChanged: any
  @Input() questions
  @Input() category
  private config

  constructor(private store:StoreService, private encodeClassNamePipe: EncodeClassNamePipe) {
    this.questions = []
    this._onConfigChanged = this.store.onConfigChange
      .subscribe(config => this.onConfigChange(config))
    this.config = this.store.getConfig(undefined)
  }

  ngAfterViewInit() {
    $('.tooltipped').tooltip({delay: 50})
  }

  onDelete(e,question) {
    e.preventDefault()
    var className = this.encodeClassNamePipe.transform(question.feature)
    $(`#modal-${className}`).openModal()
  }

  onDeleteConfirm(e,question) {
    e.preventDefault()

    console.log('DELETED')
  }

  onQuestionReorder() {
    // this.config.setQuestions(this.questions)
    // this.store.saveConfig()
  }

  onConfigChange(config) {
    this.config = config
    this.questions = config.getQuestions()
  }
}
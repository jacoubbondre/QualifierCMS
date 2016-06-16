import {Component, Input, Inject} from '@angular/core'
import {StoreService} from './services/store.service'
import {Router} from '@angular/router-deprecated'

declare var Materialize;

@Component({
  selector: 'preloader',
  template: `
      <div class="progress-wrapper row">
          <div class="col s6 offset-s3">
              <div class="progress">
                <div class="indeterminate"></div>
              </div>
          </div>
      </div>
    `
})
export class Preloader {
  private _onConfigChanged: any

  constructor(private store: StoreService, private router: Router) {
    this._onConfigChanged = this.store.onConfigChange
      .subscribe(config => this.onConfigChange(config))
  }

  onConfigChange(config) {
    this.router.navigate(['BrandEdit']);
  }
}
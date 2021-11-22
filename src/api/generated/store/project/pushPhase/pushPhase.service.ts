/* tslint:disable:max-line-length */
/**
 * Api Documentation
 * 1.0
 * Api Documentation
 * urn:tos
 * Apache 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 * localhost:8080
 */

import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectService} from '../../../controllers/Project';

@Injectable()
export class PushPhaseFormService {
  form: FormGroup;
  constructor(
    private projectService: ProjectService,
  ) {
    this.form = new FormGroup({
      id: new FormControl(undefined, [Validators.required]),
      pushToNext: new FormControl(undefined, [Validators.required]),
    });
  }

  submit(raw = false) {
    const data = raw ?
      this.form.getRawValue() :
      this.form.value;
    return this.projectService.pushPhase(data);
  }
}

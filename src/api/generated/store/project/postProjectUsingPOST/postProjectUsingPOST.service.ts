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
export class PostProjectUsingPOSTFormService {
  form: FormGroup;
  constructor(
    private projectService: ProjectService,
  ) {
    this.form = new FormGroup({
      project: new FormGroup({
        comment: new FormControl(undefined, []),
        createdAt: new FormControl(undefined, []),
        createdBy: new FormControl(undefined, []),
        id: new FormControl(undefined, []),
        note: new FormControl(undefined, []),
        subTitle: new FormControl(undefined, []),
        title: new FormControl(undefined, []),
      }, [Validators.required]),
    });
  }

  submit(raw = false) {
    const data = raw ?
      this.form.getRawValue() :
      this.form.value;
    return this.projectService.postProjectUsingPOST(data);
  }
}

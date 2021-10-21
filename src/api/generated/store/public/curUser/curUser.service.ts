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
import {FormControl, FormGroup} from '@angular/forms';
import {PublicService} from '../../../controllers/Public';

@Injectable()
export class CurUserFormService {
  form: FormGroup;
  constructor(
    private publicService: PublicService,
  ) {
    this.form = new FormGroup({
      name: new FormControl(undefined, []),
    });
  }

  submit(raw = false) {
    const data = raw ?
      this.form.getRawValue() :
      this.form.value;
    return this.publicService.curUser(data);
  }
}
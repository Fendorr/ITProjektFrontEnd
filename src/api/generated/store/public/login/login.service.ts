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
import {PublicService} from '../../../controllers/Public';

@Injectable()
export class LoginFormService {
  form: FormGroup;
  constructor(
    private publicService: PublicService,
  ) {
    this.form = new FormGroup({
      loginDto: new FormGroup({
        email: new FormControl(undefined, []),
        password: new FormControl(undefined, []),
      }, [Validators.required]),
    });
  }

  submit(raw = false) {
    const data = raw ?
      this.form.getRawValue() :
      this.form.value;
    return this.publicService.login(data);
  }
}

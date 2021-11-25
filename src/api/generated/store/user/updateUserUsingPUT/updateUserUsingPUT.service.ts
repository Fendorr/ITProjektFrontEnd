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
import {FormArrayExtended} from '../../../common/formArrayExtended';
import {UserService} from '../../../controllers/User';

@Injectable()
export class UpdateUserUsingPUTFormService {
  form: FormGroup;
  constructor(
    private userService: UserService,
  ) {
    this.form = new FormGroup({
      id: new FormControl(undefined, [Validators.required]),
      pw: new FormControl(undefined, [Validators.required]),
      userDto: new FormGroup({
        activeProject: new FormControl(undefined, []),
        createdAt: new FormControl(undefined, []),
        email: new FormControl(undefined, []),
        faculty: new FormControl(undefined, []),
        firstName: new FormControl(undefined, []),
        id: new FormControl(undefined, []),
        lastName: new FormControl(undefined, []),
        likedProjects: new FormArrayExtended(() => (
          new FormControl(undefined, [])), [], []),
        projectInvites: new FormArrayExtended(() => (
          new FormControl(undefined, [])), [], []),
        sentApplications: new FormArrayExtended(() => (
          new FormControl(undefined, [])), [], []),
        tags: new FormArrayExtended(() => (
          new FormControl(undefined, [])), [], []),
        type: new FormControl(undefined, []),
      }, [Validators.required]),
    });
  }

  submit(raw = false) {
    const data = raw ?
      this.form.getRawValue() :
      this.form.value;
    return this.userService.updateUserUsingPUT(data);
  }
}

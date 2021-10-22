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
import {ProjectService} from '../../../controllers/Project';

@Injectable()
export class PostProjectUsingPOSTFormService {
  form: FormGroup;
  constructor(
    private projectService: ProjectService,
  ) {
    this.form = new FormGroup({
      project: new FormGroup({
        adminId: new FormControl(undefined, []),
        comment: new FormControl(undefined, []),
        createdAt: new FormControl(undefined, []),
        createdBy: new FormControl(undefined, []),
        currUser: new FormControl(undefined, []),
        id: new FormControl(undefined, []),
        maxUser: new FormControl(undefined, []),
        members: new FormArrayExtended(() => (
          new FormControl(undefined, [])), [], []),
        note: new FormControl(undefined, []),
        professorId: new FormControl(undefined, []),
        projectApplicants: new FormArrayExtended(() => (
          new FormControl(undefined, [])), [], []),
        projectLikes: new FormArrayExtended(() => (
          new FormControl(undefined, [])), [], []),
        subTitle: new FormControl(undefined, []),
        tags: new FormArrayExtended(() => (
          new FormControl(undefined, [])), [], []),
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

/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Api Documentation
 * 1.0
 * Api Documentation
 * urn:tos
 * Apache 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 * localhost:8080
 */

import {HttpErrorResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {GetProjectByIdUsingGETParams} from '../../../../controllers/Project';
import * as __model from '../../../../model';

export enum Actions {
  START = '[Project getProjectByIdUsingGET] Start',
  SUCCESS = '[Project getProjectByIdUsingGET] Success',
  ERROR = '[Project getProjectByIdUsingGET] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: GetProjectByIdUsingGETParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: __model.ProjectDTO) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type GetProjectByIdUsingGETAction = Start | Success | Error;

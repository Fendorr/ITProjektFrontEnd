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
import {GetUserByIdUsingGETParams} from '../../../../controllers/User';
import * as __model from '../../../../model';

export enum Actions {
  START = '[User getUserByIdUsingGET] Start',
  SUCCESS = '[User getUserByIdUsingGET] Success',
  ERROR = '[User getUserByIdUsingGET] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: GetUserByIdUsingGETParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: __model.UserDTO) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type GetUserByIdUsingGETAction = Start | Success | Error;

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
import {UserParams} from '../../../../controllers/Public';

export enum Actions {
  START = '[Public user] Start',
  SUCCESS = '[Public user] Success',
  ERROR = '[Public user] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: UserParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: string) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type UserAction = Start | Success | Error;

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
import {LoginParams} from '../../../../controllers/Public';

export enum Actions {
  START = '[Public login] Start',
  SUCCESS = '[Public login] Success',
  ERROR = '[Public login] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: LoginParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: boolean) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type LoginAction = Start | Success | Error;

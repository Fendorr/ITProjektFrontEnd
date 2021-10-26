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

import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {of} from 'rxjs';

import {catchError, map, switchMap} from 'rxjs/operators';
import {InteractionService} from '../../../../controllers/Interaction';
import * as actions from './actions';

@Injectable()
export class LikeProjectEffects {
  @Effect()
  LikeProject = this.storeActions.pipe(
    ofType<actions.Start>(actions.Actions.START),
    switchMap((action: actions.Start) => this.interactionService.likeProject(action.payload)
      .pipe(
        map(result => new actions.Success(result)),
        catchError((error: HttpErrorResponse) => of(new actions.Error(error))),
      ),
    ),
  );

  constructor(
    private storeActions: Actions,
    private interactionService: InteractionService,
  ) {}
}

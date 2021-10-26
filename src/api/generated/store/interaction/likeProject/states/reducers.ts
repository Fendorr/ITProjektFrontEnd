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

import {createFeatureSelector} from '@ngrx/store';

import {HttpErrorResponse} from '@angular/common/http';
import * as actions from './actions';

export interface LikeProjectState {
  data: void | null;
  loading: boolean;
  error: HttpErrorResponse | null;
}

export const initialLikeProjectState: LikeProjectState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'Interaction_LikeProject';
export const getLikeProjectStateSelector = createFeatureSelector<LikeProjectState>(selectorName);

export function LikeProjectReducer(
  state: LikeProjectState = initialLikeProjectState,
  action: actions.LikeProjectAction): LikeProjectState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}

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
import * as __model from '../../../../model';
import * as actions from './actions';

export interface ProjectState {
  data: __model.ProjectDTO[] | null;
  loading: boolean;
  error: HttpErrorResponse | null;
}

export const initialProjectState: ProjectState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'Public_Project';
export const getProjectStateSelector = createFeatureSelector<ProjectState>(selectorName);

export function ProjectReducer(
  state: ProjectState = initialProjectState,
  action: actions.ProjectAction): ProjectState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}

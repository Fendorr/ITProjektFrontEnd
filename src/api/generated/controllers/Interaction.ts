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

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

export interface AddMemberParams {
  /**
   * id
   * format: int64
   */
  id: number;
  /**
   * projectId
   * format: int64
   */
  projectId: number;
}

export interface ApplyToProjectParams {
  /**
   * id
   * format: int64
   */
  id: number;
  /**
   * projectId
   * format: int64
   */
  projectId: number;
}

export interface InviteUserParams {
  /**
   * id
   * format: int64
   */
  id: number;
  /**
   * projectId
   * format: int64
   */
  projectId: number;
}

export interface LikeProjectParams {
  /**
   * id
   * format: int64
   */
  id: number;
  /**
   * userId
   * format: int64
   */
  userId: number;
}

@Injectable()
export class InteractionService {
  constructor(private http: HttpClient) {}

  /**
   * addMember
   * http://localhost:8080/swagger/swagger-ui.html#!/interaction-controller/addMemberUsingPUT
   */
  addMember(params: AddMemberParams): Observable<void> {
    const pathParams = {
      id: params.id,
    };
    const bodyParams = params.projectId;

    return this.http.put<void>(`/api/addMember/${pathParams.id}`, bodyParams || {});
  }

  /**
   * applyToProject
   * http://localhost:8080/swagger/swagger-ui.html#!/interaction-controller/applyToProjectUsingPUT
   */
  applyToProject(params: ApplyToProjectParams): Observable<void> {
    const pathParams = {
      id: params.id,
    };
    const bodyParams = params.projectId;

    return this.http.put<void>(`/api/applyToProject/${pathParams.id}`, bodyParams || {});
  }

  /**
   * inviteUser
   * http://localhost:8080/swagger/swagger-ui.html#!/interaction-controller/inviteUserUsingPUT
   */
  inviteUser(params: InviteUserParams): Observable<void> {
    const pathParams = {
      id: params.id,
    };
    const bodyParams = params.projectId;

    return this.http.put<void>(`/api/inviteUser/${pathParams.id}`, bodyParams || {});
  }

  /**
   * likeProject
   * http://localhost:8080/swagger/swagger-ui.html#!/interaction-controller/likeProjectUsingPUT
   */
  likeProject(params: LikeProjectParams): Observable<void> {
    const pathParams = {
      id: params.id,
    };
    const bodyParams = params.userId;

    return this.http.put<void>(`/api/likeProject/${pathParams.id}`, bodyParams || {});
  }
}

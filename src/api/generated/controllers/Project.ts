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

import * as __model from '../model';

export interface GetProjectByIdUsingGETParams {
  /**
   * id
   * format: int64
   */
  id: number;
}

export interface PostProjectUsingPOSTParams {
  /**
   * id
   * format: int64
   */
  id: number;
  /** project */
  project: __model.ProjectDTO;
}

export interface UpdateProjectUsingPUTParams {
  /**
   * id
   * format: int64
   */
  id: number;
  /** project */
  project: __model.ProjectDTO;
}

export interface DeleteProjectUsingDELETEParams {
  /**
   * id
   * format: int64
   */
  id: number;
}

@Injectable()
export class ProjectService {
  constructor(private http: HttpClient) {}

  /**
   * getProjectById
   * http://localhost:8080/swagger/swagger-ui.html#!/project-controller/getProjectByIdUsingGET
   */
  getProjectByIdUsingGET(params: GetProjectByIdUsingGETParams): Observable<__model.ProjectDTO> {
    const pathParams = {
      id: params.id,
    };
    return this.http.get<__model.ProjectDTO>(`/api/project/${pathParams.id}`);
  }

  /**
   * postProject
   * http://localhost:8080/swagger/swagger-ui.html#!/project-controller/postProjectUsingPOST
   */
  postProjectUsingPOST(params: PostProjectUsingPOSTParams): Observable<string> {
    const pathParams = {
      id: params.id,
    };
    const bodyParams = params.project;

    return this.http.post<string>(`/api/project/${pathParams.id}`, bodyParams || {});
  }

  /**
   * updateProject
   * http://localhost:8080/swagger/swagger-ui.html#!/project-controller/updateProjectUsingPUT
   */
  updateProjectUsingPUT(params: UpdateProjectUsingPUTParams): Observable<void> {
    const pathParams = {
      id: params.id,
    };
    const bodyParams = params.project;

    return this.http.put<void>(`/api/project/${pathParams.id}`, bodyParams || {});
  }

  /**
   * deleteProject
   * http://localhost:8080/swagger/swagger-ui.html#!/project-controller/deleteProjectUsingDELETE
   */
  deleteProjectUsingDELETE(params: DeleteProjectUsingDELETEParams): Observable<void> {
    const pathParams = {
      id: params.id,
    };
    return this.http.delete<void>(`/api/project/${pathParams.id}`);
  }
}
